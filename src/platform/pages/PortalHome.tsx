import { ArrowDown, ArrowUpRight, Lightbulb } from 'lucide-react';
import Figure from '../components/Figure';
import ExperienceCard from '../components/ExperienceCard';
import PostCard from '../components/PostCard';
import PlaceCard from '../components/PlaceCard';
import { PortalFooter, PortalHeader } from '../components/PortalLayout';
import { activeExperiences } from '../content/experiences';
import { images } from '../content/images';
import { cityPlaces } from '../content/places';
import { plannedPosts, publishedPosts } from '../content/posts';
import { platformHref } from '../routes';
import type { PortalSection } from '../routes';

const repository = 'https://github.com/bernas0610/VivaSE_Cultura-2.0';
const suggestionUrl = `${repository}/issues/new?${new URLSearchParams({ title: 'Sugestão de experiência cultural', body: 'Manifestação, festa ou evento de São Cristóvão:\n\nPor que ela deveria estar no VivaSE:\n\nFontes públicas (sites oficiais, pesquisas, reportagens):\n\nNão inclua dados pessoais de terceiros.' })}`;

export default function PortalHome({ section }: { section?: PortalSection }) {
  const [feature, ...others] = publishedPosts;
  return <>
    <PortalHeader current={section} />
    <main id="conteudo" className="vs-home">
      <section className="vs-hero" aria-labelledby="vs-hero-title">
        <div className="vs-hero-photo"><Figure image={images.pracaNoturna} eager showCaption={false} sizes="100vw" /></div>
        <div className="vs-hero-shade" aria-hidden="true" />
        <div className="vs-hero-copy">
          <p className="vs-hero-eyebrow"><span className="ribbon-star" aria-hidden="true" />São Cristóvão · Sergipe</p>
          <h1 id="vs-hero-title" tabIndex={-1}>Viva São Cristóvão.<span>Viva nossa história.</span></h1>
          <p className="vs-hero-lead">Explore a cultura, descubra nossas tradições e viva as experiências que fazem de São Cristóvão um lugar único.</p>
          <div className="vs-hero-actions">
            <a className="vs-button-yellow" href={platformHref.inicio('experiencias')}>Explorar experiências <ArrowDown size={20} aria-hidden="true" /></a>
            <a className="vs-hero-link" href={platformHref.inicio('descubra')}>Descobrir a cidade <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
        <p className="vs-hero-ticket">Praça São Francisco<span>Patrimônio Mundial · 2010</span></p>
        <a className="vs-photo-credit vs-hero-credit" href={images.pracaNoturna.source} target="_blank" rel="noreferrer">Praça São Francisco · Foto: {images.pracaNoturna.credit}</a>
      </section>
      <div className="vs-ribbon" aria-label="O que você encontra no VivaSE"><span>Patrimônio</span><span className="ribbon-star" aria-hidden="true" /><span>Fé</span><span className="ribbon-star" aria-hidden="true" /><span>Festa</span><span className="ribbon-star" aria-hidden="true" /><span>Arte</span></div>

      <section id="experiencias" className="vs-section vs-experiences" aria-labelledby="experiencias-title">
        <header className="vs-section-heading">
          <p className="eyebrow">Eventos e experiências</p>
          <h2 id="experiencias-title" tabIndex={-1}>Experiências que fazem nossa história</h2>
          <p>Cada experiência tem seu próprio espaço, sua identidade e seu jeito de contar a cidade.</p>
        </header>
        <div className="vs-experience-grid">{activeExperiences.map((experience, index) => <ExperienceCard key={experience.id} experience={experience} index={index} />)}</div>
        <aside className="vs-next-experience" aria-label="Novas experiências">
          <Lightbulb size={26} aria-hidden="true" />
          <div><h3>Outras manifestações podem chegar aqui.</h3><p>A plataforma está preparada para receber novas festas, tradições e eventos da cidade, sempre com fontes verificáveis.</p></div>
          <a className="text-action" href={suggestionUrl} target="_blank" rel="noreferrer">Sugerir uma experiência <ArrowUpRight size={17} aria-hidden="true" /></a>
        </aside>
      </section>

      <section id="publicacoes" className="vs-section vs-editorial" aria-labelledby="publicacoes-title">
        <header className="vs-section-heading">
          <p className="eyebrow">Publicações</p>
          <h2 id="publicacoes-title" tabIndex={-1}>Nossa cultura, nossas histórias</h2>
          <p>Leituras sobre o patrimônio, a fé, a arte e a memória de São Cristóvão, com as fontes de cada informação.</p>
        </header>
        <div className="vs-post-grid">
          {feature && <PostCard post={feature} feature />}
          {others.map(post => <PostCard key={post.slug} post={post} />)}
        </div>
        {plannedPosts.length > 0 && <div className="vs-planned">
          <h3>Em curadoria</h3>
          <p>Temas em pesquisa. Serão publicados quando houver fontes verificáveis.</p>
          <ul>{plannedPosts.map(post => <li key={post.slug}><span>{post.category}</span>{post.title}</li>)}</ul>
        </div>}
        <a className="text-action vs-section-link" href={platformHref.publicacoes()}>Ver todas as publicações <ArrowUpRight size={18} aria-hidden="true" /></a>
      </section>

      <section id="descubra" className="vs-section vs-discover" aria-labelledby="descubra-title">
        <header className="vs-section-heading">
          <p className="eyebrow">Descubra São Cristóvão</p>
          <h2 id="descubra-title" tabIndex={-1}>Lugares que contam a cidade</h2>
          <p>Praças, igrejas, museus e espaços culturais para conhecer com calma, seja você morador ou visitante.</p>
        </header>
        <div className="vs-place-track" role="list" aria-label="Lugares para descobrir">{cityPlaces.map(place => <div role="listitem" key={place.id}><PlaceCard place={place} /></div>)}</div>
        <p className="vs-discover-note">Um mapa cultural da cidade, com rotas e informações turísticas, está em preparação. As referências de localização destes lugares já fazem parte da base do VivaSE.</p>
      </section>
    </main>
    <PortalFooter />
  </>;
}
