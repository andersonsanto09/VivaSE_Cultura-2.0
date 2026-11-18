import {lazy,Suspense,useEffect,useMemo, useRef, useState} from 'react';
import type {FormEvent} from 'react';
import {ArrowUpRight, BookOpen, MapPinned, MessageCircle, Trash2, Check, Plus, Users,Compass,Download,Pencil} from 'lucide-react';
import PlaceSymbol from '../components/PlaceSymbol';
import SelectField from '../components/SelectField';
import {categoryTone} from '../components/CategoryChips';
import {places} from '../data/festival';
import {culturalRoutes, publishedMemories, exampleMemory} from '../data/culture';
import type {CulturalSource} from '../data/culture';
import {MEMORY_KEY, MEMORY_TEXT_LIMIT, readMemories, saveMemory, deleteMemory,updateMemory} from '../domain/memories';
import type {MemoryResult, PersonalMemory} from '../domain/memories';
import type {FestivalDay, Place} from '../domain/catalog';

import MapBoundary from '../components/MapBoundary';
import useLocalCollection from '../components/useLocalCollection';
import {VISITS_KEY} from '../domain/collections';
import HistoryTimeline from './HistoryTimeline';
import HistoricalArtists from './HistoricalArtists';
const RouteMap=lazy(()=>import('./MapView'));
export type CulturePage='cultura'|'roteiros'|'memorias'|'historia'|'artistas';
const pages=[{id:'cultura',label:'Explorar',icon:Compass},{id:'roteiros',label:'Roteiros',icon:MapPinned},{id:'memorias',label:'Memórias',icon:MessageCircle},{id:'historia',label:'Linha do tempo',icon:BookOpen},{id:'artistas',label:'Artistas',icon:Users}] as const;
function SourceLink({source}:{source:CulturalSource}) {
  return <div className="cultural-source">{source.url ? <a href={source.url} target="_blank" rel="noreferrer">{source.title}<ArrowUpRight size={14} aria-hidden="true" /></a>:<span>{source.title}</span>}{source.note && <p>{source.note}</p>}</div>;
}
function mapLink(placeId:string,day:FestivalDay,origin:string) {
  return `#/mapa?${new URLSearchParams({dia:day,lugar:placeId,origem:origin})}`;
}
function walkingLink(place:Place) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${place.name}, ${place.address}, São Cristóvão, Sergipe, Brasil`)}&travelmode=walking`;
}
function Routes({day,routeId}:{day:FestivalDay;routeId:string}) {
  const selected=culturalRoutes.find(r=>r.id===routeId) || culturalRoutes[0];
  const visits=useLocalCollection(VISITS_KEY);
  const [started,setStarted]=useState(false);
  useEffect(()=>setStarted(false),[selected.id]);
  const routePlaces=useMemo(()=>selected.stops.map(s=>places.find(p=>p.id===s.placeId)!),[selected.id]);
  const done=selected.stops.filter(s=>visits.ids.includes(`${selected.id}:${s.placeId}`)).length;
  const next=routePlaces.find(p=>!visits.ids.includes(`${selected.id}:${p.id}`));
  const origin=`/roteiros?${new URLSearchParams({dia:day,roteiro:selected.id})}`;
  return <>
    <div className="route-picker" aria-label="Escolher roteiro">{culturalRoutes.map((route,index)=><a key={route.id} className={`route-choice tone-${route.tone}`} href={`#/roteiros?dia=${day}&roteiro=${route.id}`} aria-current={route.id===selected.id?'true':undefined}><span className="route-index">0{index+1}</span><strong>{route.title}</strong><span>{route.stops.length} paradas <ArrowUpRight size={18} aria-hidden="true" /></span></a>)}</div>
    <section className="route-detail" aria-labelledby="route-title"><div className="cultural-section-heading"><div><p className="eyebrow">Curadoria VivaSE · ordem sugerida</p><h2 id="route-title">{selected.title}</h2><p>{selected.subtitle}</p></div><span className="route-count">{selected.stops.length}<small>paradas</small></span></div>
      <p className="route-caution">Este roteiro organiza lugares, não um trajeto caminhável verificado. Consulte a programação e confirme acessos e bloqueios ao chegar. Duração e acessibilidade do percurso não foram verificadas.</p>
      <section className="route-progress" aria-label="Acompanhar meu roteiro"><div><h3>{done===selected.stops.length?'Roteiro concluído!':started || done?'Seu caminho pela cidade':'Pronto para descobrir a cidade?'}</h3><p>{done} de {selected.stops.length} paradas marcadas por você. Progresso salvo neste navegador.</p><progress value={done} max={selected.stops.length} aria-label="Paradas visitadas"/>{(started || done>0) && next && <p>Próxima parada sugerida: <strong>{next.name}</strong></p>}</div>{!started && done<selected.stops.length && <button className="button primary" onClick={()=>setStarted(true)}>Começar roteiro <ArrowUpRight size={17} aria-hidden="true"/></button>}</section>
      {visits.error && <p className="storage-error" role="alert">{visits.error}</p>}
      <div className="route-map" role="region" aria-label="Mapa das paradas do roteiro"><MapBoundary><Suspense fallback={<p role="status">Abrindo as paradas no mapa…</p>}><RouteMap places={routePlaces} selected={started?next:undefined} position={null} onSelect={id=>{window.location.hash=mapLink(id,day,origin).slice(1);}} preserveCamera/></Suspense></MapBoundary></div>
      <ol className="cultural-stops">{selected.stops.map((stop,index)=>{
        const place=places.find(p=>p.id===stop.placeId)!;
        return <li key={stop.placeId}><span className="stop-number">{index+1}</span><article><div className={`stop-title tone-${categoryTone(place.category)}`}><span className="place-symbol"><PlaceSymbol place={place} size={21} /></span><div><h3>{place.name}</h3><p>{place.address}</p></div></div><p>{stop.description}</p><div className="stop-actions"><a className="button primary" href={mapLink(place.id,day,origin)}>Ver espaço no mapa <ArrowUpRight size={17} aria-hidden="true" /></a>{place.canNavigate && <a className="text-action" href={walkingLink(place)} target="_blank" rel="noreferrer">Como chegar · Google Maps <ArrowUpRight size={16} aria-hidden="true" /></a>}</div><button className="visit-stop" disabled={!visits.available} aria-pressed={visits.ids.includes(`${selected.id}:${place.id}`)} onClick={()=>visits.toggle(`${selected.id}:${place.id}`)}><Check size={17} aria-hidden="true"/>{visits.ids.includes(`${selected.id}:${place.id}`)?'Visitado · desmarcar':'Marcar como visitado'}</button><SourceLink source={stop.source}/></article></li>;
      })}</ol>
    </section>
  </>;
}
function loadLocal():MemoryResult {
  try{return readMemories(window.localStorage);}catch{return {ok:false,message:'O armazenamento deste navegador não está disponível. Suas lembranças não foram alteradas.'};}
}
function Memories({day,initialPlace}:{day:FestivalDay;initialPlace:string}) {
  const [local,setLocal]=useState<MemoryResult>(loadLocal);
  const [text,setText]=useState('');
  const [author,setAuthor]=useState('');
  const [year,setYear]=useState(String(new Date().getFullYear()));
  const [placeId,setPlaceId]=useState(places.some(p=>p.id===initialPlace)?initialPlace:'');
  const [feedback,setFeedback]=useState('');
  const [error,setError]=useState('');
  const [pendingDelete,setPendingDelete]=useState('');
  const [editing,setEditing]=useState<PersonalMemory|null>(null);
  const [filterYear,setFilterYear]=useState('');const [filterPlace,setFilterPlace]=useState('');
  const textarea=useRef<HTMLTextAreaElement>(null);
  const visible=local.ok?local.memories.filter(m=>(!filterYear || String(m.year)===filterYear) && (!filterPlace || m.placeId===filterPlace)):[];
  function edit(memory:PersonalMemory){setEditing(memory);setText(memory.text);setAuthor(memory.author);setYear(String(memory.year));setPlaceId(memory.placeId);setError('');setFeedback('');window.requestAnimationFrame(()=>textarea.current?.focus());}
  function cancelEdit(){setEditing(null);setText('');setAuthor('');setYear(String(new Date().getFullYear()));setPlaceId('');setError('');}
  function exportMemories(){
    const result=loadLocal();setLocal(result);
    if(!result.ok){setError(result.message);return;}
    const safe=result.memories.map(({id,text,author,year,placeId,createdAt})=>({id,text,author,year,placeId,createdAt}));
    const url=URL.createObjectURL(new Blob([JSON.stringify({version:1,memories:safe},null,2)],{type:'application/json'}));
    const link=document.createElement('a');link.href=url;link.download='vivase-minhas-lembrancas.json';link.click();window.setTimeout(()=>URL.revokeObjectURL(url),1000);setFeedback('Cópia das suas lembranças exportada. Guarde este arquivo pessoal em um lugar seguro.');
  }
  useEffect(()=>{const sync=(event:StorageEvent)=>{if(event.key===MEMORY_KEY || event.key===null)setLocal(loadLocal());};window.addEventListener('storage',sync);return()=>window.removeEventListener('storage',sync);},[]);
  function submit(event:FormEvent) {
    event.preventDefault();setFeedback('');setError('');
    const memory:PersonalMemory={id:editing?.id || globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`,text:text.trim(),author:author.trim(),year:Number(year),placeId,createdAt:editing?.createdAt || new Date().toISOString()};
    let result:MemoryResult;
    try{result=editing?updateMemory(window.localStorage,memory):saveMemory(window.localStorage,memory);}catch{result={ok:false,message:'O armazenamento não está disponível. A lembrança não foi salva; seu texto continua no formulário.'};}
    if(!result.ok){setError(result.message);return;}
    setLocal(result);setText('');setEditing(null);setFeedback(editing?'Lembrança atualizada somente neste navegador.':'Lembrança salva somente neste navegador.');
  }
  function remove(id:string) {
    let result:MemoryResult;
    try{result=deleteMemory(window.localStorage,id);}catch{result={ok:false,message:'Não foi possível excluir a lembrança. Os dados não foram alterados.'};}
    if(!result.ok){setError(result.message);return;}
    setLocal(result);if(editing?.id===id)cancelEdit();setPendingDelete('');setError('');setFeedback('Lembrança excluída deste navegador.');
  }
  const origin=`/memorias?dia=${day}`;
  return <div className="memories-layout"><div className="memories-reader">
    <section aria-labelledby="published-title"><div className="cultural-section-heading"><div><p className="eyebrow">Vozes do festival</p><h2 id="published-title">Encontros que ficam.</h2><p>Pequenos trechos de relatos publicados, com autoria e contexto.</p></div></div>
      {publishedMemories.map(memory=><article className="memory-card is-published" key={memory.id}><span className="memory-origin"><BookOpen size={14} aria-hidden="true" />Relato publicado · FASC {memory.year}</span><blockquote>“{memory.quote}”</blockquote><p className="memory-author">{memory.author}</p><p className="memory-context">{memory.context}</p><SourceLink source={memory.source}/><a className="memory-place" href={mapLink(memory.placeId,day,origin)}>Ver referência do lugar <ArrowUpRight size={15} aria-hidden="true" /></a></article>)}
      <article className="memory-card is-example"><span className="memory-origin">Exemplo fictício · demonstração</span><blockquote>“{exampleMemory.text}”</blockquote><p className="memory-author">{exampleMemory.author}</p><p className="memory-context">Texto criado para ilustrar a experiência. Não é um depoimento real nem um registro do festival de 2026.</p></article>
    </section>
    <section className="local-memories" aria-labelledby="local-title"><div className="cultural-section-heading"><div><p className="eyebrow">Seu arquivo pessoal</p><h2 id="local-title">Minhas lembranças</h2></div></div>
      {local.ok && !!local.memories.length && <><div className="memory-filters"><SelectField label="Ano das minhas lembranças" value={filterYear} onChange={setFilterYear} options={[{value:'',label:'Todos os anos'},...[...new Set(local.memories.map(m=>m.year))].sort((a,b)=>b-a).map(y=>({value:String(y),label:String(y)}))]}/><SelectField label="Lugar das minhas lembranças" value={filterPlace} onChange={setFilterPlace} options={[{value:'',label:'Todos os lugares'},...places.filter(p=>local.memories.some(m=>m.placeId===p.id)).map(p=>({value:p.id,label:p.name}))]}/></div><button className="text-action memory-export" onClick={exportMemories}><Download size={17} aria-hidden="true"/>Exportar minhas lembranças (JSON)</button></>}
      {!local.ok ? <div className="storage-error" role="alert"><p>{local.message}</p><button className="button" onClick={()=>setLocal(loadLocal())}>Tentar ler novamente</button></div>:local.memories.length===0?<p className="local-empty">Você ainda não guardou uma lembrança neste navegador. Escreva a sua ao lado.</p>:!visible.length?<p className="local-empty">Nenhuma lembrança neste filtro. Escolha outro ano ou lugar.</p>:visible.map(memory=><article className="memory-card is-personal" key={memory.id}><span className="memory-origin">Pessoal · somente neste navegador · {memory.year}</span><blockquote>{memory.text}</blockquote><p className="memory-author">{memory.author || 'Minha lembrança'}</p><p className="memory-context">{places.find(p=>p.id===memory.placeId)?.name || (memory.placeId?'Espaço não identificado':'Sem espaço associado')} · salva em {new Date(memory.createdAt).toLocaleDateString('pt-BR')}</p>{places.some(p=>p.id===memory.placeId) && <a className="memory-place" href={mapLink(memory.placeId,day,origin)}>Ver espaço <ArrowUpRight size={15} aria-hidden="true" /></a>}<button className="edit-memory" onClick={()=>edit(memory)} aria-label={`Editar lembrança de ${memory.author || 'Minha lembrança'}`}><Pencil size={16} aria-hidden="true"/>Editar</button>{pendingDelete===memory.id?<div className="delete-confirm"><p>Excluir esta lembrança deste navegador?</p><button className="button" onClick={()=>remove(memory.id)}>Confirmar exclusão</button><button className="small-action" onClick={()=>setPendingDelete('')}>Cancelar</button></div>:<button className="delete-memory" aria-label={`Excluir lembrança de ${memory.author || 'Minha lembrança'}`} onClick={()=>setPendingDelete(memory.id)}><Trash2 size={16} aria-hidden="true" />Excluir</button>}</article>)}
    </section>
  </div><aside className="memory-writing" aria-labelledby="write-title"><span className="writing-mark" aria-hidden="true"><Plus size={27}/></span><p className="eyebrow">Você também faz parte</p><h2 id="write-title">{editing?'Edite seu encontro.':'Guarde esse encontro.'}</h2><p id="memory-privacy">A lembrança fica apenas neste navegador e neste endereço do site. Não é publicada nem sincronizada com outros aparelhos. Apagar os dados do navegador pode removê-la.</p>
    <form onSubmit={submit} aria-describedby="memory-privacy"><label className="form-field">Seu nome ou apelido <span>(opcional)</span><input value={author} onChange={e=>setAuthor(e.target.value)} maxLength={60} autoComplete="off" /></label><label className="form-field">Ano da lembrança<input type="number" min={1972} max={new Date().getFullYear()} required value={year} onChange={e=>setYear(e.target.value)} /></label><SelectField label="Espaço da lembrança (opcional)" value={placeId} onChange={setPlaceId} options={[{value:'',label:'Sem espaço associado'},...places.map(p=>({value:p.id,label:p.name}))]} />
      <label className="form-field">Sua lembrança<textarea ref={textarea} rows={6} required maxLength={MEMORY_TEXT_LIMIT} value={text} onChange={e=>setText(e.target.value)} aria-describedby="memory-limit" placeholder="O que esse encontro deixou em você?" /></label><p id="memory-limit" className="character-count">{text.length}/{MEMORY_TEXT_LIMIT} caracteres</p>
      <button className="button primary" type="submit">{editing?'Salvar alterações':'Salvar no meu aparelho'} <Check size={18} aria-hidden="true" /></button>
      {editing && <button type="button" className="button" onClick={cancelEdit}>Cancelar edição</button>}<p className="save-feedback" role="status">{feedback}</p>{error && <p className="storage-error" role="alert">{error}</p>}
    </form>
  </aside></div>;
}
export default function CultureView({page,day,routeId,initialPlace}:{page:CulturePage;day:FestivalDay;routeId:string;initialPlace:string}) {
  const heading=useRef<HTMLHeadingElement>(null);
  const tabs=useRef<HTMLElement>(null);
  useEffect(()=>{heading.current?.focus({preventScroll:true});const active=tabs.current?.querySelector<HTMLElement>('[aria-current]');if(active && tabs.current)tabs.current.scrollLeft=active.offsetLeft-tabs.current.offsetLeft;},[page]);
  const title=page==='cultura'?'A cidade guarda encontros.':page==='roteiros'?'A cultura pelo caminho.':page==='memorias'?'O festival também é memória.':page==='artistas'?'Quem já passou por aqui.':'O tempo deixa encontros.';
  return <main id="conteudo" className={`culture-page culture-${page}`}><header className="culture-heading"><p className="eyebrow">VivaSE Cultura · São Cristóvão</p><h1 ref={heading} tabIndex={-1}>{title}</h1><p>{page==='cultura'?'Descubra São Cristóvão, explore a história do festival e guarde o que ficou.':page==='roteiros'?'Escolha um roteiro e descubra o que existe entre uma atração e outra.':page==='memorias'?'Leia histórias do festival e guarde as suas no próprio aparelho.':page==='artistas'?'Nomes, encontros e fontes para explorar a trajetória do FASC.':'Conheça marcos documentados do FASC e da cidade que o recebe.'}</p></header><nav ref={tabs} className="culture-tabs" aria-label="Explorar a cultura">{pages.map(({id,label,icon:Symbol})=><a key={id} href={`#/${id}?dia=${day}`} aria-current={page===id?'page':undefined}><Symbol size={18} aria-hidden="true"/>{label}</a>)}</nav><div className="culture-body">{page==='cultura'?<CultureHub day={day}/>:page==='roteiros'?<Routes day={day} routeId={routeId}/>:page==='memorias'?<Memories day={day} initialPlace={initialPlace}/>:page==='artistas'?<HistoricalArtists/>:<HistoryTimeline/>}</div></main>;
}

function CultureHub({day}:{day:FestivalDay}){
  const paths=[{id:'roteiros',label:'Descobrir a cidade',title:'Entre um palco e outro.',description:'Três roteiros para conhecer o patrimônio, as artes e a música de São Cristóvão.',icon:MapPinned,tone:'music'}, {id:'historia',label:'Explorar a história',title:'O tempo também é palco.',description:'Percorra as edições do FASC e encontre artistas que fazem parte dessa história.',icon:BookOpen,tone:'culture'},{id:'memorias',label:'Guardar uma lembrança',title:'Esse encontro fica.',description:'Leia relatos publicados e escreva sua memória no próprio aparelho.',icon:MessageCircle,tone:'experiences'}];
  return <section className="culture-hub" aria-label="Caminhos pela cultura">{paths.map(({id,label,title,description,icon:Symbol,tone},i)=><a href={`#/${id}?dia=${day}`} key={id} className={`culture-path tone-${tone}`}><span className="culture-path-index">0{i+1}<Symbol size={34} aria-hidden="true"/></span><span className="eyebrow">{label}</span><h2>{title}</h2><p>{description}</p><span className="culture-path-action">Explorar <ArrowUpRight size={20} aria-hidden="true"/></span></a>)}<a className="culture-hub-artists text-action" href={`#/artistas?dia=${day}`}>Quem já passou por aqui · conheça os grandes nomes do FASC <ArrowUpRight size={18} aria-hidden="true"/></a></section>;
}
