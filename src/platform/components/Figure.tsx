import { useState } from 'react';
import { ArrowUpRight, ImageOff } from 'lucide-react';
import { imageUrl } from '../content/images';
import type { ImageRef } from '../content/images';

// Lowercase attribute: React 18 does not map the camelCase fetchPriority prop.
const highPriority = { fetchpriority: 'high' } as Record<string, string>;

/** Credited photograph with a textual fallback when the file does not load. */
export default function Figure({ image, className = '', eager = false, showCaption = true, sizes }: { image: ImageRef; className?: string; eager?: boolean; showCaption?: boolean; sizes?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={`vs-figure-fallback ${className}`}>
    <ImageOff size={20} aria-hidden="true" /><p>A fotografia não carregou.</p>
    <a href={image.source} target="_blank" rel="noreferrer">Abrir a fonte da foto <ArrowUpRight size={14} aria-hidden="true" /></a>
  </div>;
  return <figure className={`vs-figure ${className}`}>
    <img src={imageUrl(image)} alt={image.alt} width="1200" height="800" sizes={sizes} loading={eager ? 'eager' : 'lazy'} {...(eager ? highPriority : {})} decoding="async" style={image.position ? { objectPosition: image.position } : undefined} onError={() => setFailed(true)} />
    {showCaption && <figcaption><span>{image.caption}</span><a href={image.source} target="_blank" rel="noreferrer">Foto: {image.credit} <ArrowUpRight size={12} aria-hidden="true" /></a></figcaption>}
  </figure>;
}
