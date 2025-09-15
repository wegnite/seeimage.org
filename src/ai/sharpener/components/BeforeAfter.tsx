'use client';

import { useMemo, useRef, useState } from 'react';

interface Props {
  beforeUrl: string;
  afterUrl: string;
  alt?: string;
}

export function BeforeAfter({ beforeUrl, afterUrl, alt = 'preview' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(0.5);

  const handleMove = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = (clientX - rect.left) / rect.width;
    setPos(Math.max(0, Math.min(1, p)));
  };

  const handleMouse = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleTouch = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  const clip = useMemo(() => ({
    clipPath: `inset(0 ${(1 - pos) * 100}% 0 0)`,
  }), [pos]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-lg border bg-background select-none"
      onMouseMove={handleMouse}
      onTouchMove={handleTouch}
      style={{ cursor: 'ew-resize' }}
    >
      <img src={beforeUrl} alt={alt} className="block w-full h-auto" />
      <img src={afterUrl} alt={alt} className="block w-full h-auto absolute top-0 left-0" style={clip} />
      <div
        className="absolute top-0 bottom-0"
        style={{ left: `${pos * 100}%`, transform: 'translateX(-50%)' }}
      >
        <div className="h-full w-[2px] bg-white/80 dark:bg-white/60 shadow" />
        <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 rounded-full bg-white text-black text-xs grid place-items-center shadow">
          ⇆
        </div>
      </div>
    </div>
  );
}

