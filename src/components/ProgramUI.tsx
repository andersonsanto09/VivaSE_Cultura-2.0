import * as Accordion from '@radix-ui/react-accordion';
import {ChevronDown} from 'lucide-react';
import {days,festivalStart,festivalEnd,displayTime} from '../domain/catalog';
import type {Activity,FestivalDay} from '../domain/catalog';
export function DayPicker({ day, onChange }: { day: FestivalDay; onChange: (day: FestivalDay) => void }) {
  return <div className="days" role="group" aria-label="Dia de programação">{days.map(d => <button key={d.id} className={`day day-${d.id}`} aria-label={`${d.name}, ${d.id} de novembro`} aria-pressed={day === d.id} onClick={() => onChange(d.id)}><strong>{d.short}, {d.id}</strong><span>novembro</span></button>)}</div>;
}
export function ActivityTime({ activity }: { activity: Activity }) {
  const end = festivalEnd(activity);
  const endDate = end && new Date(end).toLocaleDateString('pt-BR',{timeZone:'America/Sao_Paulo',day:'2-digit',month:'2-digit'});
  return <time className={activity.time.slice(3)!=='00'?'has-minutes':undefined} dateTime={festivalStart(activity.day,activity.time)}><span>{displayTime(activity.time)}</span>{activity.endTime && <span className="end-time">até {displayTime(activity.endTime)}</span>}{Number(activity.time.slice(0,2)) < 6 ? <small>{Number(activity.day)+1}/11 · madrugada</small> : endDate && endDate !== `${activity.day}/11` ? <small>até {endDate}</small> : null}</time>;
}
export function ActivityDetails({ activity }: { activity: Activity }) {
  if(!activity.details)return null;
  return <Accordion.Root type="single" collapsible className="activity-accordion"><Accordion.Item value="details"><Accordion.Header><Accordion.Trigger>Participantes e detalhes<ChevronDown size={16} aria-hidden="true" /></Accordion.Trigger></Accordion.Header><Accordion.Content><p>{activity.details}</p></Accordion.Content></Accordion.Item></Accordion.Root>;
}
