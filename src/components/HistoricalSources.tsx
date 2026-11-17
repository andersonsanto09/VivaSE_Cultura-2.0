import {ArrowUpRight} from 'lucide-react';
import {historicalSources} from '../data/history';
export default function HistoricalSources({ids}:{ids:string[]}) {
  return <ul className="historical-sources" aria-label="Fontes deste registro">{ids.map(id=>{const source=historicalSources.find(s=>s.id===id);return source?<li key={id}><a href={source.url} target="_blank" rel="noreferrer">{source.title}<ArrowUpRight size={13} aria-hidden="true"/></a>{source.note && <p>{source.note}</p>}</li>:null;})}</ul>;
}
