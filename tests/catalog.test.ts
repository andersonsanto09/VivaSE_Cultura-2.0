import test from 'node:test';
import assert from 'node:assert/strict';
import { festivalStart, festivalEnd, filterPlaces, layoutMapPlaces } from '../src/domain/catalog.ts';
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
test('cada espaço mantém seu marcador e posições compartilhadas são separadas visualmente', () => {
  const shared = places.filter(p => p.id === 'camara' || p.id === 'mariano');
  const pins = layoutMapPlaces(shared,17);
  assert.equal(pins.length,2);
  assert.deepEqual(pins.map(p=>p.place.id),shared.map(p=>p.id));
  assert.deepEqual(pins[0].coordinates,pins[1].coordinates);
  assert.notDeepEqual(pins[0].offset,pins[1].offset);
  assert.deepEqual(shared[0].coordinates,shared[1].coordinates);
  assert.equal(pins[1].displaced,true);
  assert.equal(layoutMapPlaces([{...shared[0],coordinates:undefined}],14).length,0);
  for (const zoom of [13,17,19]) {
    const all = layoutMapPlaces(places,zoom);
    assert.equal(all.length,20);
    assert.equal(new Set(all.map(p=>p.place.id)).size,20);
    for(const pin of all) assert.deepEqual(pin.coordinates,pin.place.coordinates);
    if(zoom<15) assert.ok(all.every(p=>p.offset[0]===0 && p.offset[1]===0));
  }
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
