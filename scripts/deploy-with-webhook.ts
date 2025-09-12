import 'dotenv/config'
import { spawnSync, execSync } from 'node:child_process'

type Phase = 'build' | 'deploy'

function getGitInfo() {
  const safe = (cmd: string) => {
    try {
      return execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
    } catch {
      return ''
    }
  }
  return {
    commit: safe('git rev-parse --short HEAD'),
    branch: safe('git rev-parse --abbrev-ref HEAD'),
    repo: safe('git config --get remote.origin.url'),
  }
}

function shouldNotify() {
  // Only notify when explicitly enabled to avoid spamming during normal CLI usage
  return process.env.DEPLOY_NOTIFY === 'true';
}

async function sendFeishu(status: '成功' | '失败', phase: Phase, startedAt: number, code?: number, extraMessage?: string) {
  if (!shouldNotify()) {
    return;
  }
  const webhook = process.env.FEISHU_WEBHOOK_URL
  if (!webhook) {
    console.warn('[feishu webhook] FEISHU_WEBHOOK_URL not set; skip notify')
    return
  }
  const durationSec = Math.round((Date.now() - startedAt) / 1000)
  const pkg = (() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      return require('../package.json') as { name?: string; version?: string }
    } catch {
      return {}
    }
  })()
  const git = getGitInfo()

  const lines = [
    `部署${status} (${phase})`,
    `项目: ${pkg.name ?? 'unknown'} ${pkg.version ? 'v' + pkg.version : ''}`,
    git.commit ? `提交: ${git.commit}${git.branch ? ' @ ' + git.branch : ''}` : undefined,
    git.repo ? `仓库: ${git.repo}` : undefined,
    `环境: Cloudflare Workers` ,
    `耗时: ${durationSec}s`,
    typeof code === 'number' ? `退出码: ${code}` : undefined,
    extraMessage ? `备注: ${extraMessage}` : undefined,
  ].filter(Boolean)

  const body = {
    msg_type: 'text',
    content: {
      text: lines.join('\n'),
    },
  }

  try {
    // Node >=18 has global fetch
    const resp = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!resp.ok) {
      // Swallow errors to avoid masking deploy result
      console.error('[feishu webhook] http error:', resp.status, await resp.text())
    }
  } catch (err) {
    console.error('[feishu webhook] send error:', err)
  }
}

async function main() {
  const startedAt = Date.now()

  const step = (cmd: string, args: string[], phase: Phase) => {
    const res = spawnSync(cmd, args, { stdio: 'inherit' })
    return { status: res.status ?? 1, phase }
  }

  const build = step('opennextjs-cloudflare', ['build'], 'build')
  if (build.status !== 0) {
    await sendFeishu('失败', build.phase, startedAt, build.status)
    process.exit(build.status)
  }

  const deploy = step('opennextjs-cloudflare', ['deploy'], 'deploy')
  if (deploy.status !== 0) {
    await sendFeishu('失败', deploy.phase, startedAt, deploy.status)
    process.exit(deploy.status)
  }

  await sendFeishu('成功', 'deploy', startedAt)
}

main().catch(async (err) => {
  console.error(err)
  await sendFeishu('失败', 'deploy', Date.now(), 1, '脚本异常')
  process.exit(1)
})
