import { ArrowUpRight } from 'lucide-react';
import type { Source } from '../content/sources';
import { formatDate } from '../content/posts';

export default function SourceList({ items, title = 'Fontes', id }: { items: Source[]; title?: string; id?: string }) {
  const unique = items.filter((item, index) => items.findIndex(other => other.title === item.title) === index);
  return <section className="vs-sources" aria-labelledby={id}>
    <h2 id={id}>{title}</h2>
    <ol>{unique.map(source => <li key={source.title}>
      {source.url ? <a href={source.url} target="_blank" rel="noreferrer">{source.title}<ArrowUpRight size={14} aria-hidden="true" /></a> : <span>{source.title}</span>}
      {(source.publishedAt || source.note) && <small>{source.publishedAt ? `Publicado em ${formatDate(source.publishedAt)}. ` : ''}{source.note || ''}</small>}
    </li>)}</ol>
  </section>;
}
