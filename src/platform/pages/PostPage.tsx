import { ArrowLeft, ArrowUpRight, Clock, Info } from 'lucide-react';
import Figure from '../components/Figure';
import PostCard, { PostCover } from '../components/PostCard';
import SourceList from '../components/SourceList';
import { PortalFooter, PortalHeader } from '../components/PortalLayout';
import { findPost, formatDate, publishedPosts, readingMinutes } from '../content/posts';
import type { PostBlock } from '../content/posts';
import { platformHref } from '../routes';
import NotFound from './NotFound';

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case 'heading': return <h2>{block.text}</h2>;
    case 'figure': return <Figure image={block.image} className="vs-article-figure" />;
    case 'note': return <p className="vs-article-note"><Info size={18} aria-hidden="true" />{block.text}</p>;
    case 'links': return <div className="vs-article-links">{block.items.map(item => <a key={item.href} className="button primary" href={item.href}>{item.label}<ArrowUpRight size={18} aria-hidden="true" /></a>)}</div>;
    default: return <p>{block.text}</p>;
  }
}

export default function PostPage({ slug }: { slug: string }) {
  const post = findPost(slug);
  if (!post) return <NotFound message="Esta publicação não existe ou ainda está em curadoria." />;
  const related = publishedPosts.filter(other => other.slug !== post.slug).slice(0, 2);
  // The cover is shown at the top; the same image is not repeated in the body.
  const coverFile = post.cover.kind === 'image' ? post.cover.image.file : '';
  const blocks = post.blocks.filter(block => !(block.type === 'figure' && block.image.file === coverFile));
  return <>
    <PortalHeader current="publicacoes" />
    <main id="conteudo" className="vs-article-page">
      <article className="vs-article" aria-labelledby="vs-article-title">
        <header className="vs-article-header">
          <a className="vs-back-link" href={platformHref.publicacoes()}><ArrowLeft size={17} aria-hidden="true" />Todas as publicações</a>
          <p className="vs-post-category">{post.category}</p>
          <h1 id="vs-article-title" tabIndex={-1}>{post.title}</h1>
          <p className="vs-article-standfirst">{post.excerpt}</p>
          <p className="vs-article-meta"><span><Clock size={15} aria-hidden="true" />{readingMinutes(post)} min de leitura</span><span>Publicado em {formatDate(post.publishedAt)}</span><span>{post.sources.length} fontes consultadas</span></p>
        </header>
        <div className={`vs-article-cover${post.cover.kind === 'art' ? ' has-art' : ''}`}>
          {post.cover.kind === 'image' ? <Figure image={post.cover.image} eager className="vs-article-cover-figure" /> : <PostCover cover={post.cover} />}
        </div>
        <div className="vs-article-body">{blocks.map((block, index) => <Block key={index} block={block} />)}</div>
        <footer className="vs-article-footer"><SourceList items={post.sources} id="vs-article-sources" title="Fontes desta publicação" /><p className="vs-article-disclaimer">Encontrou algo para corrigir? O VivaSE é um projeto independente e aceita sugestões com fontes públicas.</p></footer>
      </article>
      {related.length > 0 && <section className="vs-section vs-editorial vs-related" aria-labelledby="vs-related-title"><h2 id="vs-related-title">Continue lendo</h2><div className="vs-post-grid is-related">{related.map(other => <PostCard key={other.slug} post={other} />)}</div></section>}
    </main>
    <PortalFooter />
  </>;
}
