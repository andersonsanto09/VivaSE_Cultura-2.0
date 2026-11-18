import type {Activity} from './catalog.ts';
import {festivalStart,festivalEnd} from './catalog.ts';
export function periodOf(a:Activity){const hour=Number(a.time.slice(0,2));return hour<6?'madrugada':hour<12?'manha':hour<18?'tarde':'noite';}
export function plannerConflicts(activities:Activity[]){
  const conflicts:{a:Activity;b:Activity;kind:'overlap'|'same-start'}[]=[];
  for(let i=0;i<activities.length;i++)for(let j=i+1;j<activities.length;j++){
    const a=activities[i],b=activities[j],as=Date.parse(festivalStart(a.day,a.time)),bs=Date.parse(festivalStart(b.day,b.time));
    const ae=festivalEnd(a),be=festivalEnd(b);
    if(ae && be && as<Date.parse(be) && bs<Date.parse(ae))conflicts.push({a,b,kind:'overlap'});
    else if(as===bs)conflicts.push({a,b,kind:'same-start'});
  }
  return conflicts;
}
export function activityHref(a:Activity){return `#/programacao?${new URLSearchParams({dia:a.day,atividade:a.id})}`;}
