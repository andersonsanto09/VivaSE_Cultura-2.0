import {useState} from 'react';
import {placePhotos} from '../data/place-photos';
import PlaceSymbol from './PlaceSymbol';
import {categoryTone} from './CategoryChips';
import type {Place} from '../domain/catalog';
export default function PlaceThumbnail({place}:{place:Place}){
  const photo=placePhotos[place.id];const [failed,setFailed]=useState(false);
  return <span className={`place-thumbnail tone-${categoryTone(place.category)}`} title={photo?`${photo.caption} Foto: ${photo.credit}`:place.category}>
    {photo && !failed?<img src={`${import.meta.env.BASE_URL}images/${photo.file}`} alt="" width="84" height="84" loading="lazy" decoding="async" onError={()=>setFailed(true)}/>:null}
    <span className="thumbnail-symbol"><PlaceSymbol place={place} size={15}/></span>
  </span>;
}
