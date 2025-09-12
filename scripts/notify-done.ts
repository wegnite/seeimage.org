import 'dotenv/config';

async function main() {
  const webhook = process.env.FEISHU_WEBHOOK_URL;
  if (!webhook) {
    console.warn('[notify-done] FEISHU_WEBHOOK_URL not set; skip');
    return;
  }
  const text = process.argv.slice(2).join(' ').trim() || '✅ Codex 任务完成';
  const body = {
    msg_type: 'text',
    content: { text },
  };
  const res = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    console.error('[notify-done] http error:', res.status, await res.text());
  }
}

main().catch((e) => {
  console.error('[notify-done] error:', e);
  process.exit(1);
});

