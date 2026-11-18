import {artistsAtStage,stageFamily} from '../src/domain/stage-artists.ts';
import editionIndex from '../src/data/edition-index.json' with {type:'json'};
import test from 'node:test';
import assert from 'node:assert/strict';
import {festivalEditions,historicalArtists,historicalMilestones,historicalPerformances,historicalSources,historicalVenues,historyImportAudit} from '../src/data/history.ts';
import {filterHistoricalArtists,groupHistoricalAgenda,historicalMapHref,nextEditionIndex,safeHistoryOrigin,venueAsPlace} from '../src/domain/history.ts';

test('agenda histórica agrupa datas, preserva sua natureza, ordena madrugada e mantém lacunas explícitas',()=>{
 const base={editionId:'2025',artistId:'gaby',status:'announced' as const,context:'Registro',sourceIds:[]};
 const records=[{...base,id:'unknown'},{...base,id:'late',date:'2025-11-20',time:'01:00'},{...base,id:'evening',date:'2025-11-20',time:'21:00'},{...base,id:'no-time',date:'2025-11-20'},{...base,id:'civil',date:'2025-11-20',time:'01:00',dateKind:'civil' as const},{...base,id:'next',date:'2025-11-21',time:'19:00'}];
 const groups=groupHistoricalAgenda(records);
 assert.deepEqual(groups.map(g=>g.key),['2025-11-20','2025-11-21','unknown']);
 assert.deepEqual(groups[0].records.map(r=>r.id),['civil','evening','late','no-time']);
 assert.equal(groups[0].records[0].dateKind,'civil');assert.equal(groups[2].date,undefined);
 assert.equal(groups.flatMap(g=>g.records).length,records.length);assert.equal(records[0].id,'unknown','não altera a ordem original do acervo');
});

