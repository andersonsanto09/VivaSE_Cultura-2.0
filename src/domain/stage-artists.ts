import type {Artist,HistoricalPerformance,HistoricalVenue} from './history.ts';
import {normalize} from './catalog.ts';

// A shared square is not sufficient to identify a stage: museums, literature
// halls and other stages may share the same geographic reference.
export function stageFamily(name:string):string | undefined {
  const text=normalize(name);
  if(/joao bebe|palco gal costa|palco sao francisco/.test(text))return 'joao';
  if(/frei santa(?:na)? cecilia|palco quintal musical/.test(text))return 'frei';
  if(/capuchinhos|banco do nordeste cultural/.test(text))return 'capuchinhos';
  if(/samba na bica/.test(text))return 'bica';
}
const highlights=['Gilberto Gil','Alceu Valença','Marina Lima','Arnaldo Antunes','Zeca Baleiro','Liniker','Olodum','Gaby Amarantos','BaianaSystem','The Baggios','Groundation','Filipe Catto','Karol Conká'];
export function artistsAtStage(placeId:string,artists:Artist[],performances:HistoricalPerformance[],venues:HistoricalVenue[]){
  if(!['joao','frei','capuchinhos','bica'].includes(placeId))return [];
  const venueIds=new Set(venues.filter(v=>v.category==='Música' && stageFamily(v.name)===placeId).map(v=>v.id));
  return artists.filter(a=>a.featured).flatMap(artist=>{
    const records=performances.filter(p=>p.artistId===artist.id && p.status==='performed' && (p.category || artist.category)==='Música' && p.venueId && venueIds.has(p.venueId));
    return records.length?[{artist,records,years:[...new Set(records.map(p=>p.editionId))].sort()}]:[];
  }).sort((a,b)=>{
    const rank=(name:string)=>{const index=highlights.indexOf(name);return index<0?highlights.length:index;};
    return rank(a.artist.name)-rank(b.artist.name) || a.artist.name.localeCompare(b.artist.name,'pt-BR');
  });
}
