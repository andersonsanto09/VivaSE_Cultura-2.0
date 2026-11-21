import {ArrowUpRight,MapPinned} from 'lucide-react';
import {festivalEditions,historicalArtists,historicalMilestones} from '../data/history';
import {historicalMapHref,historyParams,patchHistoryParams} from '../domain/history';
import SelectField from '../components/SelectField';
// A linha do tempo exibe apenas o recorte de 2005 a 2026. Os dados anteriores
// continuam no acervo (mapa histórico e artistas), mas ficam fora desta tela.
const FIRST_YEAR=2005;
const LAST_YEAR=2026;
const inTimeline=(year:number)=>year>=FIRST_YEAR && year<=LAST_YEAR;
const timelineMilestones=historicalMilestones.filter(m=>inTimeline(m.year));
const timelineEditions=festivalEditions.filter(e=>inTimeline(e.year));
export default function HistoryTimeline() {
  const params=historyParams();
  const filter=params.get('tipo') || 'todos';
  const requestedEdition=params.get('edicao') || '';
  const editionId=timelineEditions.some(e=>e.id===requestedEdition)?requestedEdition:'';
  const milestones=timelineMilestones.filter(m=>(filter==='todos' || m.kind===filter) && (!editionId || m.editionId===editionId));
  const origin=`/historia?${params}`;
  return <section className="history-section" aria-label="Marcos históricos"><div className="history-intro"><h2>Uma história feita de encontros.<br/>E de reencontros.</h2><p>Espaços que mudam de nome, cenas que se encontram e retornos que marcam a cidade. Explore {timelineMilestones.length} marcos documentados de {FIRST_YEAR} a {LAST_YEAR}, sem preencher os anos de interrupção.</p></div>
    <div className="history-explore-toolbar"><div className="history-filters" role="group" aria-label="Filtrar marcos">{[['todos','Todos os marcos'],['festival','Festival'],['cidade','Cidade']].map(([value,label])=><button key={value} aria-pressed={filter===value} onClick={()=>patchHistoryParams({tipo:value,edicao:''},true)}>{label}</button>)}</div><SelectField label="Edição da linha do tempo" value={editionId} onChange={value=>patchHistoryParams({edicao:value,tipo:'todos'},true)} options={[{value:'',label:'Toda a trajetória'},...timelineEditions.map(e=>({value:e.id,label:`${e.year}${e.number?` · ${e.number}ª edição`:''}`}))]}/></div>
    <a className="history-map-invite" href={historicalMapHref(editionId || '2025','','/historia?'+params)}><MapPinned size={23} aria-hidden="true"/><span><strong>O tempo também está no mapa.</strong>Viaje pelos espaços documentados de cada edição.</span><ArrowUpRight size={22} aria-hidden="true"/></a>
    <p className="history-result-count" role="status">{milestones.length} marcos neste recorte</p>
    <ol className="history-list expanded-history">{milestones.map(m=>{
      const edition=festivalEditions.find(e=>e.id===m.editionId);
      return <li key={m.id} id={`marco-${m.id}`}><span className="history-year">{m.year}{edition?.number && <small>{edition.number}ª edição</small>}</span><article><span className="history-kind">{m.kind==='cidade'?'Patrimônio da cidade':'História do festival'}{m.announced?' · edição anunciada':''}</span><h3>{m.title}</h3><p>{m.description}</p><details className="milestone-context"><summary>Por dentro desse encontro</summary><p>{m.detail}</p>{m.artistIds && <div className="milestone-artists" aria-label="Artistas relacionados">{m.artistIds.map(id=>{const a=historicalArtists.find(a=>a.id===id);return a?<a key={id} href={`#/artistas?${new URLSearchParams({artista:a.id,...(m.editionId?{edicao:m.editionId}:{}),origem:origin})}`}>{a.name} <ArrowUpRight size={13} aria-hidden="true"/></a>:null;})}</div>}</details>
        <div className="cultural-source">{m.source.url?<a href={m.source.url} target="_blank" rel="noreferrer">{m.source.title}<ArrowUpRight size={14} aria-hidden="true"/></a>:<span>{m.source.title}</span>}</div>
        {m.editionId?<a className="text-action" href={historicalMapHref(m.editionId,m.venueId,origin)}>Explorar esta edição no mapa <ArrowUpRight size={16} aria-hidden="true"/></a>:m.announced?<a className="text-action" href="#/mapa?dia=20">Mapa do festival · 2026 <ArrowUpRight size={16} aria-hidden="true"/></a>:m.placeId?<a className="text-action" href={`#/mapa?${new URLSearchParams({dia:'20',lugar:m.placeId,origem:origin})}`}>Conhecer a praça hoje <ArrowUpRight size={16} aria-hidden="true"/></a>:null}
      </article></li>;
    })}</ol>{!milestones.length && <p className="historical-empty">Não há marcos cadastrados com estes filtros. Escolha toda a trajetória para continuar.</p>}
  </section>;
}
