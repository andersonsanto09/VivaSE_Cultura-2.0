import type { Place } from './catalog';
export interface ProjectedPlace {place:Place;x:number;y:number}
export interface IndividualPin extends ProjectedPlace {offset:[number,number]}
function distanceMetres(a:Place,b:Place){
  const [lat1,lng1]=a.coordinates!,[lat2,lng2]=b.coordinates!;
  const radians=Math.PI/180;
  const h=Math.sin((lat2-lat1)*radians/2)**2+Math.cos(lat1*radians)*Math.cos(lat2*radians)*Math.sin((lng2-lng1)*radians/2)**2;
  return 6371000*2*Math.atan2(Math.sqrt(h),Math.sqrt(Math.max(0,1-h)));
}
// Layout depends only on source references, never on zoom or projected distances.
// Shared references keep a fixed small radial offset; other visual collisions are
// handled by the neighbour picker instead of continuously moving the pins.
export function layoutIndividualPins(points:ProjectedPlace[]):IndividualPin[]{
  const groups:ProjectedPlace[][]=[];
  for(const point of points){
    const group=groups.find(members=>members.every(other=>distanceMetres(point.place,other.place)<=15));
    if(group)group.push(point);else groups.push([point]);
  }
  const offsets=new Map<string,[number,number]>();
  for(const group of groups){
    const radius=Math.min(64,group.length===2?28:Math.max(36,group.length*54/(Math.PI*2)));
    group.forEach((point,index)=>{
      const angle=-Math.PI/2+index/group.length*Math.PI*2;
      offsets.set(point.place.id,group.length>1?[Math.cos(angle)*radius,Math.sin(angle)*radius]:[0,0]);
    });
  }
  return points.map(point=>({...point,offset:offsets.get(point.place.id)!}));
}
// Screen separation must not turn into kilometres of false displacement when
// zooming out. Scale continuously below the historical-centre reference zoom;
// cap at 1 above it so close-up pins do not spread farther across the screen.
export function pinOffsetAtZoom(offset:[number,number],zoom:number):[number,number]{
  const factor=Math.min(1,2**(zoom-16.5));
  return [offset[0]*factor,offset[1]*factor];
}
export function overlappingNeighbours(pins:IndividualPin[],pin:IndividualPin,scale=1):IndividualPin[]{
  return pins.filter(other=>Math.hypot(pin.x+pin.offset[0]-other.x-other.offset[0],pin.y+pin.offset[1]-other.y-other.offset[1])<49*scale);
}
