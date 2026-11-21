import PostCard from '../components/PostCard';
import { PortalFooter, PortalHeader } from '../components/PortalLayout';
import { plannedPosts, publishedPosts } from '../content/posts';
import { contentReviewedAt } from '../content/sources';

export default function PostsIndex() {
  return <>
    <PortalHeader current="publicacoes" />
    <main id="conteudo" className="vs-page vs-posts-page">
      <header className="vs-page-heading">
        <p className="eyebrow">Publicações</p>
        <h1 tabIndex={-1}>Nossa cultura, nossas histórias</h1>
        <p>Textos sobre São Cristóvão escritos a partir de fontes públicas. Cada publicação lista as referências usadas. Revisão editorial: {contentReviewedAt}.</p>
      </header>
      <div className="vs-section vs-editorial">
        <div className="vs-post-grid is-index">{publishedPosts.map((post, index) => <PostCard key={post.slug} post={post} feature={index === 0} />)}</div>
        {plannedPosts.length > 0 && <div className="vs-planned">
          <h2>Em curadoria</h2>
          <p>Temas em pesquisa. Serão publicados quando houver fontes verificáveis para cada informação.</p>
          <ul>{plannedPosts.map(post => <li key={post.slug}><span>{post.category}</span>{post.title}</li>)}</ul>
        </div>}
      </div>
    </main>
    <PortalFooter />
  </>;
}
