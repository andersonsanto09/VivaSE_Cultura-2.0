import type {HistoricalPerformance,HistoricalSource} from './history.ts';

export interface HistoricalDateReview {
  performanceId:string;date:string;dateKind:'program'|'civil';time?:string;timeKind?:'announced'|'reported';
  sourceIds:string[];evidence:string;note?:string;uncertainty?:string;
}

/** Add independently checked dates without promoting an announcement to a show. */
export function applyHistoricalDates<T extends {historicalSources:HistoricalSource[];historicalPerformances:HistoricalPerformance[]}>(history:T,sources:HistoricalSource[],reviews:HistoricalDateReview[]):T {
  const sourceMap=new Map(history.historicalSources.map(s=>[s.id,s]));
  for(const source of sources){if(sourceMap.has(source.id))throw new Error(`Fonte de data duplicada: ${source.id}`);sourceMap.set(source.id,source);}
  const reviewMap=new Map<string,HistoricalDateReview>();
  for(const review of reviews){
    const record=history.historicalPerformances.find(p=>p.id===review.performanceId);
    if(!record||reviewMap.has(review.performanceId))throw new Error(`Revisão de data inválida: ${review.performanceId}`);
    if(!/^\d{4}-\d{2}-\d{2}$/.test(review.date)||!Number.isFinite(Date.parse(review.date))||new Date(review.date).toISOString().slice(0,10)!==review.date||review.date.slice(0,4)!==record.editionId)throw new Error(`Data incompatível: ${review.performanceId}`);
    if(record.date&&record.date!==review.date)throw new Error(`Data existente divergente: ${review.performanceId}`);
    if(!['program','civil'].includes(review.dateKind)||!review.sourceIds.length||review.sourceIds.some(id=>!sourceMap.has(id))||!review.evidence.trim())throw new Error(`Evidência de data ausente: ${review.performanceId}`);
    if(review.time&&(!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(review.time)||!review.timeKind))throw new Error(`Horário inválido: ${review.performanceId}`);
    reviewMap.set(review.performanceId,review);
  }
  return {...history,historicalSources:[...sourceMap.values()],historicalPerformances:history.historicalPerformances.map(p=>{
    const review=reviewMap.get(p.id);if(!review)return p;
    return {...p,date:review.date,dateKind:p.dateKind||review.dateKind,...(!p.time&&review.time?{time:review.time,timeKind:review.timeKind}:{}),...(review.uncertainty?{uncertainty:review.uncertainty}:{}),dateSourceIds:review.sourceIds,dateEvidence:review.evidence,dateNote:review.note,sourceIds:[...new Set([...p.sourceIds,...review.sourceIds])]};
  })};
}
