import test from 'node:test';
import assert from 'node:assert/strict';
import {readCollection,toggleCollection,PLANNER_KEY} from '../src/domain/collections.ts';
import {plannerConflicts,periodOf,activityHref} from '../src/domain/planner.ts';
import {updateMemory,saveMemory,readMemories} from '../src/domain/memories.ts';
import {activities} from '../src/data/festival.ts';
import {historicalArtists} from '../src/data/history.ts';
import {activityArtists} from '../src/data/activity-artists.ts';
import type {Activity} from '../src/domain/catalog.ts';
function store(initial:string|null=null){let raw=initial;return {getItem:()=>raw,setItem:(_key:string,v:string)=>{raw=v},raw:()=>raw};}
const activity=(time:string,endTime?:string,day='20'):Activity=>({id:time,placeId:'joao',day:day as '20',title:time,time,endTime,page:1});
test('coleções preservam alterações de outras abas e dados inválidos',()=>{
 const s=store();assert.equal(toggleCollection(s,PLANNER_KEY,'a').ok,true);toggleCollection(s,PLANNER_KEY,'b');
 assert.deepEqual(readCollection(s,PLANNER_KEY),{ok:true,ids:['a','b']});toggleCollection(s,PLANNER_KEY,'a');assert.deepEqual(readCollection(s,PLANNER_KEY),{ok:true,ids:['b']});
 for(const raw of ['{bad','{"version":2,"ids":[]}','{"version":1,"ids":["a","a"]}']){const s=store(raw);assert.equal(toggleCollection(s,PLANNER_KEY,'x').ok,false);assert.equal(s.raw(),raw);}
 const quota={getItem:()=>null,setItem:()=>{throw Error('quota')}};assert.equal(toggleCollection(quota,PLANNER_KEY,'x').ok,false);
});
test('conflitos usam intervalos reais e não inventam duração para shows',()=>{
 assert.equal(plannerConflicts([activity('19:00'),activity('20:00')]).length,0);
 assert.equal(plannerConflicts([activity('19:00'),activity('19:00')])[0].kind,'same-start');
 assert.equal(plannerConflicts([activity('19:00','21:00'),activity('20:00','22:00')])[0].kind,'overlap');
 assert.equal(plannerConflicts([activity('19:00','20:00'),activity('20:00','21:00')]).length,0);
 assert.equal(plannerConflicts([activity('23:00','02:00'),activity('01:00','03:00')])[0].kind,'overlap');
 assert.equal(plannerConflicts([activity('19:00'),activity('19:00',undefined,'21')]).length,0);
 assert.deepEqual(['01:00','09:00','16:00','22:00'].map(t=>periodOf(activity(t))),['madrugada','manha','tarde','noite']);
});
test('edição preserva identidade, criação e lembranças de outra aba; falhas não sobrescrevem',()=>{
 const m={id:'first',text:'Original',author:'QA',year:2025,placeId:'joao',createdAt:'2026-11-17T12:00:00Z'};const s=store();saveMemory(s,m);saveMemory(s,{...m,id:'other'});
 const result=updateMemory(s,{...m,text:'Editada',createdAt:'2026-11-18T12:00:00Z'});assert.ok(result.ok);assert.equal(result.memories.length,2);assert.equal(result.memories.find(x=>x.id==='first')?.createdAt,m.createdAt);assert.equal(result.memories.find(x=>x.id==='first')?.text,'Editada');
 const before=s.raw();assert.equal(updateMemory(s,{...m,id:'missing'}).ok,false);assert.equal(s.raw(),before);
 const corrupt=store('{bad');assert.equal(updateMemory(corrupt,m).ok,false);assert.equal(corrupt.raw(),'{bad');
 const full=store(JSON.stringify({version:1,memories:Array.from({length:100},(_,i)=>({...m,id:String(i)}))}));assert.equal(updateMemory(full,{...m,id:'0',text:'No limite'}).ok,true);
 const quota={getItem:()=>before,setItem:()=>{throw Error('quota')}};assert.equal(updateMemory(quota,m).ok,false);assert.equal(quota.getItem(),before);
});
test('associações atuais são únicas, apontam para artistas e atividades existentes e links individuais',()=>{
 assert.equal(new Set(activityArtists.map(x=>x.artistId)).size,activityArtists.length);
 for(const relation of activityArtists){assert.ok(historicalArtists.some(a=>a.id===relation.artistId),relation.artistId);assert.equal(new Set(relation.activityIds).size,relation.activityIds.length);for(const id of relation.activityIds)assert.ok(activities.some(a=>a.id===id),id);}
 assert.match(activityHref(activities[0]),/^#\/programacao\?dia=\d+&atividade=/);
});
