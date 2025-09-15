'use client';

import { useCallback, useMemo, useState } from 'react';
import { BeforeAfter } from './BeforeAfter';
import { processFile, type SharpenOptions } from '../lib/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Mode = 'fast' | 'quality' | 'pro';

const MODE_PRESETS: Record<Mode, SharpenOptions & { radius: number }> = {
  fast: { strength: 0.35, radius: 1, edgeEnhance: 0.15, denoise: false },
  quality: { strength: 0.5, radius: 2, edgeEnhance: 0.25, denoise: true },
  pro: { strength: 0.65, radius: 3, edgeEnhance: 0.35, denoise: true },
};

interface ResultItem {
  id: string;
  name: string;
  beforeUrl: string;
  afterUrl: string;
  width: number;
  height: number;
}

export function SharpenerPlayground() {
  const [mode, setMode] = useState<Mode>('fast');
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [strength, setStrength] = useState(50); // 0..100
  const [edge, setEdge] = useState(1); // 0=off 1=light 2=medium 3=strong
  const [denoise, setDenoise] = useState(false);

  const currentOpts: SharpenOptions = useMemo(() => {
    const base = MODE_PRESETS[mode];
    return {
      strength: Math.max(0, Math.min(1, strength / 100)),
      radius: base.radius,
      edgeEnhance: [0, 0.15, 0.25, 0.35][edge] ?? base.edgeEnhance,
      denoise: denoise ?? base.denoise,
    };
  }, [mode, strength, edge, denoise]);

  const onFilePick = useCallback((list: FileList | null) => {
    if (!list) return;
    const arr = Array.from(list).slice(0, 10); // batch up to 10
    setFiles(arr);
    setResults([]);
  }, []);

  const run = useCallback(async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    const out: ResultItem[] = [];
    for (const f of files) {
      // Process sequentially to keep CPU responsive
      // Cap max dimension per mode for performance
      const maxDim = mode === 'fast' ? 1600 : mode === 'quality' ? 2000 : 2400;
      try {
        const res = await processFile(f, currentOpts, maxDim);
        out.push({
          id: Math.random().toString(36).slice(2),
          name: f.name,
          ...res,
        });
        setResults([...out]);
        // Yield to UI
        await new Promise((r) => setTimeout(r));
      } catch (e) {
        console.error('process error', e);
      }
    }
    setIsProcessing(false);
  }, [files, currentOpts, mode]);

  const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    onFilePick(e.dataTransfer.files);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>AI Image Sharpener (Client-only)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <Label>Upload images (up to 10)</Label>
              <Input type="file" multiple accept="image/*" onChange={(e) => onFilePick(e.target.files)} />
            </div>
            <div>
              <Label>Mode</Label>
              <div className="flex gap-2 mt-2">
                {(['fast', 'quality', 'pro'] as Mode[]).map((m) => (
                  <Button key={m} type="button" variant={mode === m ? 'default' : 'secondary'} onClick={() => setMode(m)}>
                    {m === 'fast' ? 'Fast' : m === 'quality' ? 'Quality' : 'Pro'}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Label>Sharpen strength: {strength}%</Label>
              <input
                type="range"
                min={0}
                max={100}
                value={strength}
                onChange={(e) => setStrength(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <Label>Edge enhancement</Label>
              <select className="w-full mt-2 border rounded px-2 py-1 bg-background" value={edge}
                onChange={(e) => setEdge(Number(e.target.value))}>
                <option value={0}>Off</option>
                <option value={1}>Light</option>
                <option value={2}>Medium</option>
                <option value={3}>Strong</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 select-none">
              <input type="checkbox" checked={denoise} onChange={(e) => setDenoise(e.target.checked)} />
              <span>Noise reduction</span>
            </label>
            <Button type="button" onClick={run} disabled={isProcessing || files.length === 0}>
              {isProcessing ? 'Processing…' : 'Enhance images'}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">All processing runs locally in your browser. No uploads, no server cost.</p>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid gap-6 md:grid-cols-2">
        {results.map((r) => (
          <Card key={r.id}>
            <CardHeader>
              <CardTitle className="text-base">{r.name} • {r.width}×{r.height}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <BeforeAfter beforeUrl={r.beforeUrl} afterUrl={r.afterUrl} alt={r.name} />
              <div className="flex gap-2">
                <a download={downloadName(r.name)} href={r.afterUrl}>
                  <Button type="button">Download</Button>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ad placeholder */}
      <div className="rounded-lg border p-6 text-center text-muted-foreground">
        Ad Placeholder — add your AdSense/Ad network snippet here later.
      </div>
    </div>
  );
}

function downloadName(name: string) {
  const dot = name.lastIndexOf('.')
  const base = dot > 0 ? name.slice(0, dot) : name;
  return `${base}_enhanced.png`;
}

