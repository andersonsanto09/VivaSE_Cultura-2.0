export const PLANNER_KEY='vivase:planner:v1';
export const VISITS_KEY='vivase:visits:v1';
type Store=Pick<Storage,'getItem'|'setItem'>;
export type CollectionResult={ok:true;ids:string[]}|{ok:false;message:string};
const valid=(ids:unknown):ids is string[]=>Array.isArray(ids) && ids.length<=500 && ids.every(id=>typeof id==='string' && id.length>0 && id.length<=120) && new Set(ids).size===ids.length;
export function readCollection(store:Store,key:string):CollectionResult{
  try{const raw=store.getItem(key);if(raw===null)return {ok:true,ids:[]};const data=JSON.parse(raw);return data?.version===1 && valid(data.ids)?{ok:true,ids:data.ids}:{ok:false,message:'Os dados pessoais deste navegador não foram reconhecidos. Eles foram preservados.'};}
  catch{return {ok:false,message:'Não foi possível ler os dados pessoais deste navegador. Nada foi alterado.'};}
}
export function toggleCollection(store:Store,key:string,id:string):CollectionResult{
  const current=readCollection(store,key);if(!current.ok)return current;
  const ids=current.ids.includes(id)?current.ids.filter(x=>x!==id):[...current.ids,id];
  if(!valid(ids))return {ok:false,message:'Não foi possível incluir este item. O limite é de 500 itens.'};
  try{store.setItem(key,JSON.stringify({version:1,ids}));return {ok:true,ids};}
  catch{return {ok:false,message:'Não foi possível salvar: o armazenamento pode estar bloqueado ou cheio. A seleção anterior foi preservada.'};}
}
