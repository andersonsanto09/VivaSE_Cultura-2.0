import type {Category,Place} from './catalog.ts';
import {normalize} from './catalog.ts';
export interface HistoricalSource {id:string;title:string;url:string;type:'coverage'|'announcement'|'institutional';publishedAt?:string;note?:string}
export interface FestivalEdition {id:string;year:number;number?:number;title:string;context:string;coverage:string;sourceIds:string[]}
export interface HistoricalVenue {
  id:string;editionId:string;physicalId?:string;name:string;address:string;category:Category;
  context:string;coordinates?:[number,number];precision:'verified'|'approximate'|'unavailable';
  locationNote:string;sourceIds:string[];coordinateSourceIds:string[];photoPlaceId?:string;
}
export interface Artist {id:string;name:string;category:Category;context:string;featured?:boolean}
export interface HistoricalPerformance {
  id:string;editionId:string;artistId:string;venueId?:string;date?:string;time?:string;title?:string;
  status:'performed'|'announced'|'invited'|'undated'|'pending'|'replaced';context:string;sourceIds:string[];uncertainty?:string;dateKind?:'civil'|'program';timeKind?:'announced'|'reported';category?:Category;provenanceIds?:string[];reviewedSourceIds?:string[];billingName?:string;venueText?:string;
}
export interface HistoricalMilestone {
  id:string;year:number;title:string;description:string;detail:string;kind:'festival'|'cidade';
  editionId?:string;venueId?:string;artistIds?:string[];placeId?:string;announced?:boolean;
  source:{title:string;url?:string;note?:string};
}
export function editionLabel(edition:FestivalEdition){return `${edition.year}${edition.number?` · ${edition.number}ª edição`:' · número não confirmado'}`;}
export function venueAsPlace(venue:HistoricalVenue):Place {
  return {id:venue.id,name:venue.name,address:venue.address,category:venue.category,description:venue.context,pages:[],coordinates:venue.coordinates,canNavigate:false,locationKind:venue.precision==='unavailable'?'pending':venue.precision==='verified'?'equipment':'square',coordinateNote:venue.locationNote};
}
export function nextEditionIndex(index:number,length:number){return Math.min(index+1,Math.max(0,length-1));}
export function filterHistoricalArtists(artists:Artist[],performances:HistoricalPerformance[],editions:FestivalEdition[],filters:{query:string;edition:string;category:string;order:string}) {
  const term=normalize(filters.query);
  return artists.filter(a=>normalize(a.name).includes(term) && performances.some(p=>p.artistId===a.id && (!filters.category || (p.category || a.category)===filters.category) && (!filters.edition || p.editionId===filters.edition))).sort((a,b)=>{
    const year=(id:string)=>{
      const years=performances.filter(p=>p.artistId===id && (!filters.edition || p.editionId===filters.edition)).map(p=>editions.find(e=>e.id===p.editionId)?.year || (filters.order==='recentes'?0:9999));
      return filters.order==='recentes'?Math.max(...years):Math.min(...years);
    };
    return filters.order==='nome'?a.name.localeCompare(b.name,'pt-BR'):(filters.order==='recentes'?year(b.id)-year(a.id):year(a.id)-year(b.id)) || a.name.localeCompare(b.name,'pt-BR');
  });
}
export function historicalMapHref(editionId:string,venueId='',origin='') {
  return `#/mapa?${new URLSearchParams({modo:'historico',edicao:editionId,...(venueId?{lugar:venueId}:{}),...(origin?{origem:origin}:{})})}`;
}
export function historyParams(){return new URLSearchParams(window.location.hash.split('?')[1] || '');}
export function patchHistoryParams(values:Record<string,string>,replace=false) {
  const [path]=window.location.hash.slice(1).split('?');const params=historyParams();
  for(const [name,value] of Object.entries(values)){if(value)params.set(name,value);else params.delete(name);}
  const hash=`#${path}?${params}`;
  if(replace){window.history.replaceState(null,'',hash);window.dispatchEvent(new HashChangeEvent('hashchange'));}else window.location.hash=hash;
}
export function safeHistoryOrigin(value:string){return /^\/(mapa|historia|artistas|programacao|cultura|roteiros|memorias)\?/.test(value)?value:'';}

export function performanceStatus(status:HistoricalPerformance["status"]){return {performed:"Participação documentada",announced:"Registro de programação",invited:"Convite registrado · presença não comprovada",undated:"Memória institucional · edição não identificada",pending:"Pesquisa recebida · conferência pendente",replaced:"Participação substituída"}[status];}

/** Group the date written in the source; each record retains its date kind. */
export function groupHistoricalAgenda(records:HistoricalPerformance[]) {
  const groups=new Map<string,{key:string;date?:string;records:HistoricalPerformance[]}>();
  for(const record of records){
    const key=record.date || 'unknown';
    if(!groups.has(key))groups.set(key,{key,date:record.date,records:[]});
    groups.get(key)!.records.push(record);
  }
  const minutes=(p:HistoricalPerformance)=>{
    const match=p.time?.match(/^(\d{1,2}):(\d{2})$/);
    if(!match)return Infinity;
    const hour=Number(match[1]);
    return (hour+(p.dateKind!=='civil'&&hour<6?24:0))*60+Number(match[2]);
  };
  return [...groups.values()].sort((a,b)=>(a.date || '9999').localeCompare(b.date || '9999')||a.key.localeCompare(b.key)).map(group=>({...group,records:[...group.records].sort((a,b)=>minutes(a)-minutes(b))}));
}
