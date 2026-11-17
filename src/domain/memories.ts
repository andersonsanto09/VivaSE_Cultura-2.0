export const MEMORY_KEY = 'vivase:memories:v1';
export const MEMORY_TEXT_LIMIT = 1200;
export const MEMORY_LIMIT = 100;
export interface PersonalMemory {
  id: string;
  text: string;
  author: string;
  year: number;
  placeId: string;
  createdAt: string;
}
export type MemoryResult = {ok:true; memories:PersonalMemory[]} | {ok:false; message:string};
type LocalStore = Pick<Storage, 'getItem' | 'setItem'>;
export function validMemory(value:unknown):value is PersonalMemory {
  if(!value || typeof value!=='object') return false;
  const m=value as PersonalMemory;
  return typeof m.id==='string' && m.id.length>0 && m.id.length<=100 &&
    typeof m.text==='string' && !!m.text.trim() && m.text.length<=MEMORY_TEXT_LIMIT &&
    typeof m.author==='string' && m.author.length<=60 &&
    Number.isInteger(m.year) && m.year>=1972 && m.year<=new Date().getFullYear() &&
    typeof m.placeId==='string' && m.placeId.length<=80 &&
    typeof m.createdAt==='string' && Number.isFinite(Date.parse(m.createdAt));
}
export function readMemories(store:LocalStore):MemoryResult {
  try {
    const raw=store.getItem(MEMORY_KEY);
    if(raw===null) return {ok:true,memories:[]};
    const data=JSON.parse(raw);
    if(data?.version!==1 || !Array.isArray(data.memories) || data.memories.length>MEMORY_LIMIT || !data.memories.every(validMemory) || new Set(data.memories.map((m:PersonalMemory)=>m.id)).size!==data.memories.length)
      return {ok:false,message:'Os dados locais não puderam ser reconhecidos. Eles não foram alterados. Confira as configurações do navegador e tente novamente.'};
    return {ok:true,memories:data.memories};
  } catch {
    return {ok:false,message:'Não foi possível ler as lembranças deste navegador. Os dados existentes não foram alterados.'};
  }
}
function writeMemories(store:LocalStore,memories:PersonalMemory[]):MemoryResult {
  try {
    // Only these fields are persisted. Device position and other browser data
    // never enter the memory payload, including when imported data has extras.
    const safe=memories.map(({id,text,author,year,placeId,createdAt})=>({id,text,author,year,placeId,createdAt}));
    store.setItem(MEMORY_KEY,JSON.stringify({version:1,memories:safe}));
    return {ok:true,memories:safe};
  } catch {
    return {ok:false,message:'Não foi possível gravar a alteração: o armazenamento pode estar bloqueado ou cheio. Nada foi alterado.'};
  }
}
export function saveMemory(store:LocalStore,memory:PersonalMemory):MemoryResult {
  if(!validMemory(memory))return {ok:false,message:`Confira a lembrança: escreva de 1 a ${MEMORY_TEXT_LIMIT} caracteres e informe um ano válido.`};
  const current=readMemories(store);
  if(!current.ok)return current;
  if(current.memories.length>=MEMORY_LIMIT)return {ok:false,message:'Este navegador já guarda 100 lembranças. Exclua uma lembrança antes de adicionar outra.'};
  if(current.memories.some(m=>m.id===memory.id))return {ok:false,message:'Esta lembrança já está salva. Recarregue a página antes de tentar novamente.'};
  return writeMemories(store,[memory,...current.memories]);
}
export function deleteMemory(store:LocalStore,id:string):MemoryResult {
  const current=readMemories(store);
  if(!current.ok)return current;
  return writeMemories(store,current.memories.filter(m=>m.id!==id));
}
