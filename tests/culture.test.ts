import test from 'node:test';
import assert from 'node:assert/strict';
import {MEMORY_KEY, readMemories, saveMemory, deleteMemory} from '../src/domain/memories.ts';
import type {PersonalMemory} from '../src/domain/memories.ts';
import {culturalRoutes,historicalMilestones,publishedMemories} from '../src/data/culture.ts';
import {places} from '../src/data/festival.ts';
import {existsSync} from 'node:fs';
import {placePhotos,frontageLinks} from '../src/data/place-photos.ts';
function store(initial:string|null=null){let raw=initial;return {getItem:()=>raw,setItem:(_key:string,value:string)=>{raw=value;},raw:()=>raw};}
const memory:PersonalMemory={id:'first',text:'Uma lembrança da praça.',author:'Visitante',placeId:'joao',year:2025,createdAt:'2026-11-17T12:00:00Z'};
test('lembranças persistem, preservam inclusões de outra aba e podem ser excluídas',()=>{
  const storage=store();assert.deepEqual(readMemories(storage),{ok:true,memories:[]});
  assert.equal(saveMemory(storage,memory).ok,true);
  assert.equal(saveMemory(storage,{...memory,id:'second'}).ok,true);
  const loaded=readMemories(storage);assert.ok(loaded.ok);assert.deepEqual(loaded.memories.map(m=>m.id),['second','first']);
  assert.equal(deleteMemory(storage,'first').ok,true);
  const remaining=readMemories(storage);assert.ok(remaining.ok);assert.equal(remaining.memories[0].id,'second');
  assert.equal(deleteMemory(storage,'second').ok,true);assert.deepEqual(readMemories(storage),{ok:true,memories:[]});
});
test('dados corrompidos e versões desconhecidas são preservados sem sobrescrita',()=>{
  for(const raw of ['{bad',JSON.stringify({version:2,memories:[]}),JSON.stringify({version:1,memories:[{...memory,text:42}]}),JSON.stringify({version:1,memories:[memory,memory]})]){
    const storage=store(raw);assert.equal(readMemories(storage).ok,false);assert.equal(saveMemory(storage,memory).ok,false);assert.equal(deleteMemory(storage,'first').ok,false);assert.equal(storage.raw(),raw);
  }
});
test('falhas de leitura e quota não geram sucesso ou exclusão aparente',()=>{
  const blocked={getItem:()=>{throw new Error('blocked');},setItem:()=>{throw new Error('blocked');}};
  assert.equal(readMemories(blocked).ok,false);assert.equal(saveMemory(blocked,memory).ok,false);
  const raw=JSON.stringify({version:1,memories:[memory]});
  const full={getItem:()=>raw,setItem:()=>{throw new Error('quota');}};
  assert.equal(saveMemory(full,{...memory,id:'second'}).ok,false);assert.equal(deleteMemory(full,'first').ok,false);assert.equal(full.getItem(),raw);
});
test('validação protege limites, anos e conteúdo; coordenadas não são persistidas',()=>{
  for(const invalid of [{...memory,text:' '},{...memory,text:'x'.repeat(1201)},{...memory,author:'a'.repeat(61)},{...memory,year:1900},{...memory,year:9999}])assert.equal(saveMemory(store(),invalid).ok,false);
  const storage=store();const html='<img src=x onerror=alert(1)>';
  assert.equal(saveMemory(storage,{...memory,text:html,coordinates:[-11,-37]} as PersonalMemory).ok,true);
  const parsed=JSON.parse(storage.raw()!);assert.equal(parsed.memories[0].text,html);assert.equal('coordinates' in parsed.memories[0],false);assert.equal(MEMORY_KEY,'vivase:memories:v1');
});
test('roteiros têm ordem explícita, referências existentes e fontes por parada',()=>{
  assert.equal(new Set(culturalRoutes.map(r=>r.id)).size,culturalRoutes.length);
  for(const route of culturalRoutes){assert.ok(route.stops.length>=2);assert.equal(new Set(route.stops.map(s=>s.placeId)).size,route.stops.length);for(const stop of route.stops){assert.ok(places.some(p=>p.id===stop.placeId));assert.ok(stop.source.title);assert.ok(stop.description);}}
});
test('marcos são selecionados, documentados e não inventam uma edição por ano',()=>{
  assert.deepEqual([...new Set(historicalMilestones.map(m=>m.year))],[1972,2005,2010,2017,2018,2019,2022,2023,2024,2025,2026]);
  for(const milestone of historicalMilestones){assert.ok(milestone.source.title);if(milestone.placeId)assert.ok(places.some(p=>p.id===milestone.placeId));}
  assert.equal(historicalMilestones.find(m=>m.year===2010)?.kind,'cidade');assert.equal(historicalMilestones.find(m=>m.year===2026)?.announced,true);
  for(const memory of publishedMemories){assert.ok(memory.source.url?.startsWith('https://'));assert.equal(memory.year,2025);}
});

test('fotos têm arquivo real, crédito, contexto e fonte; referências não viram fotos de 2026',()=>{
  for(const [id,photo] of Object.entries(placePhotos)){
    assert.ok(places.some(p=>p.id===id),id);
    assert.ok(existsSync(new URL(`../public/images/${photo.file}`,import.meta.url)),id);
    assert.ok(photo.alt && photo.caption && photo.credit && photo.source.startsWith('https://'),id);
  }
  assert.equal(Object.keys(placePhotos).length,20);
  assert.match(placePhotos.joao.caption,/2025/);
  assert.match(placePhotos.cuidado.caption,/Não mostra/);
  assert.ok(frontageLinks.tsuru && frontageLinks.reurb);
});
