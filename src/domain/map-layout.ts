import type { Place } from './catalog';
export interface ProjectedPlace {place:Place;x:number;y:number}
export interface IndividualPin extends ProjectedPlace {offset:[number,number]}
function distanceMetres(a:Place,b:Place){
  const [lat1,lng1]=a.coordinates!,[lat2,lng2]=b.coordinates!;
  const radians=Math.PI/180;
  const h=Math.sin((lat2-lat1)*radians/2)**2+Math.cos(lat1*radians)*Math.cos(lat2*radians)*Math.sin((lng2-lng1)*radians/2)**2;
  return 6371000*2*Math.atan2(Math.sqrt(h),Math.sqrt(Math.max(0,1-h)));
}
// Only visual offsets change; coordinates always remain the source references.
// Nearby references receive a small radial layout only when their icons collide.
// A bounded screen-space adjustment resolves remaining collisions; anything left
// is exposed by the neighbour picker rather than hidden or moved kilometres away.
export function layoutIndividualPins(points:ProjectedPlace[],scale=1):IndividualPin[]{
  const groups:ProjectedPlace[][]=[];
  for(const point of points){
    const group=groups.find(members=>members.every(other=>distanceMetres(point.place,other.place)<=15));
    if(group)group.push(point);else groups.push([point]);
  }
  const initial=new Map<string,[number,number]>();
  const spacing=50*scale;
  for(const group of groups){
    const overlaps=group.some((a,i)=>group.some((b,j)=>i!==j && Math.hypot(a.x-b.x,a.y-b.y)<spacing));
    const radius=Math.min(64,group.length===2?28:Math.max(32,group.length*52/(Math.PI*2)));
    group.forEach((point,index)=>{
      const angle=-Math.PI/2+index/group.length*Math.PI*2;
      initial.set(point.place.id,overlaps?[Math.cos(angle)*radius*scale,Math.sin(angle)*radius*scale]:[0,0]);
    });
  }
  const placed:IndividualPin[]=[];
  for(const point of points){
    let offset=initial.get(point.place.id)!;
    const free=([dx,dy]:[number,number])=>placed.every(other=>Math.hypot(point.x+dx-other.x-other.offset[0],point.y+dy-other.y-other.offset[1])>=spacing);
    if(!free(offset)){
      search:for(let ring=1;ring<=6;ring++)for(let i=0;i<24;i++){
        const angle=-Math.PI/2+i/24*Math.PI*2;
        const candidate:[number,number]=[Math.cos(angle)*ring*12*scale,Math.sin(angle)*ring*12*scale];
        if(free(candidate)){offset=candidate;break search;}
      }
    }
    placed.push({...point,offset});
  }
  return placed;
}
export function overlappingNeighbours(pins:IndividualPin[],pin:IndividualPin,scale=1):IndividualPin[]{
  return pins.filter(other=>Math.hypot(pin.x+pin.offset[0]-other.x-other.offset[0],pin.y+pin.offset[1]-other.y-other.offset[1])<49*scale);
}
