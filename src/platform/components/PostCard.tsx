import { ArrowUpRight, Clock } from 'lucide-react';
import Figure from './Figure';
import PassosArt from './PassosArt';
import { platformHref } from '../routes';
import { readingMinutes } from '../content/posts';
import type { PostCover, PublishedPost } from '../content/posts';

export function PostCover({ cover, eager = false }: { cover: PostCover; eager?: boolean }) {
  if (cover.kind === 'image') return <Figure image={cover.image} showCaption={false} eager={eager} />;
  return <PassosArt />;
}

/** Editorial card: the title link covers the whole card. */
export default function PostCard({ post, feature = false }: { post: PublishedPost; feature?: boolean }) {
  return <article className={`vs-post-card${feature ? ' is-feature' : ''}${post.cover.kind === 'art' ? ' has-art' : ''}`}>
    <div className="vs-post-media"><PostCover cover={post.cover} /></div>
    <div className="vs-post-body">
      <p className="vs-post-category">{post.category}</p>
      <h3><a className="vs-post-link" href={platformHref.publicacao(post.slug)}>{post.title}</a></h3>
      <p className="vs-post-excerpt">{post.excerpt}</p>
      <p className="vs-post-meta"><span><Clock size={14} aria-hidden="true" />{readingMinutes(post)} min de leitura</span><span className="vs-post-action" aria-hidden="true">Ler publicação <ArrowUpRight size={17} /></span></p>
    </div>
  </article>;
}
