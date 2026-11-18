import {useEffect,useState} from 'react';
import {readCollection,toggleCollection} from '../domain/collections';
import type {CollectionResult} from '../domain/collections';
export default function useLocalCollection(key:string){
  const load=():CollectionResult=>{try{return readCollection(window.localStorage,key);}catch{return {ok:false,message:'O armazenamento deste navegador não está disponível.'};}};
  const [state,setState]=useState<CollectionResult>(load),[writeError,setWriteError]=useState('');
  useEffect(()=>{const sync=()=>setState(load());const storage=(e:StorageEvent)=>{if(e.key===key || e.key===null)sync();};window.addEventListener('storage',storage);window.addEventListener('vivase:collection',sync);return()=>{window.removeEventListener('storage',storage);window.removeEventListener('vivase:collection',sync);};},[key]);
  function toggle(id:string){let result:CollectionResult;try{result=toggleCollection(window.localStorage,key,id);}catch{result={ok:false,message:'O armazenamento deste navegador não está disponível. Nada foi salvo.'};}if(result.ok){setState(result);setWriteError('');window.dispatchEvent(new Event('vivase:collection'));return true;}setWriteError(result.message);return false;}
  return {ids:state.ok?state.ids:[],error:!state.ok?state.message:writeError,toggle,available:state.ok};
}
