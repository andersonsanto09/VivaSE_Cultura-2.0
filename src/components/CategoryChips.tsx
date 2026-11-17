import { Music2, Drama, Palette, Store, Footprints } from 'lucide-react';
import type { Category } from '../domain/catalog';
export const categoryItems:{name:Category;tone:string;icon:typeof Music2}[]=[
  {name:'Música',tone:'music',icon:Music2},
  {name:'Artes cênicas',tone:'stage',icon:Drama},
  {name:'Cultura e formação',tone:'culture',icon:Palette},
  {name:'Feiras e experiências',tone:'experiences',icon:Store},
  {name:'Cortejos',tone:'walk',icon:Footprints},
];
export const categoryTone=(category:Category)=>categoryItems.find(item=>item.name===category)!.tone;
export default function CategoryChips({value,onChange}:{value:string;onChange:(value:string)=>void}) {
  return <div className="category-chips" role="group" aria-label="Filtrar por categoria">
    <button aria-label="Filtrar Todos" aria-pressed={value==='Todos'} onClick={()=>onChange('Todos')}>Todos</button>
    {categoryItems.map(({name,tone,icon:Symbol})=><button key={name} className={`tone-${tone}`} aria-label={`Filtrar ${name}`} aria-pressed={value===name} onClick={()=>onChange(name)}><span className="category-dot"><Symbol size={15} aria-hidden="true" /></span>{name}</button>)}
  </div>;
}
