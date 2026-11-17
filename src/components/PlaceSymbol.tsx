import { BookOpen, Clapperboard, Drama, HeartHandshake, Landmark, Leaf, Music2, Palette, ShoppingBag, Sparkles, Store, Users, Footprints, Gamepad2 } from 'lucide-react';
import type { Place } from '../domain/catalog';

export function placeKind(place: Place) {
  if(place.category === 'Música') return 'music';
  if(/literatura/i.test(place.name)) return 'books';
  if(/museu/i.test(place.name)) return 'heritage';
  if(/cine|cinema/i.test(place.name)) return 'cinema';
  if(place.category==='Artes cênicas') return 'theatre';
  if(/artes|galeria/i.test(place.name)) return 'art';
  if(place.id === 'mariano') return 'theatre';
  if(place.id === 'literatura') return 'books';
  if(place.id === 'cinema') return 'cinema';
  if(place.id === 'cuidado') return 'care';
  if(place.id === 'sustentavel') return 'nature';
  if(place.id === 'historico' || place.id === 'sacra') return 'heritage';
  if(place.id === 'vesta' || place.id === 'culturas') return 'art';
  if(place.id === 'brincar') return 'play';
  if(place.id === 'cortejo') return 'walk';
  if(place.id === 'cortejo-fixo') return 'people';
  if(place.id === 'camara') return 'innovation';
  if(place.id === 'feira') return 'shop';
  return 'experiences';
}
const symbols = {music:Music2,theatre:Drama,books:BookOpen,cinema:Clapperboard,care:HeartHandshake,nature:Leaf,heritage:Landmark,art:Palette,play:Gamepad2,walk:Footprints,people:Users,innovation:Sparkles,shop:ShoppingBag,experiences:Store};
export default function PlaceSymbol({place,size=22}:{place:Place;size?:number}) {
  const Symbol = symbols[placeKind(place)];
  return <Symbol size={size} strokeWidth={2} aria-hidden="true" />;
}
