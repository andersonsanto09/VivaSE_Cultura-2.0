import { ArrowUpRight, Church, Landmark, MapPinned } from 'lucide-react';
import Figure from './Figure';
import type { CityPlace } from '../content/places';

const typeIcon = { 'Praça': MapPinned, 'Museu': Landmark, 'Igreja': Church, 'Espaço cultural': Landmark, 'Edifício histórico': Landmark } as const;

/** City place card for "Descubra São Cristóvão". */
export default function PlaceCard({ place }: { place: CityPlace }) {
  const Symbol = typeIcon[place.type];
  return <article className="vs-place-card">
    <div className="vs-place-media">
      {place.image ? <Figure image={place.image} showCaption={false} sizes="(min-width: 900px) 25vw, 80vw" /> : <div className="vs-place-placeholder"><Symbol size={34} strokeWidth={1.5} aria-hidden="true" /><span>Fotografia em curadoria</span></div>}
      <span className="vs-place-type"><Symbol size={14} aria-hidden="true" />{place.type}</span>
    </div>
    <div className="vs-place-body">
      <p className="vs-place-area">{place.area}</p>
      <h3>{place.name}</h3>
      <p className="vs-place-summary">{place.summary}</p>
      <div className="vs-place-actions">
        {place.fascPlaceId && <a href={`#/mapa?dia=20&lugar=${encodeURIComponent(place.fascPlaceId)}`}>Ver no mapa do FASC <ArrowUpRight size={15} aria-hidden="true" /></a>}
        {place.sources[0]?.url && <a className="vs-place-source" href={place.sources[0].url} target="_blank" rel="noreferrer">Fonte <ArrowUpRight size={13} aria-hidden="true" /></a>}
      </div>
      {place.image && <p className="vs-place-credit"><a href={place.image.source} target="_blank" rel="noreferrer">Foto: {place.image.credit}</a></p>}
    </div>
  </article>;
}
