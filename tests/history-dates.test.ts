import test from 'node:test';
import assert from 'node:assert/strict';
import {historicalPerformances as ps,historicalSources} from '../src/data/history.ts';
import data from '../src/data/history-date-reviews.json' with {type:'json'};
import {applyHistoricalDates} from '../src/domain/history-dates.ts';
import type {HistoricalPerformance} from '../src/domain/history.ts';

test('datas de todas as participações de 2005 e 2017–2025 estão preenchidas com fontes, sem alterar status ou criar registros',()=>{
 assert.equal(ps.length,230);assert.equal(new Set(ps.map(p=>p.id)).size,230);
 for(const p of ps.filter(p=>p.editionId==='2005'||Number(p.editionId)>=2017))assert.ok(p.date,p.id);
 for(const review of data.reviews){const p=ps.find(p=>p.id===review.performanceId)!;assert.equal(p.date,review.date);assert.ok(p.dateEvidence);assert.deepEqual(p.dateSourceIds,review.sourceIds);for(const id of review.sourceIds)assert.ok(historicalSources.some(s=>s.id===id),id);}
 const pabllo=ps.find(p=>p.artistId==='artist-pabllo-vittar'&&p.editionId==='2025')!;
 const d2=ps.find(p=>p.artistId==='artist-marcelo-d2'&&p.editionId==='2025')!;
 const joao=ps.find(p=>p.artistId==='artist-joao-gomes'&&p.editionId==='2025')!;
 assert.deepEqual([pabllo.date,pabllo.time,pabllo.status],['2025-11-21','22:00','performed']);
 assert.deepEqual([d2.date,d2.time,d2.dateKind,d2.timeKind],['2025-11-21','00:00','program','announced']);
 assert.deepEqual([joao.date,joao.time],['2025-11-22','22:00']);
 assert.equal(ps.find(p=>p.id==='research-base-0133')?.status,'replaced');
 assert.equal(ps.find(p=>p.id==='research-base-0170')?.status,'announced');
 assert.equal(ps.find(p=>p.id==='research-base-0172')?.time,undefined,'fontes de 2025 divergem sobre o horário de Embrazados');
 assert.equal(ps.find(p=>p.id==='research-novo-1990-jards-macale')?.date,undefined,'ano ou data do jornal não vira dia de apresentação');
});

test('revisão rejeita datas impossíveis, ano incorreto, fontes ausentes e duplicações; preserva dados existentes',()=>{
 const p:HistoricalPerformance={id:'x',artistId:'a',editionId:'2025',status:'announced',context:'Anúncio',sourceIds:['s'],time:'23:30',timeKind:'reported',venueId:'v',provenanceIds:['original']};
 const base={historicalPerformances:[p],historicalSources:[{id:'s',title:'Programa',url:'https://example.org',type:'announcement' as const}]};
 const review={performanceId:'x',date:'2025-11-21',dateKind:'program' as const,time:'22:00',timeKind:'announced' as const,sourceIds:['s'],evidence:'Programação conferida'};
 const result=applyHistoricalDates(base,[],[review]).historicalPerformances[0];
 assert.equal(result.status,'announced');assert.equal(result.time,'23:30');assert.equal(result.timeKind,'reported');assert.equal(result.venueId,'v');assert.equal(p.date,undefined);assert.deepEqual(result.provenanceIds,['original']);
 for(const date of ['2025-02-31','2024-11-21','2025-13-01','2025-2-1'])assert.throws(()=>applyHistoricalDates(base,[],[{...review,date}]));
 assert.throws(()=>applyHistoricalDates(base,[],[review,review]));assert.throws(()=>applyHistoricalDates(base,[],[{...review,sourceIds:['missing']}]));assert.throws(()=>applyHistoricalDates(base,[],[{...review,time:'27:80'}]));
});