test('acervo mantém integridade de edições, artistas, palcos, apresentações e fontes',()=>{
  for(const list of [festivalEditions,historicalArtists,historicalMilestones,historicalPerformances,historicalSources,historicalVenues])assert.equal(new Set(list.map(r=>r.id)).size,list.length);
  const sources=new Set(historicalSources.map(s=>s.id));
  for(const e of festivalEditions){assert.ok(e.sourceIds.length);for(const id of e.sourceIds)assert.ok(sources.has(id),id);}
  for(const v of historicalVenues){assert.ok(festivalEditions.some(e=>e.id===v.editionId));assert.ok(v.sourceIds.length);for(const id of v.sourceIds)assert.ok(sources.has(id));if(v.coordinates){assert.equal(v.precision,'approximate');assert.ok(v.coordinateSourceIds.length);assert.ok(v.coordinates[0]<-10 && v.coordinates[1]<-37);}else assert.equal(v.precision,'unavailable');}
  for(const p of historicalPerformances){if(p.editionId)assert.ok(festivalEditions.some(e=>e.id===p.editionId));else assert.equal(p.status,'undated');assert.ok(historicalArtists.some(a=>a.id===p.artistId));if(p.venueId)assert.ok(historicalVenues.some(v=>v.id===p.venueId && v.editionId===p.editionId));for(const id of p.sourceIds)assert.ok(sources.has(id));if(p.date)assert.match(p.date,/^\d{4}-\d{2}-\d{2}$/);if(p.time)assert.match(p.time,/^\d{2}:\d{2}$/);}
  for(const m of historicalMilestones){if(m.editionId)assert.ok(festivalEditions.some(e=>e.id===m.editionId && e.year===m.year));if(m.venueId)assert.ok(historicalVenues.some(v=>v.id===m.venueId && v.editionId===m.editionId));for(const id of m.artistIds || [])assert.ok(historicalArtists.some(a=>a.id===id));}
});
test('não cria edições durante interrupções nem números por subtração',()=>{
  assert.deepEqual(festivalEditions.map(e=>e.year),[1972,1973,1984,1985,1988,1989,1990,1991,1992,1993,2005,2017,2018,2019,2022,2023,2024,2025]);
  assert.equal(festivalEditions.find(e=>e.year===2005)?.number,33);
  assert.ok(!festivalEditions.some(e=>[2010,2020,2021,2026].includes(e.year)));
  assert.equal(historicalMilestones.find(m=>m.year===2010)?.kind,'cidade');
  assert.equal(historicalMilestones.find(m=>m.year===2026)?.announced,true);
});
test('configurações e nomes de palco pertencem à edição, não ao mapa de 2026',()=>{
  assert.equal(historicalVenues.find(v=>v.id==='2022-joao')?.name,'Palco Gal Costa');
  assert.equal(historicalVenues.find(v=>v.id==='2025-joao')?.name,'Palco João Bebe Água');
  assert.ok(!historicalArtists.some(a=>a.name==='Gal Costa'));
  const unknown=historicalVenues.find(v=>v.id==='2017-museu')!;
  assert.equal(venueAsPlace(unknown).coordinates,undefined);
  assert.equal(historicalVenues.filter(v=>v.editionId==='2019').length,11);
});
test('anúncio não se transforma em show realizado e divergências ficam explícitas',()=>{
  assert.equal(historicalPerformances.find(p=>p.id==='2022-alceu')?.status,'performed');assert.equal(historicalPerformances.find(p=>p.id==='2022-alceu')?.timeKind,'announced');
  assert.equal(historicalPerformances.find(p=>p.id==='2022-afexe')?.status,'performed');
  const lamparina=historicalPerformances.find(p=>p.id==='2024-lamparina')!;
  assert.equal(lamparina.date,undefined);assert.ok(lamparina.uncertainty);
  const baiana=historicalPerformances.find(p=>p.id==='2018-baiana')!;
  assert.equal(baiana.status,'performed');assert.equal(historicalVenues.find(v=>v.id===baiana.venueId)?.address,'Praça São Francisco');assert.equal(baiana.date,undefined);
});
test('busca, categoria, edição e ordenação usam participações compartilhadas',()=>{
  const find=(query='',edition='',category='',order='recentes')=>filterHistoricalArtists(historicalArtists,historicalPerformances,festivalEditions,{query,edition,category,order});
  assert.equal(find('peROla')[0]?.id,'perola');
  assert.deepEqual(find('baiana').map(a=>a.id),['baiana']);
  assert.equal(find('', '1972').length,9);
  assert.ok(find('','2022','Artes cênicas').every(a=>a.category==='Artes cênicas'));
  const recent=find().map(a=>a.id);assert.ok(recent.indexOf('baiana')<recent.indexOf('artist-sivuca'));
  const old=find('','','','antigas').map(a=>a.id);assert.ok(old.indexOf('artist-sivuca')<old.indexOf('baiana'));
  assert.equal(find('não existe').length,0);
});
test('links preservam edição/espaço e origens internas; avanço para na última edição',()=>{
  const link=historicalMapHref('2022','2022-joao','/artistas?busca=baiana&pagina=2');
  const params=new URLSearchParams(link.split('?')[1]);assert.equal(params.get('modo'),'historico');assert.equal(params.get('edicao'),'2022');assert.equal(params.get('lugar'),'2022-joao');assert.equal(params.get('origem'),'/artistas?busca=baiana&pagina=2');
  assert.equal(safeHistoryOrigin('https://example.com'),'');assert.equal(safeHistoryOrigin('//example.com'),'');assert.equal(safeHistoryOrigin('/artistas?edicao=2022'),'/artistas?edicao=2022');
  assert.equal(nextEditionIndex(8,9),8);assert.equal(nextEditionIndex(0,9),1);
});


