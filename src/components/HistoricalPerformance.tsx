import {ArrowUpRight} from 'lucide-react';
import {festivalEditions,historicalArtists,historicalVenues} from '../data/history';
import {historicalMapHref,editionLabel,performanceStatus} from '../domain/history';
import type {HistoricalPerformance as Performance} from '../domain/history';
import HistoricalSources from './HistoricalSources';
export default function HistoricalPerformance({performance:p,origin,showArtist=true}:{performance:Performance;origin:string;showArtist?:boolean}) {
  const artist=historicalArtists.find(a=>a.id===p.artistId)!;
  const venue=historicalVenues.find(v=>v.id===p.venueId);
  const edition=festivalEditions.find(e=>e.id===p.editionId)!;
  const date=p.date?.split('-').reverse().join('/');
  return <article className="historical-performance"><span className={`evidence-label ${p.status}`}>{performanceStatus(p.status)}</span>
    {showArtist && <h3><a href={`#/artistas?${new URLSearchParams({artista:artist.id,edicao:p.editionId,origem:origin})}`}>{artist.name}<ArrowUpRight size={17} aria-hidden="true"/></a></h3>}
    {showArtist && <p className="performance-edition">{edition?editionLabel(edition):'Edição ainda não identificada'}</p>}<p className="performance-place"><strong>{venue?.name || p.venueText || 'Palco não confirmado'}</strong></p>
    {(showArtist || p.date || p.time) && <p className="performance-date">{date?`${p.dateKind==='civil'?'Data civil':'Dia de programação'}: ${date}`:'Data não confirmada'} · {p.time?`${p.time.replace(':','h')} ${p.timeKind==='announced' || p.status==='announced'?'(anunciado)':''}`:'Horário não confirmado'}</p>}
    {p.category && <p className="performance-discipline">{p.category}</p>}{p.billingName && p.billingName!==artist.name && <p>Crédito na fonte: {p.billingName}</p>}
    {p.title && <p className="performance-title">{p.title}</p>}{showArtist && !['programado','participação documentada','apresentação realizada'].includes(p.context) && <p>{p.context}</p>}{showArtist && p.uncertainty && <p className="record-uncertainty">{p.uncertainty}</p>}
    {venue?.coordinates?<a className="text-action" href={historicalMapHref(p.editionId,venue.id,origin)}>Ver no mapa <ArrowUpRight size={16} aria-hidden="true"/></a>:<p className="record-location-absent">{venue?'Local sem coordenadas verificadas.':p.venueText?'Local citado ainda sem correspondência geográfica validada.':'Sem palco identificado para localizar esta participação.'}</p>}
    <details className="historical-proof"><summary>Fontes e contexto do registro</summary>{!showArtist && <><p>{p.context}</p>{p.uncertainty && <p className="record-uncertainty">{p.uncertainty}</p>}</>}<HistoricalSources ids={p.sourceIds}/></details>
  </article>;
}
