const MAX_DIMENSION = 1024;
const JPEG_QUALITY = 0.8;

type Options = {
  maxDimension?: number;
  quality?: number;
  mirror?: boolean;
};

/**
 * Draws an image/video frame onto a canvas, scaled so its longest side is at
 * most `maxDimension`, and returns it as a JPEG base64 data URL.
 */
export function drawCompressed(
  source: CanvasImageSource,
  sourceWidth: number,
  sourceHeight: number,
  { maxDimension = MAX_DIMENSION, quality = JPEG_QUALITY, mirror = false }: Options = {}
): string {
  const scale = Math.min(1, maxDimension / Math.max(sourceWidth, sourceHeight));
  const width = Math.round(sourceWidth * scale);
  const height = Math.round(sourceHeight * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");

  if (mirror) {
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(source, 0, 0, width, height);

  return canvas.toDataURL("image/jpeg", quality);
}

/**
 * Shrinks an uploaded image file and returns it as a compressed JPEG data URL
 * small enough to fit in sessionStorage.
 */
export function compressImage(file: Blob, options?: Options): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      try {
        resolve(drawCompressed(img, img.naturalWidth, img.naturalHeight, options));
      } catch (err) {
        reject(err);
      } finally {
        URL.revokeObjectURL(url);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
}
