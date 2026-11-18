import TimeMachine,{useTimeMachine} from '../components/TimeMachine';
import {Suspense,lazy,useEffect,useMemo,useRef,useState} from 'react';
import {ArrowLeft,ArrowUpRight,MapPinned,List,BookOpen,X,CalendarDays} from 'lucide-react';
import {festivalEditions,historicalVenues,historicalPerformances,historicalArtists} from '../data/history';
import {editionLabel,groupHistoricalAgenda,historyParams,patchHistoryParams,safeHistoryOrigin,venueAsPlace} from '../domain/history';
import type {FestivalDay} from '../domain/catalog';
import HistoricalSources from '../components/HistoricalSources';
import HistoricalPerformance from '../components/HistoricalPerformance';
import HistoricalVenueAgenda from '../components/HistoricalVenueAgenda';
import {categoryTone} from '../components/CategoryChips';
import PlacePhoto from '../components/PlacePhoto';
import MapBoundary from '../components/MapBoundary';
const MapView=lazy(()=>import('./MapView'));
export const HISTORY_INTERVAL_MS=4500;
export default function HistoricalMap({day}:{day:FestivalDay}) {
  const params=historyParams();
  const requested=params.get('edicao') || festivalEditions[festivalEditions.length-1].id;
  const index=Math.max(0,festivalEditions.findIndex(e=>e.id===requested));
  const edition=festivalEditions[index];
  const venueId=params.get('lugar') || '';
  const origin=safeHistoryOrigin(params.get('origem') || '');
  const festivalReturn=params.get('festival') || '';
  const currentHref=festivalReturn.startsWith('/mapa?') && !festivalReturn.includes('modo=historico')?`#${festivalReturn}`:`#/mapa?dia=${day}`;
  const venues=useMemo(()=>historicalVenues.filter(v=>v.editionId===edition.id),[edition.id]);
  const mapPlaces=useMemo(()=>venues.map(venueAsPlace),[venues]);
  const selected=venues.find(v=>v.id===venueId);
  const selectedPlace=mapPlaces.find(p=>p.id===selected?.id);
  const performances=historicalPerformances.filter(p=>p.editionId===edition.id);
  const selectedRecords=performances.filter(p=>p.venueId===selected?.id);
  const previewRecords=groupHistoricalAgenda(selectedRecords).flatMap(group=>group.records).slice(0,2);
  const pinCount=venues.filter(v=>v.coordinates).length;
  const {pause,playing}=useTimeMachine();
  const [interaction,setInteraction]=useState('pointer');
  const [mobileView,setMobileView]=useState(venueId?'lista':'mapa');
  const [detailOpen,setDetailOpen]=useState(Boolean(venueId));
  const [detailTab,setDetailTab]=useState<'agenda'|'about'>('agenda');
  useEffect(()=>{if(playing)setMobileView('mapa');},[playing]);
  const title=useRef<HTMLHeadingElement>(null);
  const panel=useRef<HTMLElement>(null);
  const venueHeading=useRef<HTMLHeadingElement>(null);
  const selectionIntent=useRef('');
  useEffect(()=>{title.current?.focus({preventScroll:true});},[]);
  useEffect(()=>{if(selected&&detailOpen)venueHeading.current?.focus({preventScroll:true});},[selected?.id,detailOpen]);
  useEffect(()=>{setDetailTab('agenda');panel.current?.scrollTo(0,0);},[edition.id,selected?.id]);
  useEffect(()=>{
    if(!selected){selectionIntent.current='';setDetailOpen(false);return;}
    if(selectionIntent.current===selected.id){selectionIntent.current='';return;}
    // A shared URL or browser history should reveal its selected space directly.
    setDetailOpen(true);setMobileView('lista');
  },[selected?.id]);
  function selectVenue(id:string,showDetails=true){pause();selectionIntent.current=id;const open=showDetails||window.matchMedia('(max-width:800px)').matches;setDetailOpen(open);setDetailTab('agenda');patchHistoryParams({lugar:id});if(open)setMobileView('lista');panel.current?.scrollTo(0,0);}
  function openDetails(tab:'agenda'|'about'){setDetailTab(tab);setDetailOpen(true);setMobileView('lista');panel.current?.scrollTo(0,0);}
  function clearVenue(){pause();patchHistoryParams({lugar:''});setDetailOpen(false);panel.current?.scrollTo(0,0);}
  const ownOrigin=window.location.hash.slice(1);
  return <main id="conteudo" className="historical-map-page" data-input={interaction} onPointerDownCapture={()=>setInteraction('pointer')} onKeyDownCapture={()=>setInteraction('keyboard')}><header className="historical-map-heading"><div><p className="eyebrow">Acervo VivaSE · cobertura parcial</p><h1 ref={title} tabIndex={-1}>Viajar pelas edições.</h1></div><nav className="map-mode-switch" aria-label="Modo do mapa"><a href={currentHref}>Mapa do festival · 2026</a><a href={window.location.hash} aria-current="page">Mapa histórico</a></nav></header>
    {requested!==edition.id && <p className="notice" role="status">Edição não encontrada. Exibindo o primeiro registro do acervo.</p>}
    {origin && <a className="history-origin" href={`#${origin}`}><ArrowLeft size={16} aria-hidden="true"/>Voltar à exploração anterior</a>}
    <TimeMachine/>
    <div className="historical-mobile-switch" role="group" aria-label="Visualização histórica"><button aria-pressed={mobileView==='mapa'} onClick={()=>setMobileView('mapa')}><MapPinned size={16} aria-hidden="true"/>Mapa</button><button aria-pressed={mobileView==='lista'} onClick={()=>{setMobileView('lista');if(selected)setDetailOpen(true);}}><List size={16} aria-hidden="true"/>{selected?'Programação e detalhes':'Espaços e programação'}</button></div>
    <div className={`historical-workspace historical-view-${mobileView}`}><aside ref={panel} className="historical-panel" aria-label="Acervo da edição">
      {venueId && !selected && <p className="notice" role="status">Espaço não encontrado nesta edição. Escolha uma referência abaixo.</p>}
      {selected&&detailOpen?<section className="historical-venue-detail" aria-labelledby="historical-venue-title"><button className="small-action historical-back" onClick={clearVenue}><ArrowLeft size={15} aria-hidden="true"/>Todos os espaços de {edition.year}</button><span className="eyebrow">{selected.category} · FASC {edition.year}</span><h2 ref={venueHeading} tabIndex={-1} id="historical-venue-title">{selected.name}</h2><p>{selected.address}</p>
        <div className="historical-detail-switch" role="group" aria-label="Informações do espaço"><button aria-pressed={detailTab==='agenda'} aria-controls="historical-detail-content" onClick={()=>setDetailTab('agenda')}><CalendarDays size={16} aria-hidden="true"/>Programação<span>{selectedRecords.length}</span></button><button aria-pressed={detailTab==='about'} aria-controls="historical-detail-content" onClick={()=>setDetailTab('about')}>Sobre o espaço</button></div>
        <div id="historical-detail-content">{detailTab==='agenda'?<><p className="historical-agenda-note">Programação de {edition.year} · acervo parcial. Datas e horários aparecem quando identificados nas fontes.</p><HistoricalVenueAgenda key={selected.id} records={selectedRecords} origin={ownOrigin}/></>:<div className="historical-venue-about">{selected.photoPlaceId&&<PlacePhoto placeId={selected.photoPlaceId}/>}<span className="historical-location-label">{selected.coordinates?'Referência aproximada':'Localização indisponível'}</span><p>{selected.locationNote}</p><p>{selected.context}</p><details className="historical-proof"><summary>Fontes sobre este espaço</summary><HistoricalSources ids={selected.sourceIds}/></details><details className="historical-proof"><summary>Referências geográficas</summary><ul>{selected.coordinateSourceIds.map((url,i)=><li key={url}><a href={url} target="_blank" rel="noreferrer">Fonte geográfica {i+1}</a></li>)}</ul></details></div>}</div>
      </section>:<><div className="historical-edition-overview"><span className="eyebrow">{editionLabel(edition)}</span><h2>Espaços de {edition.year}.</h2><p>Escolha um espaço na lista ou no mapa para ver a programação.</p><span className="edition-counts">{venues.length} espaços · {performances.length} registros · acervo parcial</span><details className="edition-dossier historical-proof"><summary>Sobre esta edição</summary><h3>{edition.title}</h3><p>{edition.context}</p><p className="coverage-label"><strong>Cobertura parcial</strong>{edition.coverage}</p><span className="edition-counts">{pinCount} referências no mapa</span><a className="text-action" href={`#/historia?edicao=${edition.id}`}>Contexto cultural <BookOpen size={16} aria-hidden="true"/></a><a className="text-action" href={`#/artistas?edicao=${edition.id}`}>Artistas desta edição <ArrowUpRight size={16} aria-hidden="true"/></a><HistoricalSources ids={edition.sourceIds}/></details></div><section className="historical-venue-list" aria-label="Espaços documentados"><h3>Escolha um espaço</h3>{venues.length?venues.map(v=><button key={v.id} aria-pressed={selected?.id===v.id} onClick={()=>selectVenue(v.id)}><span><strong>{v.name}</strong><small>{v.address}</small><small>{performances.filter(p=>p.venueId===v.id).length} registros de programação{!v.coordinates?' · sem localização verificada':''}</small></span><ArrowUpRight size={17} aria-hidden="true"/></button>):<p className="historical-empty">Não foram encontrados locais com localização verificável para esta edição. Não há marcadores presumidos.</p>}</section>
        <details className="edition-records" open={venues.length===0}><summary>Todos os registros de {edition.year} · {performances.length}</summary>{performances.length?performances.map(p=><HistoricalPerformance key={p.id} performance={p} origin={ownOrigin}/>):<p className="historical-empty">Não foram encontrados registros detalhados de apresentações para esta edição.</p>}</details></>}
    </aside><div className="historical-cartography"><section className="historical-map-canvas" aria-label={`Mapa histórico do FASC ${edition.year}`}><MapBoundary><Suspense fallback={<div className="map-loading" role="status">Abrindo o mapa histórico…</div>}><MapView places={mapPlaces} selected={selectedPlace} onSelect={id=>selectVenue(id,false)} position={null} preserveCamera/></Suspense></MapBoundary>
      {selected&&!detailOpen&&<article className={`map-selection historical-selection tone-${categoryTone(selected.category)}`} aria-label="Resumo do espaço histórico selecionado"><button className="historical-preview-close" aria-label="Fechar resumo do espaço" onClick={clearVenue}><X size={17} aria-hidden="true"/></button>{selected.photoPlaceId&&<PlacePhoto placeId={selected.photoPlaceId} compact/>}<span className="eyebrow">{selected.category} · FASC {edition.year}</span><h2>{selected.name}</h2><p>{selected.address}</p><div className="selection-agenda">{previewRecords.length?previewRecords.map(p=><p key={p.id}>{p.date&&<span>{p.date.split('-').reverse().slice(0,2).join('/')} · </span>}{p.time&&<strong>{p.time.replace(':','h')} </strong>}{historicalArtists.find(a=>a.id===p.artistId)?.name}</p>):<p>Programação ainda não cadastrada neste espaço.</p>}</div>{selectedRecords.length>2&&<p className="historical-preview-count">+ {selectedRecords.length-2} registros neste espaço</p>}<div className="historical-preview-actions"><button className="button" onClick={()=>openDetails('agenda')}>Ver programação <ArrowUpRight size={16} aria-hidden="true"/></button><button className="text-action" onClick={()=>openDetails('about')}>Ver detalhes <ArrowUpRight size={15} aria-hidden="true"/></button></div></article>}
      {!pinCount && <div className="historical-map-empty"><MapPinned size={26} aria-hidden="true"/><strong>{edition.year} · Sem locais georreferenciados</strong><p>Explore as fontes e os registros disponíveis na lista.</p><button onClick={()=>setMobileView('lista')}>Consultar registros</button></div>}
      <div className="historical-map-note">Referências geográficas atuais · não é cartografia antiga nem reconstrução da montagem.</div>
    </section></div></div>
  </main>;
}
