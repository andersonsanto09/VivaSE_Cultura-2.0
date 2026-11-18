import {useEffect,useRef,useState} from 'react';
import {ArrowUpRight,Bookmark,Share2,X} from 'lucide-react';
import type {Activity} from '../domain/catalog';
import {places} from '../data/festival';
import {activityArtists} from '../data/activity-artists';
import {ActivityTime} from './ProgramUI';
import {activityHref} from '../domain/planner';
import {safeHistoryOrigin} from '../domain/history';

export default function ActivityDialog({activity:a,saved,onToggle,onDismiss,canSave=true,feedback='' }:{activity:Activity;saved:boolean;onToggle:()=>void;onDismiss:()=>void;canSave?:boolean;feedback?:string}){
  const dialog=useRef<HTMLDialogElement>(null);const [shareStatus,setShareStatus]=useState('');
  const place=places.find(p=>p.id===a.placeId)!;const artists=activityArtists.filter(x=>x.activityIds.includes(a.id));
  const params=new URLSearchParams(window.location.hash.split('?')[1] || '');const origin=safeHistoryOrigin(params.get('origem') || '');
  const shareURL=new URL(window.location.href.split('#')[0].split('?')[0]);shareURL.hash=activityHref(a).slice(1);
  useEffect(()=>{const previous=document.activeElement as HTMLElement|null;dialog.current?.showModal();return()=>{dialog.current?.close();if(previous?.isConnected)previous.focus({preventScroll:true});};},[]);
  async function share(){try{if(navigator.share){await navigator.share({title:`${a.title} · VivaSE`,text:`FASC 2026 · ${a.day}/11 · ${a.time}`,url:shareURL.href});setShareStatus('Compartilhamento concluído.');}else{await navigator.clipboard.writeText(shareURL.href);setShareStatus('Link da atividade copiado.');}}catch(error){setShareStatus(error instanceof DOMException && error.name==='AbortError'?'Compartilhamento cancelado.':'Copie o link abaixo para compartilhar a atividade.');}}
  return <dialog ref={dialog} className="activity-dialog" aria-labelledby="activity-title" onCancel={e=>{e.preventDefault();onDismiss();}} onClick={e=>{if(e.target===e.currentTarget)onDismiss();}}><div className="activity-dialog-content"><button className="dialog-close" onClick={onDismiss} aria-label="Fechar atividade"><X size={21}/></button><p className="eyebrow">FASC 2026 · programação anunciada · {a.day}/11</p><h2 id="activity-title">{a.title}</h2><ActivityTime activity={a}/><p className="dialog-place">{place.name}<span>{place.address}</span></p>{a.details && <section><h3>Sobre esta atividade</h3><p>{a.details}</p></section>}
    <div className="dialog-actions"><button className="button primary" disabled={!canSave} aria-pressed={saved} onClick={onToggle}><Bookmark size={17} aria-hidden="true"/>{saved?'Remover da minha programação':'Salvar na minha programação'}</button><button className="button" onClick={share}><Share2 size={17} aria-hidden="true"/>Compartilhar atividade</button><a className="text-action" href={`#/mapa?${new URLSearchParams({dia:a.day,lugar:a.placeId,origem:window.location.hash.slice(1)})}`}>Ver palco ou espaço <ArrowUpRight size={17} aria-hidden="true"/></a></div>
    <p role="status">{feedback}</p><p role="status">{shareStatus}</p>{shareStatus.startsWith('Copie') && <label className="form-field">Link da atividade<input value={shareURL.href} readOnly onFocus={e=>e.target.select()}/></label>}
    {!!artists.length && <section className="activity-history-links"><h3>Conheça essa trajetória no FASC</h3>{artists.map(artist=><a key={artist.artistId} href={`#/artistas?${new URLSearchParams({artista:artist.artistId,origem:window.location.hash.slice(1)})}`}>{artist.name}<ArrowUpRight size={17} aria-hidden="true"/></a>)}</section>}
    <p className="helper">Programação sujeita a alterações. Horário final só é informado quando consta na fonte. Favoritos ficam apenas neste navegador.</p>{origin && <a className="text-action" href={`#${origin}`}>Voltar à exploração anterior <ArrowUpRight size={16}/></a>}
  </div></dialog>;
}
