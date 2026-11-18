import {createContext,useContext,useEffect,useRef,useState} from 'react';
import type {ReactNode} from 'react';
import {ArrowLeft,ArrowRight,Pause,Play,History} from 'lucide-react';
import festivalEditions from '../data/edition-index.json' with {type:'json'};

const TimeContext=createContext({playing:false,pause:()=>{},toggle:()=>{},choose:(_index:number)=>{},index:0});
export function TimeMachineProvider({children}:{children:ReactNode}){
  const [hash,setHash]=useState(window.location.hash);
  const [playing,setPlaying]=useState(false);
  const params=new URLSearchParams(hash.split('?')[1] || '');
  const active=hash.startsWith('#/mapa');
  const historical=params.get('modo')==='historico';
  const index=historical?Math.max(0,festivalEditions.findIndex(e=>e.id===(params.get('edicao') || festivalEditions[festivalEditions.length-1].id))):festivalEditions.length;
  useEffect(()=>{const update=()=>setHash(window.location.hash);window.addEventListener('hashchange',update);return()=>window.removeEventListener('hashchange',update);},[]);
  function navigate(i:number,replace=false){
    const current=new URLSearchParams(window.location.hash.split('?')[1] || '');
    const original=current.get('festival') || window.location.hash.slice(1);
    const fallback=`/mapa?dia=${current.get('dia') || '20'}`;
    const festival=original.startsWith('/mapa?') && !original.includes('modo=historico')?original:fallback;
    const next=i>=festivalEditions.length?`#${festival}`:`#/mapa?${new URLSearchParams({modo:'historico',edicao:festivalEditions[i].id,dia:current.get('dia') || '20',festival})}`;
    if(replace){window.history.replaceState(null,'',next);window.dispatchEvent(new HashChangeEvent('hashchange'));}else window.location.hash=next;
  }
  function choose(i:number){setPlaying(false);navigate(Math.max(0,Math.min(festivalEditions.length,i)));}
  function toggle(){if(playing){setPlaying(false);return;}if(index>=festivalEditions.length-1)navigate(0,true);setPlaying(true);}
  useEffect(()=>{
    if(!active){setPlaying(false);return;}
    if(!playing)return;
    if(index>=festivalEditions.length-1){setPlaying(false);return;}
    const timer=window.setTimeout(()=>navigate(index+1,true),4500);
    return()=>window.clearTimeout(timer);
  },[playing,index,active]);
  useEffect(()=>{
    const pause=()=>setPlaying(false),visibility=()=>{if(document.hidden)pause();};
    window.addEventListener('popstate',pause);window.addEventListener('pagehide',pause);document.addEventListener('visibilitychange',visibility);
    return()=>{window.removeEventListener('popstate',pause);window.removeEventListener('pagehide',pause);document.removeEventListener('visibilitychange',visibility);};
  },[]);
  return <TimeContext.Provider value={{playing,pause:()=>setPlaying(false),toggle,choose,index}}>{children}</TimeContext.Provider>;
}
export const useTimeMachine=()=>useContext(TimeContext);
export default function TimeMachine(){
  const {playing,toggle,choose,index}=useTimeMachine();
  const selected=useRef<HTMLButtonElement>(null);
  useEffect(()=>{const el=selected.current,parent=el?.parentElement;if(!el || !parent)return;const r=el.getBoundingClientRect(),p=parent.getBoundingClientRect();if(r.right>p.right)parent.scrollLeft+=r.right-p.right+10;else if(r.left<p.left)parent.scrollLeft+=r.left-p.left-10;},[index]);
  return <section className="time-machine" aria-label="Máquina do tempo" aria-describedby="time-machine-help"><p className="sr-only" id="time-machine-help">Selecione uma edição ou reproduza a sequência histórica, com avanço a cada 4,5 segundos. A programação atual de 2026 fica no último ponto.</p><div className="time-machine-label"><History size={18} aria-hidden="true"/><span>Máquina do tempo<strong aria-live="polite">{festivalEditions[index]?.year || '2026'}</strong><small className="time-scope">{index===festivalEditions.length?'Festival atual':'Acervo histórico'}</small></span></div><div className="time-machine-years" role="group" aria-label="Edições disponíveis">{[...festivalEditions.map(e=>({id:e.id,year:e.year})),{id:'2026',year:2026}].map((e,i)=><button key={e.id} ref={i===index?selected:undefined} aria-pressed={i===index} aria-label={i===festivalEditions.length?'2026 · programação atual':`Edição de ${e.year}`} onClick={()=>choose(i)}><span className="time-stop"/><span className="time-year">{e.year}</span></button>)}</div><div className="history-player"><button aria-label="Edição anterior" disabled={index===0} onClick={()=>choose(index-1)}><ArrowLeft size={17} aria-hidden="true"/></button><button className="history-play" aria-label={playing?'Pausar viagem':'Reproduzir viagem'} aria-pressed={playing} onClick={toggle}>{playing?<Pause size={17} aria-hidden="true"/>:<Play size={17} aria-hidden="true"/>}</button><button aria-label="Próxima edição" disabled={index===festivalEditions.length} onClick={()=>choose(index+1)}><ArrowRight size={17} aria-hidden="true"/></button></div></section>;
}
