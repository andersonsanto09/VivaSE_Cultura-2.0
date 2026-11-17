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
export function isActivityLive(activity:Activity,now:number):boolean {
  const end=festivalEnd(activity);
  return !!end && Date.parse(festivalStart(activity.day,activity.time))<=now && now<Date.parse(end);
}
export function festivalDayAt(now:number):FestivalDay|undefined {
  const parts=new Intl.DateTimeFormat('en',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',hourCycle:'h23'}).formatToParts(now);
  const value=(type:string)=>Number(parts.find(p=>p.type===type)?.value);
  if(value('year')!==2026 || value('month')!==11) return undefined;
  const day=value('day')-(value('hour')<6?1:0);
  return day>=20 && day<=22 ? String(day) as FestivalDay : undefined;
}
export const displayTime = (time: string) => time.replace(':00', 'h').replace(':', 'h');
export function filterPlaces(places: Place[], activities: Activity[], query: string, category: string): Place[] {
  const term = normalize(query);
  return places.filter(place => (category === 'Todos' || place.category === category) &&
    normalize(`${place.name} ${place.address} ${place.description} ${activities.filter(a => a.placeId === place.id).map(a => `${a.title} ${a.details || ''}`).join(' ')}`).includes(term));
}
