import type {FestivalEdition,HistoricalPerformance,HistoricalSource} from './history.ts';

export interface PerformanceReview {
  performanceId:string;
  status:'performed'|'replaced';
  sourceIds:string[];
  evidence:string;
}

/** Apply checked evidence without modifying the received research or record IDs. */
export function applyHistoryReviews<T extends {historicalSources:HistoricalSource[];historicalPerformances:HistoricalPerformance[];festivalEditions:FestivalEdition[]}>(history:T,sources:HistoricalSource[],reviews:PerformanceReview[]):T {
  const sourceMap=new Map(history.historicalSources.map(s=>[s.id,s]));
  for(const source of sources){
    if(sourceMap.has(source.id))throw new Error(`Fonte de revisão duplicada: ${source.id}`);
    sourceMap.set(source.id,source);
  }
  const reviewMap=new Map<string,PerformanceReview>();
  for(const review of reviews){
    if(reviewMap.has(review.performanceId))throw new Error(`Revisão duplicada: ${review.performanceId}`);
    if(!history.historicalPerformances.some(p=>p.id===review.performanceId))throw new Error(`Participação não encontrada: ${review.performanceId}`);
    if(!review.sourceIds.length || review.sourceIds.some(id=>!sourceMap.has(id)))throw new Error(`Fonte ausente na revisão: ${review.performanceId}`);
    reviewMap.set(review.performanceId,review);
  }
  const editionProof=new Map<string,string[]>();
  for(const review of reviews){const p=history.historicalPerformances.find(p=>p.id===review.performanceId)!;if(review.status==='performed')editionProof.set(p.editionId,[...new Set([...(editionProof.get(p.editionId) || []),...review.sourceIds])]);}
  return {...history,festivalEditions:history.festivalEditions.map(e=>editionProof.has(e.id)?{...e,coverage:'Acervo parcial com participações documentadas em coberturas ou retrospectivas. Registros de programação e substituições são identificados individualmente.',sourceIds:[...new Set([...e.sourceIds,...editionProof.get(e.id)!])]}:e),historicalSources:[...sourceMap.values()],historicalPerformances:history.historicalPerformances.map(p=>{
    const review=reviewMap.get(p.id);if(!review)return p;
    // Announced times stay announced even when subsequent coverage confirms the show.
    const uncertainty=p.uncertainty?.replace(/Conferência individual desta referência recebida ainda pendente\.?/g,'').trim() || undefined;
    return {...p,status:review.status,context:review.evidence,uncertainty,sourceIds:[...new Set([...review.sourceIds,...p.sourceIds])],reviewedSourceIds:review.sourceIds};
  })};
}
