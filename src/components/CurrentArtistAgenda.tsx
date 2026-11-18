import {activities,places} from '../data/festival';
import {activityArtists} from '../data/activity-artists';
import {activityHref} from '../domain/planner';
import {displayTime} from '../domain/catalog';
import {ArrowUpRight} from 'lucide-react';
export default function CurrentArtistAgenda({artistId}:{artistId:string}){
  const association=activityArtists.find(x=>x.artistId===artistId);if(!association)return null;
  const rows=activities.filter(a=>association.activityIds.includes(a.id));
  return <section className="current-artist-agenda" aria-label="Artista na programação atual"><p className="eyebrow">Anunciado no FASC 2026</p><h3>Esse encontro continua.</h3><p>Participação prevista na programação atual; não é um registro de apresentação já realizada.</p>{rows.map(a=><a key={a.id} href={`${activityHref(a)}&origem=${encodeURIComponent(window.location.hash.slice(1))}`}><span><strong>{a.day}/11 · {displayTime(a.time)} — {a.title}</strong><small>{places.find(p=>p.id===a.placeId)?.name}</small></span><ArrowUpRight size={18} aria-hidden="true"/></a>)}</section>;
}
