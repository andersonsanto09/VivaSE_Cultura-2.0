import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { ArrowUpRight, BookOpen, CalendarClock, Camera, Church, Footprints, MapPin, MapPinned } from 'lucide-react';
import { ExperienceHeader, PortalFooter } from '../../platform/components/PortalLayout';
import Figure from '../../platform/components/Figure';
import PassosArt from '../../platform/components/PassosArt';
import SourceList from '../../platform/components/SourceList';
import BackLink from '../../components/BackLink';
import { platformHref } from '../../platform/routes';
import { isPassosSection, passosContributionUrl, passosFacts, passosGallery, passosHistory, passosIntro, passosPlaces, passosSchedule, passosSections, passosTraditions } from './content';
import type { PassosSection } from './content';
import './passos.css';

const href = (section: string) => platformHref.experience('senhor-dos-passos', section);
// Header with the same anatomy as the FASC header: brand, short inline navigation, emblem.
const headerNav = (['historia', 'tradicoes', 'lugares', 'programacao'] as const).map(id => ({ id, label: id === 'programacao' ? 'Agenda' : passosSections.find(section => section.id === id)!.label, href: href(id) }));

const sectionCards: { id: PassosSection; title: string; text: string; icon: typeof BookOpen }[] = [
  { id: 'historia', title: 'História', text: 'Raízes da romaria e seu reconhecimento como patrimônio de Sergipe.', icon: BookOpen },
  { id: 'tradicoes', title: 'Tradições', text: 'Trasladação, penitência e o Encontro das imagens.', icon: Footprints },
  { id: 'lugares', title: 'Lugares', text: 'Igrejas e praças por onde a romaria passa.', icon: MapPinned },
  { id: 'galeria', title: 'Galeria', text: 'Imagens da festa, em curadoria com crédito e autorização.', icon: Camera },
  { id: 'programacao', title: 'Programação', text: 'Espaço reservado para a programação oficial de cada ano.', icon: CalendarClock },
];

function Emblem() {
  return <span className="vs-passos-emblem" aria-hidden="true"><span>Senhor dos</span>Passos</span>;
}

function Heading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return <header className="vs-passos-heading"><p className="eyebrow">{eyebrow}</p><h1 tabIndex={-1}>{title}</h1>{children && <p>{children}</p>}</header>;
}

