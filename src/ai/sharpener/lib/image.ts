// Simple, client-side image processing helpers with zero backend cost.
// Implements box blur, Sobel edge magnitude and unsharp mask.

export interface SharpenOptions {
  // 0..1
  strength: number;
  // integer pixels (blur radius for mask)
  radius: number;
  // 0..1 factor applied based on edge magnitude
  edgeEnhance: number;
  // pre-denoise using small blur before sharpening
  denoise: boolean;
}

export interface ProcessResult {
  beforeUrl: string;
  afterUrl: string;
  width: number;
  height: number;
}

// Draw an image/file to a canvas and return ImageData (optionally scaled)
export async function fileToImageData(file: File, maxDim = 2000): Promise<{ data: ImageData; scale: number }>{
  const url = URL.createObjectURL(file);
  try {
    const img = await loadImage(url);
    const { width, height } = limitSize(img.width, img.height, maxDim);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context unavailable');
    ctx.drawImage(img, 0, 0, width, height);
    const data = ctx.getImageData(0, 0, width, height);
    return { data, scale: width / img.width };
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function imageDataToDataUrl(data: ImageData, type: string = 'image/png', quality?: number): string {
  const canvas = document.createElement('canvas');
  canvas.width = data.width;
  canvas.height = data.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');
  ctx.putImageData(data, 0, 0);
  return canvas.toDataURL(type, quality);
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

function limitSize(w: number, h: number, maxDim: number): { width: number; height: number } {
  const scale = Math.min(1, maxDim / Math.max(w, h));
  return { width: Math.round(w * scale), height: Math.round(h * scale) };
}

// Fast-ish separable box blur (3 passes approximate Gaussian)
export function boxBlur(image: ImageData, radius: number, passes = 3): ImageData {
  if (radius <= 0) return image;
  let src = image;
  for (let i = 0; i < passes; i++) {
    src = blurPass(src, radius, true);
    src = blurPass(src, radius, false);
  }
  return src;
}

function blurPass(src: ImageData, radius: number, horizontal: boolean): ImageData {
  const { width, height, data } = src;
  const dst = new ImageData(width, height);
  const r = Math.max(1, Math.floor(radius));
  const channels = 4;
  const w = width, h = height;
  const line = new Uint32Array(Math.max(w, h));

  if (horizontal) {
    for (let y = 0; y < h; y++) {
      for (let c = 0; c < 3; c++) { // RGB only, keep alpha
        let sum = 0;
        // initial window
        for (let x = -r; x <= r; x++) {
          const cx = clamp(x, 0, w - 1);
          sum += data[(y * w + cx) * channels + c];
        }
        for (let x = 0; x < w; x++) {
          line[x] = sum / (2 * r + 1);
          const xOut = x - r;
          const xIn = x + r + 1;
          sum += data[(y * w + clamp(xIn, 0, w - 1)) * channels + c];
          sum -= data[(y * w + clamp(xOut, 0, w - 1)) * channels + c];
        }
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * channels;
          dst.data[idx + c] = line[x];
        }
      }
      // copy alpha
      for (let x = 0; x < w; x++) dst.data[(y * w + x) * channels + 3] = data[(y * w + x) * channels + 3];
    }
  } else {
    for (let x = 0; x < w; x++) {
      for (let c = 0; c < 3; c++) {
        let sum = 0;
        for (let y = -r; y <= r; y++) {
          const cy = clamp(y, 0, h - 1);
          sum += data[(cy * w + x) * channels + c];
        }
        for (let y = 0; y < h; y++) {
          line[y] = sum / (2 * r + 1);
          const yOut = y - r;
          const yIn = y + r + 1;
          sum += data[(clamp(yIn, 0, h - 1) * w + x) * channels + c];
          sum -= data[(clamp(yOut, 0, h - 1) * w + x) * channels + c];
        }
        for (let y = 0; y < h; y++) {
          const idx = (y * w + x) * channels;
          dst.data[idx + c] = line[y];
        }
      }
      for (let y = 0; y < h; y++) dst.data[(y * w + x) * channels + 3] = data[(y * w + x) * channels + 3];
    }
  }

  return dst;
}

function clamp(v: number, min: number, max: number) { return v < min ? min : v > max ? max : v; }

export function sobelEdgeMagnitude(src: ImageData): Float32Array {
  const { width: w, height: h, data } = src;
  const mag = new Float32Array(w * h);
  // 3x3 kernels
  const gx = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
  const gy = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
  const channels = 4;
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      let sx = 0, sy = 0;
      let k = 0;
      for (let j = -1; j <= 1; j++) {
        for (let i = -1; i <= 1; i++) {
          const idx = ((y + j) * w + (x + i)) * channels;
          // luminance
          const r = data[idx], g = data[idx + 1], b = data[idx + 2];
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          sx += lum * gx[k];
          sy += lum * gy[k];
          k++;
        }
      }
      mag[y * w + x] = Math.hypot(sx, sy);
    }
  }
  return mag;
}

export function unsharpMask(src: ImageData, opts: SharpenOptions): ImageData {
  const { strength, radius, edgeEnhance, denoise } = opts;
  const maskBlurRadius = Math.max(1, radius);
  const pre = denoise ? boxBlur(src, 1, 1) : src;
  const blurred = boxBlur(pre, maskBlurRadius, 3);
  const { width: w, height: h } = src;
  const out = new ImageData(w, h);
  const edges = edgeEnhance > 0 ? sobelEdgeMagnitude(src) : undefined;
  let maxEdge = 1;
  if (edges) {
    // compute a simple normalization factor from a sample
    for (let i = 0; i < edges.length; i += Math.floor(edges.length / 1024) + 1) {
      if (edges[i] > maxEdge) maxEdge = edges[i];
    }
  }
  const k = strength; // 0..1
  for (let i = 0; i < w * h; i++) {
    const idx = i * 4;
    for (let c = 0; c < 3; c++) {
      const orig = src.data[idx + c];
      const blur = blurred.data[idx + c];
      const detail = orig - blur; // high frequency
      const edgeFactor = edges ? 1 + edgeEnhance * (edges[i] / maxEdge) : 1;
      let val = orig + k * detail * edgeFactor;
      if (val < 0) val = 0; else if (val > 255) val = 255;
      out.data[idx + c] = val;
    }
    out.data[idx + 3] = src.data[idx + 3];
  }
  return out;
}

export async function processFile(
  file: File,
  options: SharpenOptions,
  maxDim = 2000
): Promise<ProcessResult> {
  const { data } = await fileToImageData(file, maxDim);
  const beforeUrl = imageDataToDataUrl(data);
  const after = unsharpMask(data, options);
  const afterUrl = imageDataToDataUrl(after);
  return { beforeUrl, afterUrl, width: data.width, height: data.height };
}

