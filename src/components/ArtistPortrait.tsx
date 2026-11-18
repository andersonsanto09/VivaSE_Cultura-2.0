import {useState} from 'react';
import {artistPhotos} from '../data/artist-photos';
export default function ArtistPortrait({id,name}:{id:string;name:string}){
  const photo=artistPhotos[id];const [failedFile,setFailedFile]=useState('');
  if(!photo || failedFile===photo.file)return <div className="artist-typographic"><div className="artist-letterpress" aria-hidden="true"><span className="letterpress-label">Acervo FASC</span><span className="letterpress-initial">{name.split(/\s+/).filter(Boolean).slice(0,2).map(w=>w[0]).join('')}</span><span className="letterpress-star ribbon-star"/></div><div className="print-caption">{photo?'A foto não carregou.':'Fotografia ainda não disponível.'}<span>Acervo cultural do FASC</span></div></div>;
  return <figure className="artist-portrait"><img src={`${import.meta.env.BASE_URL}images/artists/${photo.file}`} style={{objectPosition:photo.position}} alt={photo.alt} width="800" height="600" loading="lazy" decoding="async" onError={()=>setFailedFile(photo.file)}/><figcaption><span>{photo.caption}</span><a href={photo.source} target="_blank" rel="noreferrer">Foto: {photo.credit}</a></figcaption></figure>;
}
