import test from 'node:test';
import assert from 'node:assert/strict';
import {historicalPerformances as ps,historicalSources as sources,historicalArtists,festivalEditions} from '../src/data/history.ts';
import {performanceReviews,statusReviewSources} from '../src/data/history-status-reviews.ts';
import {applyHistoryReviews} from '../src/domain/review-history.ts';
import type {HistoricalPerformance,HistoricalSource} from '../src/domain/history.ts';
import {performanceStatus} from '../src/domain/history.ts';
test('João Gomes, Pabllo e demais revisões têm realização documentada e cobertura prioritária sem duplicar o acervo',()=>{
 for(const id of ['artist-joao-gomes','artist-pabllo-vittar']){const p=ps.find(p=>p.artistId===id && p.editionId==='2025')!;assert.equal(p.status,'performed');assert.ok(p.reviewedSourceIds?.length);assert.equal(p.sourceIds[0],p.reviewedSourceIds![0]);}
 for(const review of performanceReviews){const p=ps.find(p=>p.id===review.performanceId)!;assert.equal(p.status,review.status);for(const id of review.sourceIds){assert.ok(p.sourceIds.includes(id));assert.ok(sources.some(s=>s.id===id));}}
 assert.equal(ps.length,230);assert.equal(new Set(ps.map(p=>p.id)).size,230);assert.equal(historicalArtists.length,191);assert.equal(festivalEditions.length,18);
});
test('fonte de programação não vira execução por ser antiga; substituição de Itamar permanece distinta',()=>{
 assert.equal(ps.find(p=>p.id==='review-2025-baggios')?.status,'announced');assert.equal(ps.find(p=>p.id==='research-base-0133')?.status,'replaced');assert.match(ps.find(p=>p.id==='research-base-0133')!.context,/Socorro Acioli/);assert.equal(performanceStatus('announced'),'Registro de programação');assert.ok(!ps.some(p=>p.editionId==='2026'));
});
test('revisão preserva horários anunciados, referência geográfica, identificadores e pesquisa recebida',()=>{
 const p:HistoricalPerformance={id:'x',artistId:'a',editionId:'2025',status:'announced',context:'programado',time:'23:00',timeKind:'announced',venueId:'v',sourceIds:['schedule'],provenanceIds:['original'],uncertainty:'Palco de referência aproximada.'};
 const coverage:HistoricalSource={id:'coverage',title:'Cobertura',url:'https://example.org/coverage',type:'coverage'};
 const base={festivalEditions:[],historicalSources:[{...coverage,id:'schedule',type:'announcement' as const}],historicalPerformances:[p]};
 const result=applyHistoryReviews(base,[coverage],[{performanceId:'x',status:'performed',sourceIds:['coverage'],evidence:'A cobertura documenta o show.'}]);
 assert.equal(p.status,'announced');assert.deepEqual(p.sourceIds,['schedule']);const updated=result.historicalPerformances[0];assert.equal(updated.time,'23:00');assert.equal(updated.timeKind,'announced');assert.equal(updated.venueId,'v');assert.equal(updated.uncertainty,p.uncertainty);assert.deepEqual(updated.provenanceIds,['original']);
 assert.throws(()=>applyHistoryReviews(base,[coverage],[{performanceId:'missing',status:'performed',sourceIds:['coverage'],evidence:'x'}]));assert.throws(()=>applyHistoryReviews(base,[],[{performanceId:'x',status:'performed',sourceIds:['missing'],evidence:'x'}]));
});