test('merge conserva os 38 registros anteriores e representa as 212 entradas recebidas uma única vez',()=>{
  const ids=new Set(historicalPerformances.map(p=>p.id));
  for(const id of ['2017-imbuaca','2018-baiana','2022-baggios','2024-baggios','2024-lamparina','2025-olodum'])assert.ok(ids.has(id),id);
  const provenance=historicalPerformances.flatMap(p=>p.provenanceIds || []);
  assert.equal(provenance.length,212);assert.equal(new Set(provenance).size,212);
  assert.equal(historicalPerformances.length,38+historyImportAudit.added+historyImportAudit.additionalResearched);
  assert.ok(historicalArtists.filter(a=>a.featured).length<historicalArtists.length);
  assert.equal(historicalArtists.find(a=>a.id==='perola')?.featured,false);
  assert.equal(historicalArtists.filter(a=>a.name==='Liniker').length,1);
});
test('trajetórias mantêm sete Baggios, duas linguagens de Arnaldo e anos desconhecidos sem inventar pins',()=>{
  const baggios=historicalPerformances.filter(p=>p.artistId==='baggios');
  assert.deepEqual(baggios.map(p=>p.editionId).sort(),['2017','2018','2019','2022','2023','2024','2025']);
  assert.equal(historicalVenues.find(v=>v.id===baggios.find(p=>p.editionId==='2022')?.venueId)?.name,'Palco Gal Costa');
  assert.equal(baggios.find(p=>p.editionId==='2024')?.status,'performed');
  assert.equal(baggios.find(p=>p.editionId==='2023')?.status,'performed');
  assert.equal(historicalVenues.find(v=>v.id===baggios.find(p=>p.editionId==='2025')?.venueId)?.name,'Palco Banco do Nordeste Cultural');
  assert.equal(baggios.find(p=>p.editionId==='2025')?.status,'announced');
  const arnaldo=historicalArtists.find(a=>a.name==='Arnaldo Antunes')!;
  assert.deepEqual(historicalPerformances.filter(p=>p.artistId===arnaldo.id && p.editionId==='2024').map(p=>p.category).sort(),['Cultura e formação','Música']);
  for(const name of ['Jorge Amado','Waly Salomão']){
    const a=historicalArtists.find(a=>a.name===name)!;
    assert.ok(historicalPerformances.filter(p=>p.artistId===a.id).every(p=>p.editionId==='' && !p.venueId));
  }
  assert.ok(!historicalArtists.some(a=>a.name==='Elba Ramalho' || a.name==='Gal Costa'));
});
test('mudanças de lugar não herdam coordenadas da edição atual',()=>{
  const theatre=historicalVenues.find(v=>v.editionId==='2018' && v.name==='Palco Antônio Mariano')!;
  assert.equal(theatre.address,'Praça da Bíblia');assert.equal(theatre.coordinates,undefined);
  assert.equal(historicalVenues.find(v=>v.id==='2018-mariano')?.address,'Largo da Matriz');
  const mestre=historicalVenues.find(v=>v.editionId==='2023' && /Mestre Neca/.test(v.name))!;
  assert.equal(mestre.address,'Rua Erundino Prado');
  for(const year of ['2017','2018','2019','2022','2023','2024','2025'])assert.ok(historicalVenues.filter(v=>v.editionId===year && v.coordinates).length>=5,year);
  assert.equal(historicalVenues.filter(v=>v.editionId==='1972' && v.coordinates).length,0);
});

test("índice leve da máquina do tempo corresponde às edições completas",()=>{assert.deepEqual(editionIndex.map(e=>e.id),festivalEditions.map(e=>e.id));});

test('memória por palco usa grandes nomes com shows documentados, sem confundir referências compartilhadas',()=>{
  const at=(id:string)=>artistsAtStage(id,historicalArtists,historicalPerformances,historicalVenues);
  assert.ok(at('joao').some(e=>e.artist.id==='alceu'));
  assert.ok(at('joao').some(e=>e.artist.id==='baggios' && e.years.includes('2022')));
  assert.ok(at('frei').some(e=>e.artist.id==='baggios' && e.years.includes('2023')));
  assert.ok(!at('capuchinhos').some(e=>e.artist.id==='baggios')); // 2025 only announced
  assert.ok(!at('joao').find(e=>e.artist.id==='baggios')!.years.includes('2017')); // announcement is not execution
  for(const entry of [...at('joao'),...at('frei')])assert.ok(entry.records.every(p=>p.status==='performed' && p.category==='Música'));
  assert.deepEqual(at('historico'),[]);assert.deepEqual(at('mariano'),[]);
  assert.equal(stageFamily('Palco Gal Costa'),'joao');
  assert.equal(stageFamily('Museu Histórico — Praça São Francisco'),undefined);
});
