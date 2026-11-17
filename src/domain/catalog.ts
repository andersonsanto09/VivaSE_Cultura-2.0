export type FestivalDay = '20' | '21' | '22';
export type Category = 'Música' | 'Artes cênicas' | 'Cultura e formação' | 'Feiras e experiências' | 'Cortejos';
export interface Place {
  id: string; name: string; address: string; category: Category; description: string;
  pages: number[]; coordinates?: [number, number]; coordinateNote?: string;
  canNavigate: boolean; itinerant?: boolean; number?: number;
  locationKind?: 'equipment' | 'square' | 'street' | 'departure' | 'pending';
  locationSources?: string[];
}
export interface Activity {
  id: string; placeId: string; day: FestivalDay; time: string; title: string; page: number;
  endTime?: string; details?: string;
}
export const days: { id: FestivalDay; name: string; short: string }[] = [
  { id: '20', name: 'Sexta-feira', short: 'Sex' },
  { id: '21', name: 'Sábado', short: 'Sáb' },
  { id: '22', name: 'Domingo', short: 'Dom' },
];
export const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
export function festivalStart(day: FestivalDay, time: string): string {
  if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time)) throw new Error('Horário inválido');
  const [hour, minute] = time.split(':').map(Number);
  if (!Number.isInteger(hour) || !Number.isInteger(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) throw new Error('Horário inválido');
  const date = Number(day) + (hour < 6 ? 1 : 0);
  return `2026-11-${date}T${time}:00-03:00`;
}
export function festivalEnd(activity: Activity): string | undefined {
  if (!activity.endTime) return undefined;
  const start = new Date(festivalStart(activity.day, activity.time));
  const end = new Date(festivalStart(activity.day, activity.endTime));
  if (end <= start) end.setUTCDate(end.getUTCDate() + 1);
  return end.toISOString();
}
export function activityPeriod(activity: Activity): string {
  return activity.endTime ? `${displayTime(activity.time)}–${displayTime(activity.endTime)}` : displayTime(activity.time);
}
export const displayTime = (time: string) => time.replace(':00', 'h').replace(':', 'h');
export function filterPlaces(places: Place[], activities: Activity[], query: string, category: string): Place[] {
  const term = normalize(query);
  return places.filter(place => (category === 'Todos' || place.category === category) &&
    normalize(`${place.name} ${place.address} ${place.description} ${activities.filter(a => a.placeId === place.id).map(a => `${a.title} ${a.details || ''}`).join(' ')}`).includes(term));
}

// Geographic anchors never move. Only coincident references get compact pixel offsets
// at street zoom, so zooming out cannot spread places across other municipalities.
export function layoutMapPlaces(places: Place[], zoom: number): { place: Place; coordinates: [number,number]; offset: [number,number]; displaced: boolean }[] {
  return places.filter(p=>p.coordinates).map(place=>{
    const peers=places.filter(p=>p.coordinates && p.coordinates[0]===place.coordinates![0] && p.coordinates[1]===place.coordinates![1]);
    const index=peers.findIndex(p=>p.id===place.id);
    const radius=peers.length>1 ? 52*Math.max(0,Math.min(1,(zoom-15)*2)) : 0;
    const angle=-Math.PI/2+index/peers.length*Math.PI*2;
    const offset:[number,number]=radius ? [Math.round(Math.cos(angle)*radius),Math.round(Math.sin(angle)*radius)] : [0,0];
    return {place,coordinates:[...place.coordinates!] as [number,number],offset,displaced:radius>0};
  });
}
