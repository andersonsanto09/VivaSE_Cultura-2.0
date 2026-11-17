import TimeMachine,{useTimeMachine} from '../components/TimeMachine';
import {Suspense,lazy,useEffect,useMemo,useRef,useState} from 'react';
import {ArrowLeft,ArrowUpRight,MapPinned,List,BookOpen} from 'lucide-react';
import {festivalEditions,historicalVenues,historicalPerformances} from '../data/history';
import {editionLabel,historyParams,patchHistoryParams,safeHistoryOrigin,venueAsPlace} from '../domain/history';
import type {FestivalDay} from '../domain/catalog';
import HistoricalSources from '../components/HistoricalSources';
import HistoricalPerformance from '../components/HistoricalPerformance';
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
  const pinCount=venues.filter(v=>v.coordinates).length;
  const {pause,playing}=useTimeMachine();
  const [interaction,setInteraction]=useState('pointer');
  const [mobileView,setMobileView]=useState('mapa');
  useEffect(()=>{if(playing)setMobileView('mapa');},[playing]);
  const title=useRef<HTMLHeadingElement>(null);
  const panel=useRef<HTMLElement>(null);
  const venueHeading=useRef<HTMLHeadingElement>(null);
  useEffect(()=>{title.current?.focus({preventScroll:true});},[]);
  useEffect(()=>{if(selected)venueHeading.current?.focus({preventScroll:true});},[selected?.id]);
  function selectVenue(id:string){pause();patchHistoryParams({lugar:id});setMobileView('lista');panel.current?.scrollTo(0,0);}
  const ownOrigin=window.location.hash.slice(1);
  return <main id="conteudo" className="historical-map-page" data-input={interaction} onPointerDownCapture={()=>setInteraction('pointer')} onKeyDownCapture={()=>setInteraction('keyboard')}><header className="historical-map-heading"><div><p className="eyebrow">Acervo VivaSE · cobertura parcial</p><h1 ref={title} tabIndex={-1}>Viajar pelas edições.</h1></div><nav className="map-mode-switch" aria-label="Modo do mapa"><a href={currentHref}>Mapa do festival · 2026</a><a href={window.location.hash} aria-current="page">Mapa histórico</a></nav></header>
    {requested!==edition.id && <p className="notice" role="status">Edição não encontrada. Exibindo o primeiro registro do acervo.</p>}
    {origin && <a className="history-origin" href={`#${origin}`}><ArrowLeft size={16} aria-hidden="true"/>Voltar à exploração anterior</a>}
    <TimeMachine/>
    <div className="historical-mobile-switch" role="group" aria-label="Visualização histórica"><button aria-pressed={mobileView==='mapa'} onClick={()=>setMobileView('mapa')}><MapPinned size={16} aria-hidden="true"/>Mapa</button><button aria-pressed={mobileView==='lista'} onClick={()=>setMobileView('lista')}><List size={16} aria-hidden="true"/>Espaços e registros</button></div>
    <div className={`historical-workspace historical-view-${mobileView}`}><aside ref={panel} className="historical-panel" aria-label="Acervo da edição">
      <div className="edition-dossier"><span className="eyebrow">{editionLabel(edition)}</span><h2>{edition.title}</h2><p>{edition.context}</p><p className="coverage-label"><strong>Cobertura parcial</strong>{edition.coverage}</p><span className="edition-counts">{pinCount} {pinCount===1?'referência no mapa':'referências no mapa'} · {performances.length} registros de participação</span>
      <a className="text-action" href={`#/historia?edicao=${edition.id}`}>Contexto cultural desta edição <BookOpen size={16} aria-hidden="true"/></a><a className="text-action" href={`#/artistas?edicao=${edition.id}`}>Artistas desta edição <ArrowUpRight size={16} aria-hidden="true"/></a></div>
      {venueId && !selected && <p className="notice" role="status">Espaço não encontrado nesta edição. Escolha uma referência abaixo.</p>}
      {selected?<section className="historical-venue-detail" aria-labelledby="historical-venue-title"><button className="small-action" onClick={()=>{pause();patchHistoryParams({lugar:''});}}>← Todos os espaços da edição</button><p className="eyebrow">{editionLabel(edition)}</p><h2 ref={venueHeading} tabIndex={-1} id="historical-venue-title">{selected.name}</h2><p>{selected.address}</p><span className="historical-location-label">{selected.coordinates?'Referência aproximada':'Localização indisponível'}</span><p>{selected.locationNote}</p><p>{selected.context}</p>
        {selected.photoPlaceId && <PlacePhoto placeId={selected.photoPlaceId}/>}
        <h3>Participações neste espaço</h3>{performances.filter(p=>p.venueId===selected.id).length?performances.filter(p=>p.venueId===selected.id).map(p=><HistoricalPerformance key={p.id} performance={p} origin={ownOrigin}/>):<p className="historical-empty">Não foram encontrados registros detalhados de apresentações para este espaço neste recorte.</p>}
        <HistoricalSources ids={selected.sourceIds}/><details className="historical-proof"><summary>Referências geográficas</summary><ul>{selected.coordinateSourceIds.map((url,i)=><li key={url}><a href={url} target="_blank" rel="noreferrer">Fonte geográfica {i+1}</a></li>)}</ul></details>
      </section>:<><section className="historical-venue-list" aria-label="Espaços documentados"><h3>Espaços documentados</h3>{venues.length?venues.map(v=><button key={v.id} onClick={()=>selectVenue(v.id)}><span><strong>{v.name}</strong><small>{v.address}</small><small>{v.coordinates?'Referência aproximada':'Sem coordenadas · somente registro'}</small></span><ArrowUpRight size={17} aria-hidden="true"/></button>):<p className="historical-empty">Não foram encontrados locais com localização verificável para esta edição. Não há marcadores presumidos.</p>}</section>
        <details className="edition-records" open={venues.length===0}><summary>Participações da edição · {performances.length}</summary>{performances.length?performances.map(p=><HistoricalPerformance key={p.id} performance={p} origin={ownOrigin}/>):<p className="historical-empty">Não foram encontrados registros detalhados de apresentações para esta edição.</p>}</details><HistoricalSources ids={edition.sourceIds}/></>}
    </aside><div className="historical-cartography"><section className="historical-map-canvas" aria-label={`Mapa histórico do FASC ${edition.year}`}><MapBoundary><Suspense fallback={<div className="map-loading" role="status">Abrindo o mapa histórico…</div>}><MapView places={mapPlaces} selected={selectedPlace} onSelect={selectVenue} position={null} preserveCamera/></Suspense></MapBoundary>
      {!pinCount && <div className="historical-map-empty"><MapPinned size={26} aria-hidden="true"/><strong>{edition.year} · Sem locais georreferenciados</strong><p>Explore as fontes e os registros disponíveis na lista.</p><button onClick={()=>setMobileView('lista')}>Consultar registros</button></div>}
      <div className="historical-map-note">Referências geográficas atuais · não é cartografia antiga nem reconstrução da montagem.</div>
    </section></div></div>
  </main>;
}
