import {useState} from 'react';
import {ArrowUpRight, ImageOff} from 'lucide-react';
import {frontageLinks,placePhotos} from '../data/place-photos';

export default function PlacePhoto({placeId,compact=false}:{placeId:string;compact?:boolean}) {
  const photo=placePhotos[placeId];
  const [failedFile,setFailedFile]=useState('');
  const frontage=frontageLinks[placeId];
  if(!photo || failedFile===photo.file) return <div className={`place-photo-fallback${compact?' is-compact':''}`}>
    <ImageOff size={20} aria-hidden="true"/><p>{photo?'A foto não carregou.':'Foto deste espaço em curadoria.'}</p>
    {(photo || frontage) && <a href={photo?.source || frontage} target="_blank" rel="noreferrer">{frontage?'Ver fachada no Google Maps':'Abrir fonte da foto'} <ArrowUpRight size={14} aria-hidden="true"/></a>}
  </div>;
  return <figure className={`place-photo${compact?' is-compact':''}`}>
    <img src={`${import.meta.env.BASE_URL}images/${photo.file}`} alt={photo.alt} width="800" height="533" loading="lazy" decoding="async" onError={()=>setFailedFile(photo.file)}/>
    <figcaption><span>{photo.caption}</span><a href={photo.source} target="_blank" rel="noreferrer">Foto: {photo.credit} <ArrowUpRight size={12} aria-hidden="true"/></a></figcaption>
  </figure>;
}
