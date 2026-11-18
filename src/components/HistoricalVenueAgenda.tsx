import {ArrowUpRight} from 'lucide-react';
import {useState} from 'react';
import {historicalArtists} from '../data/history';
import {groupHistoricalAgenda,performanceStatus} from '../domain/history';
import type {HistoricalPerformance} from '../domain/history';
import HistoricalSources from './HistoricalSources';

export default function HistoricalVenueAgenda({records,origin}:{records:HistoricalPerformance[];origin:string}) {
  const [date,setDate]=useState('');
  const groups=groupHistoricalAgenda(records);
  if(!records.length)return <div className="historical-empty"><strong>A programação deste espaço ainda não está no acervo.</strong><p>O local é documentado, mas os registros disponíveis não identificam suas apresentações. Explore outro espaço ou consulte as informações do local.</p></div>;
  return <div className="historical-agenda">{groups.length>1&&<div className="historical-agenda-filter" role="group" aria-label="Filtrar programação por data"><button aria-pressed={!date} onClick={()=>setDate('')}>Todas</button>{groups.map(group=><button key={group.key} aria-pressed={date===group.key} onClick={()=>setDate(group.key)}>{group.date?group.date.split('-').reverse().slice(0,2).join('/'):'Sem data'}</button>)}</div>}{groups.filter(group=>!date||group.key===date).map(group=><section className="historical-agenda-day" key={group.key} aria-label={group.date?`Programação de ${group.date.split('-').reverse().join('/')}`:'Registros sem data'}>
    <h3>{group.date?<><span>{group.date.split('-').reverse().slice(0,2).join('/')}</span><small>{group.date.slice(0,4)} · registros disponíveis</small></>:<span>Data não registrada</span>}</h3>
    <ol>{group.records.map(record=>{
      const artist=historicalArtists.find(a=>a.id===record.artistId)!;
      return <li className="historical-agenda-row" key={record.id}><div className="historical-agenda-time">{record.time?<><time>{record.time.replace(':','h')}</time>{(record.timeKind==='announced'||record.status==='announced')&&<small>Anunciado</small>}</>:<span>Sem horário<br/>registrado</span>}{record.date&&<small>{record.dateKind==='civil'?'Data civil':'Dia do festival'}</small>}</div><div className="historical-agenda-event">
        <h4><a href={`#/artistas?${new URLSearchParams({artista:artist.id,edicao:record.editionId,origem:origin})}`}>{artist.name}<ArrowUpRight size={15} aria-hidden="true"/></a></h4>
        {record.title&&<p className="historical-agenda-title">{record.title}</p>}
        <span className={`evidence-label ${record.status}`}>{performanceStatus(record.status)}</span>
        <details className="historical-proof"><summary>Detalhes e fontes<span className="sr-only"> de {artist.name}</span></summary><p>{record.context}</p>{record.billingName&&record.billingName!==artist.name&&<p>Crédito na fonte: {record.billingName}</p>}{record.status==='announced'&&<p>A fonte disponível é de programação; a cobertura da realização ainda não foi incorporada.</p>}{record.uncertainty&&<p className="record-uncertainty">{record.uncertainty}</p>}<HistoricalSources ids={record.sourceIds}/></details>
      </div></li>;
    })}</ol>
  </section>)}</div>;
}
