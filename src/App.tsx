import {DayPicker,ActivityTime,ActivityDetails} from './components/ProgramUI';
import HomeFooter from './components/HomeFooter';
import Brand from './components/Brand';
import BackLink from './components/BackLink';
import {editorialActivityIds} from './data/editorial';
import PlaceThumbnail from './components/PlaceThumbnail';
import TimeMachine,{TimeMachineProvider} from './components/TimeMachine';
import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import MapBoundary from './components/MapBoundary';
import Icon from './components/Icon';
import PlacePhoto from './components/PlacePhoto';
import PlaceSymbol, { placeKind } from './components/PlaceSymbol';
import CategoryChips, { categoryItems, categoryTone } from './components/CategoryChips';
import SelectField from './components/SelectField';
import * as Accordion from '@radix-ui/react-accordion';
import { ArrowUpRight, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { activities, categories, geoSources, places, reviewedAt } from './data/festival';
import { days, displayTime, festivalStart, festivalEnd, filterPlaces, normalize, isActivityLive, festivalDayAt } from './domain/catalog';
import type { Activity, FestivalDay, Place } from './domain/catalog';

const About=lazy(()=>import('./features/About'));
const Schedule=lazy(()=>import('./features/Schedule'));
const HomeCulture=lazy(()=>import('./features/HomeCulture'));
const StageArtists=lazy(()=>import('./components/StageArtists'));
const MapView = lazy(() => import('./features/MapView'));
const CultureView = lazy(() => import('./features/CultureView'));
const HistoricalMap = lazy(() => import('./features/HistoricalMap'));
const culturePages = ['cultura','roteiros','memorias','historia','artistas'];
const readRoute = () => {
  const [path = '/', query = ''] = window.location.hash.slice(1).split('?');
  const params = new URLSearchParams(query);
  const origin=params.get('origem') || '';
  return { page: culturePages.includes(path.slice(1)) ? path.slice(1) : path === '/mapa' ? 'mapa' : path === '/programacao' ? 'programacao' : path === '/sobre' ? 'sobre' : 'inicio',
    day: (['20', '21', '22'].includes(params.get('dia') || '') ? params.get('dia') : '20') as FestivalDay, placeId: params.get('lugar') || '', query:params.get('busca') || '', category:categories.includes(params.get('categoria') as typeof categories[number]) ? params.get('categoria')! : 'Todos', agendaPlace:params.get('espaco') || '', nowOnly:params.get('agora')==='1', origin:['/programacao?','/roteiros?','/memorias?','/historia?'].some(prefix=>origin.startsWith(prefix))?origin:'',culturalRoute:params.get('roteiro') || 'patrimonio', historicalMode:params.get('modo')==='historico' };
};
function go(page: string, day: FestivalDay = '20', placeId = '', origin = '') {
  const [current,search='']=window.location.hash.slice(1).split('?');
  const params = new URLSearchParams(current===`/${page}` ? search : '');
  params.set('dia',day);params.delete('lugar');
  if(origin) params.set('origem',origin);
  if (placeId) params.set('lugar', placeId);
  window.location.hash = page === 'inicio' ? '/fasc' : `/${page}?${params}`;
}
function updateFilters(values:Record<string,string>) {
  const [path,search='']=window.location.hash.slice(1).split('?');
  const params=new URLSearchParams(search);
  for(const [name,value] of Object.entries(values)) {if(value && value!=='Todos') params.set(name,value);else params.delete(name);}
  window.history.replaceState(null,'',`#${path}?${params}`);
  window.dispatchEvent(new Event('hashchange'));
}
function Home() {
  return <><main id="conteudo" className="home">
    <section className="hero">
      <div className="hero-copy"><p className="eyebrow">São Cristóvão · 20—22 novembro 2026</p><h1>A cidade<br />é o <span>festival.</span></h1>
        <p className="hero-description">Encontre seu palco, descubra um novo caminho.<br />Viva o FASC por toda São Cristóvão.</p>
        <div className="hero-actions"><a className="button primary hero-action" href="#/mapa?dia=20">Explorar o mapa <ArrowUpRight size={22} aria-hidden="true" /></a>
          <a className="text-action" href="#/programacao?dia=20">Ver programação <Icon name="arrow" size={18} /></a></div>
      </div>
      <figure className="hero-art">
        <div className="hero-art-image" role="img" aria-label="Palco e público do FASC 2025 na Praça São Francisco. Foto: Julia Rodrigues." />
        <a className="hero-photo-credit" href="https://www.saocristovao.se.gov.br/noticia/primeira-noite-de-shows-do-fasc-2025-e-marcada-por-sucesso-de-publico-e-representatividade-negra-nos-palcos" target="_blank" rel="noreferrer">FASC 2025 · Foto: Julia Rodrigues / Prefeitura de São Cristóvão <Icon name="external" size={12} /></a>
        <figcaption className="art-ticket">Tradição que<br />move o presente</figcaption>
      </figure>
    </section>
    <div className="festival-ribbon"><span>Música · Teatro · Cultura popular</span><span className="ribbon-star" aria-hidden="true" /><span>41º FASC · São Cristóvão</span></div>
    <section className="festival-calendar" aria-labelledby="calendar-title"><h2 id="calendar-title">Três dias.<br /> Muitos encontros.</h2>
      <div className="festival-dates">{days.map(d => <a key={d.id} className={`date-block date-${d.id}`} href={`#/programacao?dia=${d.id}`} aria-label={`Ver programação de ${d.name}, ${d.id} de novembro`}><strong>{d.id}</strong><span>{d.name}<small>novembro <ArrowUpRight size={15} aria-hidden="true" /></small></span></a>)}</div>
    </section>
    <section className="home-explore" aria-label="Explorar por categoria"><div className="start-links">{categoryItems.map(({name,tone,icon:Symbol})=>{const count=places.filter(place=>place.category===name).length;return <a key={name} className={`start-card tone-${tone}`} href={`#/mapa?dia=20&categoria=${encodeURIComponent(name)}`}><Symbol className="start-card-symbol" size={27} strokeWidth={1.8} aria-hidden="true" /><strong>{name}</strong><span className="start-card-count">{count} {count===1?'espaço':'espaços'}</span><span className="start-card-action">Explorar <ArrowUpRight size={18} aria-hidden="true" /></span></a>;})}</div></section>
    <Suspense fallback={<div className="home-editorial-loading" role="status">Abrindo histórias da cidade…</div>}><HomeCulture/></Suspense>
  </main><HomeFooter brand={<Brand/>}/></>;
}
function PlaceDetail({ place, day, onBack, returnLabel }: { place: Place; day: FestivalDay; onBack: () => void; returnLabel?:string }) {
  const heading = useRef<HTMLHeadingElement>(null);
  const [copied, setCopied] = useState('');
  useEffect(() => { heading.current?.focus(); setCopied(''); }, [place.id]);
  const rows = activities.filter(a => a.placeId === place.id && a.day === day).sort((a, b) => festivalStart(a.day, a.time).localeCompare(festivalStart(b.day, b.time)));
  const destination = `${place.name}, ${place.address}, São Cristóvão, Sergipe, Brasil`;
  async function copyAddress() {
    try { await navigator.clipboard.writeText(destination); setCopied('Endereço copiado.'); }
    catch { setCopied('Não foi possível copiar. Você pode selecionar o endereço acima.'); }
  }
  return <section className="place-detail" aria-label="Detalhes do espaço">
    <button className="back-button" onClick={onBack}><Icon name="back" size={18} /> {returnLabel || 'Todos os espaços'}</button>
    <div className="place-cover"><PlacePhoto placeId={place.id}/></div>
    <span className={`category-label tone-${categoryTone(place.category)}`}><span className="detail-category-symbol"><PlaceSymbol place={place} size={18} /></span>{place.category}</span><h2 tabIndex={-1} ref={heading}>{place.name}</h2>
    <p className="place-address"><Icon name="pin" size={17} />{place.address}</p><p className="precision-note">{place.locationKind!=='equipment' || place.id==='bica' ? 'Referência aproximada: o ponto indica a área, não a entrada exata.' : 'Referência do equipamento. Confirme a entrada e o acesso ao chegar.'}</p>
    {rows.length > 0 && <p className="day-preview"><strong>{displayTime(rows[0].time)}</strong><span>Primeiro horário anunciado · {day}/11<br />{rows[0].title}</span></p>}
    <div className="place-actions">{place.canNavigate ? <a className="button primary" href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=walking`} target="_blank" rel="noreferrer">Como chegar <Icon name="external" size={17} /></a> : <p className="notice">O endereço está em conferência. O trajeto será disponibilizado após a confirmação.</p>}
      {place.canNavigate && <button className="small-action" onClick={copyAddress}>Copiar endereço</button>}<span role="status" className="copy-status">{copied}</span>
    </div>
    {place.canNavigate && <p className="helper">O trajeto abre no Google Maps. Confirme acessos e bloqueios locais ao chegar.</p>}
    <div className="detail-section"><h3>Programação · {day}/11</h3>{rows.length ? <ol className="activity-list">{rows.map(row => <li key={row.id}><ActivityTime activity={row} /><div><strong>{row.title}</strong><ActivityDetails activity={row} /></div></li>)}</ol> : <div className="notice">Nenhuma atividade deste espaço está indicada para {day}/11. Consulte os outros dias.</div>}</div>
    {place.category==='Música' && <Suspense fallback={<p role="status">Abrindo a memória deste palco…</p>}><StageArtists key={place.id} placeId={place.id}/></Suspense>}
    <div className="detail-section detail-culture"><h3>Leve esse encontro com você</h3><a href={`#/memorias?dia=${day}&espaco=${place.id}`}>Escrever uma lembrança <ArrowUpRight size={16} aria-hidden="true" /></a><a href={`#/roteiros?dia=${day}`}>Explorar roteiros culturais <ArrowUpRight size={16} aria-hidden="true" /></a><a href={`#/historia?dia=${day}`}>Conhecer a linha do tempo <ArrowUpRight size={16} aria-hidden="true" /></a></div>
    <div className="detail-section"><h3>Informações do espaço</h3><p>{place.description}</p><p className="helper">{place.coordinateNote || 'A localização exata no mapa está em conferência. Este espaço permanece disponível na lista.'}</p><p className="helper">Condições de acessibilidade ainda não verificadas para esta edição.</p>
      {place.locationSources && <details className="location-sources"><summary>Fontes da localização</summary><ul>{place.locationSources.filter(url => !url.startsWith('/programacao-fasc')).map((url,i) => <li key={url}><a href={url} target="_blank" rel="noreferrer">Referência {i+1} <Icon name="external" size={12} /></a></li>)}</ul></details>}
    </div>
  </section>;
}
function Explore({ day, placeId, query, category, origin }: { day: FestivalDay; placeId: string; query:string; category:string; origin:string }) {
  const setQuery=(value:string)=>{lastPlace.current='';updateFilters({busca:value,lugar:''});};
  const setCategory=(value:string)=>{lastPlace.current='';updateFilters({categoria:value,lugar:''});};
  const panel=useRef<HTMLElement>(null);
  const lastPlace=useRef('');
  const listScroll=useRef(0);
  const request=useRef(0);
  useEffect(()=>()=>{request.current++;},[]);
  useEffect(()=>{if(placeId){lastPlace.current=placeId;panel.current?.scrollTo(0,0);}else if(lastPlace.current && panel.current){
    const button=Array.from(panel.current.querySelectorAll<HTMLButtonElement>('.place-row')).find(button=>button.dataset.place===lastPlace.current);
    button?.focus({preventScroll:true});panel.current.scrollTop=listScroll.current;
  }},[placeId]);
  const [mobileView, setMobileView] = useState<'lista' | 'mapa'>('lista');
  const [detailOpen, setDetailOpen] = useState(true);
  const [position, setPosition] = useState<{ lat: number; lng: number; accuracy: number } | null>(null);
  const [geoMessage, setGeoMessage] = useState('');
  const [locating, setLocating] = useState(false);
  useEffect(()=>{
    if(!geoMessage || locating)return;
    const timer=window.setTimeout(()=>setGeoMessage(''),7000);
    return()=>window.clearTimeout(timer);
  },[geoMessage,locating]);
  const selected = places.find(p => p.id === placeId);
  const filtered = useMemo(() => filterPlaces(places, activities, query, category),[query,category]);
  const pinCount = filtered.filter(p => p.coordinates).length;
  function select(id: string, showDetails = true) {
    listScroll.current=panel.current?.scrollTop || 0;
    const term = normalize(query);
    const matching = term ? activities.filter(a => a.placeId === id && normalize(`${a.title} ${a.details || ''}`).includes(term)) : [];
    const match = matching.find(a => a.day === day) || matching[0];
    setDetailOpen(showDetails || window.matchMedia('(max-width: 800px)').matches);
    go('mapa',match?.day || day,id); setMobileView('lista');
  }
  function locate() {
    if (!navigator.geolocation) { setGeoMessage('Este navegador não disponibiliza localização. Continue pela lista.'); return; }
    setLocating(true); setGeoMessage('Aguardando a localização do seu aparelho…');
    const requestId=++request.current;
    try { navigator.geolocation.getCurrentPosition(p => {
      if(requestId!==request.current) return;
      setPosition({ lat: p.coords.latitude, lng: p.coords.longitude, accuracy: p.coords.accuracy });
      setLocating(false); setMobileView('mapa');
      go('mapa', readRoute().day);
      const far = Math.abs(p.coords.latitude + 11.0144) > .05 || Math.abs(p.coords.longitude + 37.2063) > .05;
      setGeoMessage(far ? 'Você está fora da área central do festival. Use “Voltar ao festival” para explorar os espaços.' : `Localização aproximada recebida (precisão de ${Math.round(p.coords.accuracy)} m).`);
    }, error => { if(requestId!==request.current) return; setLocating(false); setGeoMessage(error.code === 1 ? 'Localização não autorizada. Você pode explorar todos os espaços pela lista.' : error.code === 3 ? 'O aparelho demorou para responder. Tente novamente ou use a lista.' : 'Não foi possível obter sua posição. Você pode usar a lista.'); }, { timeout: 12000, maximumAge: 60000 }); }
    catch { setLocating(false);setGeoMessage('Não foi possível obter sua posição. Você pode usar a lista.'); }
  }
  return <main id="conteudo" className="explorer" data-day={day}>
    <div className="explore-heading"><div><p className="eyebrow">FASC 2026 · São Cristóvão</p><h1>Encontre seu lugar.</h1></div><DayPicker day={day} onChange={d => go('mapa', d, placeId)} /></div>
    <TimeMachine/>
    <div className="mobile-switch" role="group" aria-label="Visualização"><button aria-pressed={mobileView === 'lista'} onClick={() => setMobileView('lista')}><Icon name="list" size={17} /> {selected ? 'Detalhes' : 'Lista'}</button><button aria-pressed={mobileView === 'mapa'} onClick={() => setMobileView('mapa')}><Icon name="map" size={17} /> Mapa</button></div>
    <div className={`workspace view-${mobileView}`}>
      <aside ref={panel} className="places-panel" aria-label="Espaços do festival">{selected && detailOpen ? <PlaceDetail place={selected} day={day} returnLabel={origin?.startsWith('/programacao?')?'Voltar à programação':origin?'Voltar à cultura':undefined} onBack={() => {if(origin) window.location.hash=origin;else go('mapa', day);}} /> : <>
        <div className="list-controls">{placeId && !selected && <p className="notice" role="status">Espaço não encontrado. Escolha um lugar na lista.</p>}<label className="search-box"><Icon name="search" /><span className="sr-only">Buscar espaço ou atração</span><input placeholder="Espaço, artista ou atividade" value={query} onChange={e => setQuery(e.target.value)} /></label>
          <details className="filter-disclosure map-filters"><summary><SlidersHorizontal size={16} aria-hidden="true" />Categorias<span>{category==='Todos'?'Todas':category}</span><ChevronDown size={16} aria-hidden="true" /></summary><CategoryChips value={category} onChange={setCategory} /></details>
          {category!=='Todos' && <button className="filter-reset" onClick={()=>setCategory('Todos')}>Limpar categoria <Icon name="close" size={14} /></button>}
          <div className="result-count" aria-live="polite"><strong>{filtered.length} {filtered.length === 1 ? 'espaço' : 'espaços'}</strong><span>{pinCount} com referência no mapa</span></div>
        </div>
        <div className="places-list">{filtered.length ? filtered.map(place => <button className={`place-row ${selected?.id===place.id?'is-selected':''}`} aria-pressed={selected?.id===place.id} data-place={place.id} key={place.id} onClick={() => select(place.id)}><PlaceThumbnail place={place}/><span className="row-body"><span className="row-category">{String(place.number).padStart(2,'0')} · {place.category}</span><strong>{place.name}</strong><span>{place.address}</span></span><Icon name="arrow" size={16} /></button>) : <div className="empty"><h2>Nenhum espaço encontrado</h2><p>Tente outro nome ou remova os filtros.</p><button className="button" onClick={() => { updateFilters({busca:'',categoria:''}); }}>Limpar filtros</button></div>}</div>
      </>}</aside>
      <section className="map-panel" aria-label="Mapa e localização"><MapBoundary><Suspense fallback={<div className="map-loading" role="status">Abrindo o mapa de São Cristóvão…</div>}><MapView places={filtered} selected={selected} onSelect={id=>select(id,false)} position={position} /></Suspense></MapBoundary>
        {selected && !detailOpen && <article className={`map-selection tone-${categoryTone(selected.category)}`} aria-label="Resumo do espaço selecionado"><PlacePhoto placeId={selected.id} compact/><span className="eyebrow">{selected.category} · {day}/11</span><h2><span className="sr-only">Selecionado: </span>{selected.name}</h2><p>{selected.address}</p><p className="selection-agenda">{activities.filter(a=>a.placeId===selected.id && a.day===day).slice(0,2).map(a=><span key={a.id}><strong>{displayTime(a.time)}</strong> {a.title}</span>)}</p><button className="text-action" onClick={()=>{setDetailOpen(true);setMobileView('lista');panel.current?.scrollTo({top:0});}}>Ver detalhes <ArrowUpRight size={16} aria-hidden="true" /></button></article>}
        <div className="map-tools"><button className="button" onClick={locate} disabled={locating}><Icon name="locate" size={19} />{locating ? 'Localizando…' : 'Minha localização'}</button>{position && <button className="button" onClick={() => { request.current++; setLocating(false); setPosition(null); setGeoMessage('Mapa retornou à área do festival.'); go('mapa', day); }}>Voltar ao festival</button>}</div>
        {geoMessage && <div className="geo-message" role="status"><span>{geoMessage}</span><button type="button" aria-label="Fechar aviso de localização" onClick={()=>setGeoMessage('')}><Icon name="close" size={18}/></button></div>}
        <div className="map-caption"><span className="precision-swatch" /><span><strong>Referência aproximada</strong><span>Confirme a entrada ao chegar. Saiba mais na legenda.</span></span></div>
      </section>
    </div>
  </main>;
}
export default function App() {
  const [route, setRoute] = useState(readRoute);
  const routeIdentity=`${route.page}:${route.historicalMode}`;
  const previousPage=useRef(routeIdentity);
  useEffect(()=>{if(previousPage.current!==routeIdentity){
    const title=document.querySelector<HTMLHeadingElement>('.place-detail h2') || document.querySelector<HTMLHeadingElement>('main h1');title?.setAttribute('tabindex','-1');title?.focus({preventScroll:true});previousPage.current=routeIdentity;
  }},[route.page,route.historicalMode]);
  useEffect(() => { const listener = () => setRoute(readRoute()); window.addEventListener('hashchange', listener); return () => window.removeEventListener('hashchange', listener); }, []);
  useEffect(() => { const titles:Record<string,string>={inicio:'VivaSE Cultura',cultura:'Cultura | VivaSE Cultura',mapa:'Mapa | VivaSE Cultura',programacao:'Programação | VivaSE Cultura',roteiros:'Roteiros | VivaSE Cultura',memorias:'Memórias | VivaSE Cultura',historia:'Linha do tempo | VivaSE Cultura',artistas:'Artistas | VivaSE Cultura',sobre:'Sobre | VivaSE Cultura'};document.title = `${route.page==='mapa' && route.historicalMode?'Mapa histórico | VivaSE Cultura':titles[route.page]} — FASC 2026`; window.scrollTo(0, 0); }, [route.page,route.historicalMode]);
  return <TimeMachineProvider><div className={`app page-${route.page}`}><a href="#conteudo" className="skip-link" onClick={e => { e.preventDefault(); const main = document.getElementById('conteudo'); main?.setAttribute('tabindex', '-1'); main?.focus(); }}>Pular para o conteúdo</a>
    <header className="site-header"><Brand /><nav aria-label="Navegação principal">{[{ page: 'mapa', label: 'Mapa' }, { page: 'programacao', label: 'Programação' }, { page:'cultura',label:'Cultura' }, { page: 'sobre', label: 'Sobre' }].map(item => <a key={item.page} href={`#/${item.page}?dia=${route.day}`} aria-current={route.page === item.page || (item.page==='cultura' && culturePages.includes(route.page)) ? 'page' : undefined}>{item.label}</a>)}</nav><a className="edition-label" href="#/fasc" title="Início do FASC"><img src={`${import.meta.env.BASE_URL}images/fasc-2026-logo.svg`} alt="FASC 2026 — início do festival" width="100" height="34" /></a></header>
    <BackLink />
    {route.page === 'inicio' ? <Home /> : route.page === 'mapa' && route.historicalMode ? <Suspense fallback={<main id="conteudo" className="content-page"><p role="status">Abrindo o acervo histórico…</p></main>}><HistoricalMap day={route.day}/></Suspense> : route.page === 'mapa' ? <Explore day={route.day} placeId={route.placeId} query={route.query} category={route.category} origin={route.origin} /> : route.page === 'programacao' ? <Suspense fallback={<main id="conteudo" className="content-page"><p role="status">Abrindo a programação…</p></main>}><Schedule day={route.day} query={route.query} placeId={route.agendaPlace} category={route.category} nowOnly={route.nowOnly}/></Suspense> : culturePages.includes(route.page) ? <Suspense fallback={<main id="conteudo" className="content-page" aria-busy="true"><p role="status">Abrindo os caminhos da cultura…</p></main>}><CultureView page={route.page as 'cultura'|'roteiros'|'memorias'|'historia'|'artistas'} day={route.day} routeId={route.culturalRoute} initialPlace={route.agendaPlace} /></Suspense> : <Suspense fallback={<main id="conteudo" className="content-page"><p role="status">Abrindo a história do VivaSE…</p></main>}><About day={route.day}/></Suspense>}
  </div></TimeMachineProvider>;
}