function Home() {
  return <>
    <section className="vs-passos-hero" aria-labelledby="passos-title">
      <div className="vs-passos-hero-copy">
        <p className="vs-passos-kicker">{passosIntro.kicker}</p>
        <h1 id="passos-title" tabIndex={-1}>{passosIntro.title}</h1>
        <p className="vs-passos-standfirst">{passosIntro.standfirst}</p>
        <div className="vs-passos-actions"><a className="vs-passos-button" href={href('tradicoes')}>Conhecer as tradições <ArrowUpRight size={20} aria-hidden="true" /></a><a className="vs-passos-link" href={href('lugares')}>Ver os lugares <ArrowUpRight size={17} aria-hidden="true" /></a></div>
      </div>
      <PassosArt className="vs-passos-hero-art" />
    </section>
    <dl className="vs-passos-facts">{passosFacts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
    <section className="vs-passos-band vs-passos-intro" aria-labelledby="passos-intro-title">
      <h2 id="passos-intro-title">Uma tradição de fé no Centro Histórico</h2>
      <div><p>{passosIntro.summary}</p><p>No domingo, a Procissão do Encontro leva as imagens de Senhor dos Passos e de Nossa Senhora das Dores até a Praça São Francisco, onde as duas imagens se encontram.</p>
        <a className="text-action" href={platformHref.publicacao('romaria-senhor-dos-passos')}>Ler a publicação completa <ArrowUpRight size={17} aria-hidden="true" /></a></div>
    </section>
    <section className="vs-passos-band" aria-labelledby="passos-explore-title">
      <h2 id="passos-explore-title">Explore a experiência</h2>
      <div className="vs-passos-cards">{sectionCards.map(({ id, title, text, icon: Symbol }) => <a key={id} className="vs-passos-card" href={href(id)}><Symbol size={26} strokeWidth={1.6} aria-hidden="true" /><strong>{title}</strong><span>{text}</span><ArrowUpRight className="vs-passos-card-arrow" size={19} aria-hidden="true" /></a>)}</div>
    </section>
    <section className="vs-passos-band"><SourceList items={passosIntro.sources} id="passos-home-sources" title="Fontes" /></section>
  </>;
}

function History() {
  return <>
    <Heading eyebrow="História" title="Raízes de uma romaria">Como a tradição é apresentada pelas fontes públicas consultadas.</Heading>
    <div className="vs-passos-band vs-passos-prose">
      {passosHistory.paragraphs.map(text => <p key={text}>{text}</p>)}
      <p className="vs-article-note"><BookOpen size={18} aria-hidden="true" />{passosHistory.pending}</p>
      <SourceList items={passosHistory.sources} id="passos-history-sources" />
    </div>
  </>;
}

function Traditions() {
  return <>
    <Heading eyebrow="Tradições" title="Os momentos da romaria">A sequência abaixo segue a programação divulgada em 2025. Dias e horários mudam a cada ano.</Heading>
    <div className="vs-passos-band">
      <ol className="vs-passos-steps">{passosTraditions.map((tradition, index) => <li key={tradition.id}>
        <span className="vs-passos-step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <div><p className="vs-passos-moment">{tradition.moment}</p><h2>{tradition.title}</h2><p>{tradition.description}</p>{tradition.source.url && <a className="vs-passos-source" href={tradition.source.url} target="_blank" rel="noreferrer">Fonte: {tradition.source.title} <ArrowUpRight size={13} aria-hidden="true" /></a>}</div>
      </li>)}</ol>
    </div>
  </>;
}

function Gallery() {
  return <>
    <Heading eyebrow="Galeria" title="Imagens da festa">A galeria só publica fotografias com autor, fonte e autorização identificados.</Heading>
    <div className="vs-passos-band">
      <div className="vs-passos-gallery">{passosGallery.map(item => item.image
        ? <div key={item.id} className="vs-passos-gallery-item has-image"><Figure image={item.image} />{item.note && <p>{item.note}</p>}</div>
        : <div key={item.id} className="vs-passos-gallery-item"><Camera size={26} strokeWidth={1.5} aria-hidden="true" /><strong>{item.label}</strong><span>Fotografia em curadoria</span></div>)}</div>
      <aside className="vs-passos-contribute"><Camera size={24} aria-hidden="true" /><div><h2>Tem uma fotografia ou um documento da festa?</h2><p>Indique a imagem, o autor e a autorização de uso. A sugestão abre um formulário público no GitHub e exige uma conta.</p><a className="text-action" href={passosContributionUrl} target="_blank" rel="noreferrer">Sugerir uma imagem ou fonte <ArrowUpRight size={17} aria-hidden="true" /></a></div></aside>
    </div>
  </>;
}

function Places() {
  return <>
    <Heading eyebrow="Lugares" title="Por onde a romaria passa">Igrejas e praças citadas na programação. Os pontos são referências das praças, não das portas de cada igreja.</Heading>
    <div className="vs-passos-band vs-passos-places">{passosPlaces.map(place => <article key={place.id} className="vs-passos-place">
      <div className="vs-passos-place-media">{place.image ? <Figure image={place.image} showCaption={false} /> : <div className="vs-passos-place-art"><Church size={34} strokeWidth={1.4} aria-hidden="true" /></div>}</div>
      <div className="vs-passos-place-body">
        <h2>{place.name}</h2><p>{place.role}</p>
        <p className="vs-passos-coordinate"><MapPin size={15} aria-hidden="true" />{place.coordinateNote}</p>
        <div className="vs-passos-place-actions">
          {place.coordinates && <a href={`https://www.google.com/maps/search/?api=1&query=${place.coordinates[0]},${place.coordinates[1]}`} target="_blank" rel="noreferrer">Abrir referência no mapa <ArrowUpRight size={15} aria-hidden="true" /></a>}
          {place.sources.filter(source => source.url).map(source => <a key={source.title} className="vs-passos-source" href={source.url} target="_blank" rel="noreferrer">{source.title} <ArrowUpRight size={13} aria-hidden="true" /></a>)}
        </div>
        {place.image && <p className="vs-place-credit"><a href={place.image.source} target="_blank" rel="noreferrer">Foto: {place.image.credit}</a></p>}
      </div>
    </article>)}</div>
  </>;
}

function Schedule() {
  return <>
    <Heading eyebrow="Programação" title="Programação da romaria">Datas, horários e percursos só aparecem aqui depois da divulgação oficial.</Heading>
    <div className="vs-passos-band">
      {passosSchedule ? <ol className="vs-passos-schedule">{passosSchedule.items.map(item => <li key={`${item.day}-${item.time}-${item.title}`}><time>{item.time}</time><div><strong>{item.title}</strong><span>{item.day} · {item.place}</span></div></li>)}</ol>
        : <div className="vs-passos-empty"><CalendarClock size={30} strokeWidth={1.5} aria-hidden="true" /><h2>A programação da próxima romaria ainda não foi publicada.</h2><p>A festa acontece no segundo fim de semana da Quaresma, por isso a data muda a cada ano. Em 2025, a organização foi da Arquidiocese de Aracaju, com divulgação da Prefeitura de São Cristóvão. Acompanhe os canais oficiais.</p><a className="text-action" href={passosTraditions[0].source.url} target="_blank" rel="noreferrer">Consultar a programação de 2025 (registro) <ArrowUpRight size={17} aria-hidden="true" /></a></div>}
    </div>
  </>;
}

const views: Record<PassosSection, () => JSX.Element> = { inicio: Home, historia: History, tradicoes: Traditions, galeria: Gallery, lugares: Places, programacao: Schedule };

export default function PassosExperience({ section }: { section: string }) {
  const current: PassosSection = isPassosSection(section) ? section : 'inicio';
  const label = passosSections.find(item => item.id === current)?.label;
  useEffect(() => { document.title = current === 'inicio' ? 'Senhor dos Passos | VivaSE Cultura' : `${label} · Senhor dos Passos | VivaSE Cultura`; }, [current, label]);
  const View = views[current];
  return <div className="vs-app vs-passos">
    <ExperienceHeader name="Senhor dos Passos" emblem={<Emblem />} nav={headerNav} current={current} homeHref={href('inicio')} />
    <BackLink />
    <main id="conteudo" className={`vs-passos-main is-${current}`}>
      {!isPassosSection(section) && <p className="vs-passos-notice" role="status">Esta seção não existe. Você está no início da experiência.</p>}
      <View />
      {current !== 'inicio' && <nav className="vs-passos-band vs-passos-next" aria-label="Outras seções">{passosSections.filter(item => item.id !== current).map(item => <a key={item.id} href={href(item.id)}>{item.label}<ArrowUpRight size={15} aria-hidden="true" /></a>)}</nav>}
    </main>
    <PortalFooter />
  </div>;
}
