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

const MapView = lazy(() => import('./features/MapView'));
const CultureView = lazy(() => import('./features/CultureView'));
const HistoricalMap = lazy(() => import('./features/HistoricalMap'));
const culturePages = ['roteiros','memorias','historia','artistas'];
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
  window.location.hash = page === 'inicio' ? '/' : `/${page}?${params}`;
}
function updateFilters(values:Record<string,string>) {
  const [path,search='']=window.location.hash.slice(1).split('?');
  const params=new URLSearchParams(search);
  for(const [name,value] of Object.entries(values)) {if(value && value!=='Todos') params.set(name,value);else params.delete(name);}
  window.history.replaceState(null,'',`#${path}?${params}`);
  window.dispatchEvent(new Event('hashchange'));
}
function Brand() {
  return <a className="brand" href="#/" aria-label="VivaSE Cultura — início"><span className="brand-name">Viva<span>SE</span><svg className="brand-spark" aria-hidden="true" width="29" height="29" viewBox="0 0 30 30" fill="none" stroke="currentColor"><path d="M15 1v28M1 15h28M5 5l20 20M5 25 25 5" /></svg></span><span className="brand-label">Cultura</span></a>;
}
function DayPicker({ day, onChange }: { day: FestivalDay; onChange: (day: FestivalDay) => void }) {
  return <div className="days" role="group" aria-label="Dia de programação">{days.map(d => <button key={d.id} className={`day day-${d.id}`} aria-label={`${d.name}, ${d.id} de novembro`} aria-pressed={day === d.id} onClick={() => onChange(d.id)}><strong>{d.short}, {d.id}</strong><span>novembro</span></button>)}</div>;
}
function ActivityTime({ activity }: { activity: Activity }) {
  const end = festivalEnd(activity);
  const endDate = end && new Date(end).toLocaleDateString('pt-BR',{timeZone:'America/Sao_Paulo',day:'2-digit',month:'2-digit'});
  return <time className={activity.time.slice(3)!=='00'?'has-minutes':undefined} dateTime={festivalStart(activity.day,activity.time)}><span>{displayTime(activity.time)}</span>{activity.endTime && <span className="end-time">até {displayTime(activity.endTime)}</span>}{Number(activity.time.slice(0,2)) < 6 ? <small>{Number(activity.day)+1}/11 · madrugada</small> : endDate && endDate !== `${activity.day}/11` ? <small>até {endDate}</small> : null}</time>;
}
function ActivityDetails({ activity }: { activity: Activity }) {
  if(!activity.details)return null;
  return <Accordion.Root type="single" collapsible className="activity-accordion"><Accordion.Item value="details"><Accordion.Header><Accordion.Trigger>Participantes e detalhes<ChevronDown size={16} aria-hidden="true" /></Accordion.Trigger></Accordion.Header><Accordion.Content><p>{activity.details}</p></Accordion.Content></Accordion.Item></Accordion.Root>;
}
function Home() {
  return <main id="conteudo" className="home">
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
    <section className="home-culture"><div><p className="eyebrow">O encontro continua</p><h2>Para além<br/>do palco.</h2><p>Descubra lugares, conheça histórias e guarde o que o festival deixou em você.</p></div><div>{[{id:'roteiros',title:'Caminhos pela cultura',label:'Explorar roteiros'},{id:'memorias',title:'Histórias que ficam',label:'Ler e escrever memórias'},{id:'historia',title:'O FASC através do tempo',label:'Conhecer a linha do tempo'}].map((item,index)=><a key={item.id} href={`#/${item.id}?dia=20`}><span>0{index+1}</span><span><strong>{item.title}</strong><small>{item.label}</small></span><ArrowUpRight size={23} aria-hidden="true" /></a>)}</div></section>
    <footer className="home-footer"><span>VivaSE Cultura — seu guia para viver o FASC.</span><a href="#/sobre">Sobre o protótipo e os créditos <Icon name="arrow" size={16} /></a></footer>
  </main>;
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
    <span className={`category-label tone-${categoryTone(place.category)}`}><span className="detail-category-symbol"><PlaceSymbol place={place} size={18} /></span>{place.category}</span><h2 tabIndex={-1} ref={heading}>{place.name}</h2>
    <PlacePhoto placeId={place.id}/><p className="place-address"><Icon name="pin" size={17} />{place.address}</p><p className="precision-note">{place.locationKind!=='equipment' || place.id==='bica' ? 'Referência aproximada: o ponto indica a área, não a entrada exata.' : 'Referência do equipamento. Confirme a entrada e o acesso ao chegar.'}</p>
    {rows.length > 0 && <p className="day-preview"><strong>{displayTime(rows[0].time)}</strong><span>Primeiro horário anunciado · {day}/11<br />{rows[0].title}</span></p>}
    <div className="place-actions">{place.canNavigate ? <a className="button primary" href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=walking`} target="_blank" rel="noreferrer">Como chegar <Icon name="external" size={17} /></a> : <p className="notice">O endereço está em conferência. O trajeto será disponibilizado após a confirmação.</p>}
      {place.canNavigate && <button className="small-action" onClick={copyAddress}>Copiar endereço</button>}<span role="status" className="copy-status">{copied}</span>
    </div>
    {place.canNavigate && <p className="helper">O trajeto abre no Google Maps. Confirme acessos e bloqueios locais ao chegar.</p>}
    <div className="detail-section"><h3>Programação · {day}/11</h3>{rows.length ? <ol className="activity-list">{rows.map(row => <li key={row.id}><ActivityTime activity={row} /><div><strong>{row.title}</strong><ActivityDetails activity={row} /></div></li>)}</ol> : <div className="notice">Nenhuma atividade deste espaço está indicada para {day}/11. Consulte os outros dias.</div>}</div>
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
  useEffect(()=>{if(placeId) lastPlace.current=placeId;else if(lastPlace.current && panel.current){
    const button=Array.from(panel.current.querySelectorAll<HTMLButtonElement>('.place-row')).find(button=>button.dataset.place===lastPlace.current);
    button?.focus({preventScroll:true});panel.current.scrollTop=listScroll.current;
  }},[placeId]);
  const [mobileView, setMobileView] = useState<'lista' | 'mapa'>('lista');
  const [detailOpen, setDetailOpen] = useState(true);
  const [position, setPosition] = useState<{ lat: number; lng: number; accuracy: number } | null>(null);
  const [geoMessage, setGeoMessage] = useState('');
  const [locating, setLocating] = useState(false);
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
        <div className="places-list">{filtered.length ? filtered.map(place => <button className={`place-row ${selected?.id===place.id?'is-selected':''}`} aria-pressed={selected?.id===place.id} data-place={place.id} key={place.id} onClick={() => select(place.id)}><span className={`place-symbol tone-${categoryTone(place.category)} kind-${placeKind(place)}`}><PlaceSymbol place={place} /></span><span className="row-body"><span className="row-category">{String(place.number).padStart(2,'0')} · {place.category}</span><strong>{place.name}</strong><span>{place.address}</span></span><Icon name="arrow" size={16} /></button>) : <div className="empty"><h2>Nenhum espaço encontrado</h2><p>Tente outro nome ou remova os filtros.</p><button className="button" onClick={() => { updateFilters({busca:'',categoria:''}); }}>Limpar filtros</button></div>}</div>
      </>}</aside>
      <section className="map-panel" aria-label="Mapa e localização"><MapBoundary><Suspense fallback={<div className="map-loading" role="status">Abrindo o mapa de São Cristóvão…</div>}><MapView places={filtered} selected={selected} onSelect={id=>select(id,false)} position={position} /></Suspense></MapBoundary>
        {selected && !detailOpen && <article className={`map-selection tone-${categoryTone(selected.category)}`} aria-label="Resumo do espaço selecionado"><PlacePhoto placeId={selected.id} compact/><span className="eyebrow">{selected.category} · {day}/11</span><h2><span className="sr-only">Selecionado: </span>{selected.name}</h2><p>{selected.address}</p><p className="selection-agenda">{activities.filter(a=>a.placeId===selected.id && a.day===day).slice(0,2).map(a=><span key={a.id}><strong>{displayTime(a.time)}</strong> {a.title}</span>)}</p><button className="text-action" onClick={()=>{setDetailOpen(true);setMobileView('lista');panel.current?.scrollTo({top:0});}}>Ver detalhes <ArrowUpRight size={16} aria-hidden="true" /></button></article>}
        <div className="map-tools"><button className="button" onClick={locate} disabled={locating}><Icon name="locate" size={19} />{locating ? 'Localizando…' : 'Minha localização'}</button>{position && <button className="button" onClick={() => { setPosition(null); setGeoMessage('Mapa retornou à área do festival.'); go('mapa', day); }}>Voltar ao festival</button>}</div>
        {geoMessage && <div className="geo-message" role="status">{geoMessage}</div>}
        <div className="map-caption"><span className="precision-swatch" /><span><strong>Referência aproximada</strong><span>Confirme a entrada ao chegar. Saiba mais na legenda.</span></span></div>
      </section>
    </div>
  </main>;
}
function Schedule({ day, query, placeId, category, nowOnly }: { day: FestivalDay; query:string; placeId:string; category:string; nowOnly:boolean }) {
  const [now,setNow]=useState(()=>Date.now());
  useEffect(()=>{const timer=window.setInterval(()=>setNow(Date.now()),30000);return()=>window.clearInterval(timer);},[]);
  const term=normalize(query);
  const currentDay=festivalDayAt(now);
  const rows=activities.filter(a=>a.day===day && (!placeId || a.placeId===placeId) && (category==='Todos' || places.find(p=>p.id===a.placeId)?.category===category) && (!nowOnly || isActivityLive(a,now)) && normalize(`${a.title} ${a.details || ''} ${places.find(p=>p.id===a.placeId)?.name || ''}`).includes(term)).sort((a,b)=>festivalStart(a.day,a.time).localeCompare(festivalStart(b.day,b.time)) || a.id.localeCompare(b.id));
  const timeLabel=new Date(now).toLocaleString('pt-BR',{timeZone:'America/Sao_Paulo',day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'});
  function toggleNow(){
    const params=new URLSearchParams(window.location.hash.split('?')[1] || '');
    if(nowOnly)params.delete('agora');else{params.set('agora','1');if(currentDay)params.set('dia',currentDay);}
    window.location.hash=`/programacao?${params}`;
  }
  return <main id="conteudo" className="schedule-page"><div className="schedule-heading"><div><p className="eyebrow">FASC 2026 · Encontros por toda a cidade</p><h1>Viva cada encontro.</h1><span className="sr-only">Programação</span></div>
    <DayPicker day={day} onChange={d=>{go('programacao',d);updateFilters({agora:''});}} /></div>
    <div className="schedule-body"><div className="schedule-toolbar"><label className="search-box"><Icon name="search" /><span className="sr-only">Buscar na programação</span><input value={query} onChange={e=>updateFilters({busca:e.target.value})} placeholder="Artista, atividade ou participante" /></label>
      <button className="now-filter" aria-pressed={nowOnly} onClick={toggleNow}><span className={`live-dot ${nowOnly && currentDay ? 'is-active' : ''}`} />Acontecendo agora</button></div>
    <details className="filter-disclosure schedule-filter-panel"><summary><SlidersHorizontal size={16} aria-hidden="true" />Filtros<span>{[category!=='Todos'?category:'',placeId?places.find(p=>p.id===placeId)?.name:''].filter(Boolean).join(' · ') || 'Categoria e espaço'}</span><ChevronDown size={16} aria-hidden="true" /></summary><div className="schedule-filters"><CategoryChips value={category} onChange={value=>updateFilters({categoria:value,espaco:''})} /><SelectField label="Espaço da programação" value={placeId} onChange={value=>updateFilters({espaco:value})} options={[{value:'',label:'Todos os espaços'},...places.filter(place=>category==='Todos' || place.category===category || place.id===placeId).map(place=>({value:place.id,label:place.name}))]} /></div></details>
    {nowOnly && <p className="device-clock">Relógio do aparelho · {timeLabel}</p>}
    {nowOnly && <p className="now-explanation">Somente atividades com início e término informados. Sem horário final, a duração não é presumida. {!currentDay && 'O relógio do aparelho está fora dos dias do festival.'}</p>}
    <div className="schedule-summary"><p aria-live="polite"><strong>{rows.length}</strong> {rows.length===1?'atividade':'atividades'} em {day}/11</p>{(query || placeId || category!=='Todos' || nowOnly) && <button className="small-action" onClick={()=>updateFilters({busca:'',espaco:'',categoria:'',agora:''})}>Limpar filtros</button>}</div>
    <details className="agenda-note"><summary>Conferida em {reviewedAt} · Sujeita a alterações <ChevronDown size={14} aria-hidden="true" /></summary><p>Sessões e janelas gerais seguem o agrupamento publicado; horários finais só aparecem quando informados.</p></details>
    {rows.length ? <ol className="schedule-list">{rows.map(row=>{
      const place=places.find(p=>p.id===row.placeId)!;
      const live=isActivityLive(row,now);
      return <li key={row.id} className={`timeline-row tone-${categoryTone(place.category)} ${live?'is-live':''}`}><div className="timeline-time"><ActivityTime activity={row} /></div><article className="event-card"><div className="event-body"><div className="activity-category"><span className="category-dot" />{place.category}{live && <span className="live-badge">Em andamento</span>}</div><h2>{row.title}</h2><p className="event-place">{place.name}</p><ActivityDetails activity={row} /></div><button className="event-action" aria-label={`Ver espaço: ${row.title}`} onClick={()=>go('mapa',day,row.placeId,window.location.hash.slice(1))}><ArrowUpRight size={21} aria-hidden="true" /><span className="sr-only">Ver espaço</span></button></article></li>;
    })}</ol> : <div className="empty"><h2>Nenhuma atividade encontrada</h2><p>{nowOnly ? (!currentDay?'O festival acontece de 20 a 22 de novembro. Escolha um dia para consultar a programação.':'Nenhuma atividade com intervalo informado está em andamento nesta consulta.'):'Confira outro dia ou remova os filtros para explorar outras atividades.'}</p></div>}</div>
  </main>;
}
function About() {
  return <main id="conteudo" className="content-page about"><p className="eyebrow">Cultura sergipana, no seu caminho</p><h1>Sobre o VivaSE</h1><p className="page-intro">Um guia para se encontrar no festival e descobrir São Cristóvão.</p><section><h2>Um festival, muitos caminhos</h2><p>O VivaSE aproxima quem chega à cidade dos espaços, das atrações e da cultura local. Explore o mapa, consulte a programação e escolha o seu próximo encontro.</p><p>Orientação durante o festival, descoberta cultural e preservação da memória são as três prioridades do projeto. Explore roteiros culturais, relatos publicados e marcos documentados do festival. Suas próprias lembranças podem ser guardadas somente neste navegador.</p><p>Este é um protótipo independente em desenvolvimento para apresentação no ideathon. Não é um canal oficial de atualização do FASC.</p><details className="coverage-note"><summary>Cobertura deste protótipo <ChevronDown size={16} aria-hidden="true" /></summary><p>O inventário inicial contém {places.length} espaços ou frentes de programação. Há equipamentos compartilhados e cortejos itinerantes: esse total não é o número de endereços físicos distintos.</p><p>A agenda reúne 144 registros dos três dias, incluindo sessões, janelas de funcionamento e aberturas. Isso não equivale ao número de artistas.</p></details></section>
      <section><h2>Fontes e créditos</h2><p>Programação completa v4 de 24 páginas e peças da identidade do FASC 2026 fornecidas pelo responsável pelo projeto. A arte foi preservada como referência visual da edição. Revisão inicial: {reviewedAt}.</p><ul>{geoSources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a></li>)}</ul><p>Cartografia: MapTiler e © colaboradores do OpenStreetMap. Mapa vetorial com MapLibre. Os marcadores distinguem referências de equipamento, praça, rua e saída de cortejo. Cada espaço possui seu marcador. Referências compartilhadas recebem pequenos deslocamentos visuais fixos, ligados ao ponto original; suas coordenadas não são alteradas. As fontes e limites de precisão estão nos detalhes de cada espaço. Não são posições garantidas das estruturas temporárias ou de suas entradas.</p></section>
      <section><h2>Suas lembranças</h2><p>As lembranças pessoais são salvas neste navegador, neste endereço do site. Não são publicadas, enviadas a um servidor ou sincronizadas. É possível excluí-las na tela de Memórias. Limpar os dados do navegador pode apagá-las. Relatos publicados têm fonte e autoria; exemplos fictícios são identificados.</p></section><section><h2>Fotografias dos espaços</h2><p>As imagens têm fonte e crédito no próprio card. Fotos de edições anteriores e interiores são identificados; não comprovam a montagem atual nem o acesso em 2026. Cada registro tem uma imagem contextualizada: fotografias do equipamento, de edições anteriores ou do entorno são diferenciadas na legenda. As fachadas da Casa Tsuru e da Reurb foram identificadas pelos links do Google Maps e confirmadas pelo responsável.</p></section><section><h2>Sua localização</h2><p>É solicitada apenas ao tocar em “Minha localização” e fica na sessão. Você pode usar o guia sem autorizar. O fundo do mapa é carregado de um serviço externo; “Como chegar” abre o Google Maps.</p></section>
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
  useEffect(() => { const titles:Record<string,string>={inicio:'VivaSE Cultura',mapa:'Mapa | VivaSE Cultura',programacao:'Programação | VivaSE Cultura',roteiros:'Roteiros | VivaSE Cultura',memorias:'Memórias | VivaSE Cultura',historia:'Linha do tempo | VivaSE Cultura',artistas:'Artistas | VivaSE Cultura',sobre:'Sobre | VivaSE Cultura'};document.title = `${route.page==='mapa' && route.historicalMode?'Mapa histórico | VivaSE Cultura':titles[route.page]} — FASC 2026`; window.scrollTo(0, 0); }, [route.page,route.historicalMode]);
  return <TimeMachineProvider><div className={`app page-${route.page}`}><a href="#conteudo" className="skip-link" onClick={e => { e.preventDefault(); const main = document.getElementById('conteudo'); main?.setAttribute('tabindex', '-1'); main?.focus(); }}>Pular para o conteúdo</a>
    <header className="site-header"><Brand /><nav aria-label="Navegação principal">{[{ page: 'mapa', label: 'Mapa' }, { page: 'programacao', label: 'Programação' }, { page:'roteiros',label:'Cultura' }, { page: 'sobre', label: 'Sobre' }].map(item => <a key={item.page} href={`#/${item.page}?dia=${route.day}`} aria-current={route.page === item.page || (item.page==='roteiros' && culturePages.includes(route.page)) ? 'page' : undefined}>{item.label}</a>)}</nav><span className="edition-label"><img src={`${import.meta.env.BASE_URL}images/fasc-2026-logo.svg`} alt="FASC 2026" width="100" height="34" /></span></header>
    {route.page === 'inicio' ? <Home /> : route.page === 'mapa' && route.historicalMode ? <Suspense fallback={<main id="conteudo" className="content-page"><p role="status">Abrindo o acervo histórico…</p></main>}><HistoricalMap day={route.day}/></Suspense> : route.page === 'mapa' ? <Explore day={route.day} placeId={route.placeId} query={route.query} category={route.category} origin={route.origin} /> : route.page === 'programacao' ? <Schedule day={route.day} query={route.query} placeId={route.agendaPlace} category={route.category} nowOnly={route.nowOnly} /> : culturePages.includes(route.page) ? <Suspense fallback={<main id="conteudo" className="content-page" aria-busy="true"><p role="status">Abrindo os caminhos da cultura…</p></main>}><CultureView page={route.page as 'roteiros'|'memorias'|'historia'|'artistas'} day={route.day} routeId={route.culturalRoute} initialPlace={route.agendaPlace} /></Suspense> : <About />}
  </div></TimeMachineProvider>;
}
