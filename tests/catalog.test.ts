import test from 'node:test';
import assert from 'node:assert/strict';
import { festivalStart, festivalEnd, filterPlaces, isActivityLive, festivalDayAt } from '../src/domain/catalog.ts';
import { layoutIndividualPins, overlappingNeighbours } from '../src/domain/map-layout.ts';
import { activities, places } from '../src/data/festival.ts';

test('madrugadas pertencem à data civil seguinte, preservando dia de programação', () => {
  assert.equal(festivalStart('20', '01:00'), '2026-11-21T01:00:00-03:00');
  assert.ok(festivalStart('20', '23:00') < festivalStart('20', '01:00'));
  assert.equal(festivalStart('22', '18:00'), '2026-11-22T18:00:00-03:00');
  assert.throws(() => festivalStart('20', '25:00'));
});
test('busca por atração e texto sem acentos encontra o espaço correspondente', () => {
  assert.deepEqual(filterPlaces(places, activities, 'PERICLES', 'Todos').map(p => p.id), ['joao']);
  assert.ok(filterPlaces(places, activities, 'camara', 'Todos').some(p => p.id === 'camara'));
  assert.equal(filterPlaces(places, activities, 'Péricles', 'Artes cênicas').length, 0);
});
test('espaços sem posição permanecem na busca e lista', () => {
  const pending = {...places[0],id:'pendente',name:'Espaço pendente',coordinates:undefined,canNavigate:false};
  const result = filterPlaces([pending], [], 'pendente', 'Todos');
  assert.equal(result.length, 1);
  assert.equal(result[0].coordinates, undefined);
  assert.equal(result[0].canNavigate, false);
});
test('intervalos atravessam meia-noite sem deslocar a madrugada duas vezes', () => {
  const base = {id:'teste',placeId:'tsuru',day:'20' as const,page:6,title:'Janela'};
  assert.equal(festivalEnd({...base,time:'10:00',endTime:'02:00'}),'2026-11-21T05:00:00.000Z');
  assert.equal(festivalEnd({...base,time:'01:00',endTime:'02:00'}),'2026-11-21T05:00:00.000Z');
  assert.equal(festivalEnd({...base,time:'23:00',endTime:'08:00'}),'2026-11-21T11:00:00.000Z');
  assert.equal(festivalEnd({...base,time:'18:00'}),undefined);
  assert.throws(() => festivalStart('20','9:00'));
});
test('todos os pins continuam individuais com deslocamento pequeno e âncora preservada', () => {
  const base={...places[0],coordinates:[-11,-37] as [number,number]};
  const points=Array.from({length:6},(_,i)=>({place:{...base,id:String(i)},x:100,y:100}));
  const pins=layoutIndividualPins(points);
  assert.equal(pins.length,6);
  for(const pin of pins){assert.deepEqual(pin.place.coordinates,[-11,-37]);assert.ok(Math.hypot(...pin.offset)<=72);}
  for(let i=0;i<pins.length;i++)for(let j=i+1;j<pins.length;j++)assert.ok(Math.hypot(pins[i].x+pins[i].offset[0]-pins[j].x-pins[j].offset[0],pins[i].y+pins[i].offset[1]-pins[j].y-pins[j].offset[1])>=50);
  const separate=layoutIndividualPins([points[0],{...points[1],x:300}]);
  assert.deepEqual(separate.map(p=>p.offset),[[0,0],[0,0]]);
  const residual=[{...points[0],offset:[0,0] as [number,number]},{...points[1],offset:[10,0] as [number,number]}];
  assert.equal(overlappingNeighbours(residual,residual[0]).length,2);
  assert.equal(overlappingNeighbours(separate,separate[0]).length,1);
  const crowded=layoutIndividualPins(Array.from({length:20},(_,i)=>({...points[0],place:{...base,id:String(i)}})));
  assert.equal(crowded.length,20);
  assert.ok(crowded.every(pin=>Math.hypot(...pin.offset)<=72.001));
});
test('agora usa intervalo conhecido, considera madrugada e não inventa fim de show', () => {
  const activity={id:'test',placeId:'tsuru',title:'Tsuru',day:'20' as const,time:'10:00',endTime:'02:00',page:6};
  assert.equal(isActivityLive(activity,Date.parse('2026-11-21T01:30:00-03:00')),true);
  assert.equal(isActivityLive(activity,Date.parse('2026-11-21T02:00:00-03:00')),false);
  assert.equal(isActivityLive({...activity,endTime:undefined},Date.parse('2026-11-20T12:00:00-03:00')),false);
  assert.equal(festivalDayAt(Date.parse('2026-11-21T01:30:00-03:00')),'20');
  assert.equal(festivalDayAt(Date.parse('2026-11-23T01:30:00-03:00')),'22');
  assert.equal(festivalDayAt(Date.parse('2026-11-16T14:00:00-03:00')),undefined);
});
test('cobertura reconciliada com as 21 páginas de conteúdo da v4', () => {
  assert.deepEqual([...new Set(activities.map(a=>a.page))].sort((a,b)=>a-b),[2,3,4,5,6,7,8,10,11,12,13,14,15,16,18,19,20,21,22,23,24]);
  assert.deepEqual(['20','21','22'].map(d=>activities.filter(a=>a.day===d).length),[49,51,44]);
  for (const place of places) assert.ok(activities.some(a=>a.placeId===place.id),place.id);
  assert.equal(activities.filter(a=>a.placeId==='brincar' && a.day==='20').length,0);
  assert.equal(places.find(p=>p.id==='tsuru')?.address.includes('84'),true);
  assert.deepEqual(places.find(p=>p.id==='bica')?.coordinates,[-10.9960373,-37.21218]);
});
test('catálogo tem identificadores únicos, referências e localizadores válidos', () => {
  assert.equal(new Set(places.map(p => p.id)).size, places.length);
  assert.equal(new Set(activities.map(a => a.id)).size, activities.length);
  for (const activity of activities) {
    assert.ok(places.some(p => p.id === activity.placeId));
    assert.ok(activity.page >= 1 && activity.page <= 24);
    assert.ok(!Number.isNaN(Date.parse(festivalStart(activity.day, activity.time))));
    if(activity.endTime) assert.ok(Date.parse(festivalEnd(activity)!)>Date.parse(festivalStart(activity.day,activity.time)));
  }
  for (const place of places) {
    assert.ok(place.pages.length);
    if (place.coordinates) assert.ok(place.coordinateNote);
  }
});
