import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Map, { AttributionControl, Layer, Marker, NavigationControl, Source } from 'react-map-gl/maplibre';
import type { MapRef } from 'react-map-gl/maplibre';
import * as maplibre from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import PlaceSymbol, { placeKind } from '../components/PlaceSymbol';
import type { Place } from '../domain/catalog';
import { layoutMapPlaces } from '../domain/catalog';
import 'maplibre-gl/dist/maplibre-gl.css';

maplibre.setWorkerUrl(workerUrl);
interface Props {
  places: Place[]; selected?: Place; onSelect: (id: string) => void;
  position: { lat: number; lng: number; accuracy: number } | null;
}
const key = import.meta.env.VITE_MAPTILER_KEY;
export default function MapView({ places, selected, onSelect, position }: Props) {
  const ref = useRef<MapRef>(null);
  const [ready,setReady] = useState(false);
  const [zoom,setZoom] = useState(16.5);
  const [pitch,setPitch] = useState(0);
  const [tilesFailed,setTilesFailed] = useState(false);
  const pins = useMemo(() => layoutMapPlaces(places,zoom),[places,zoom]);
  const pinScale = Math.max(.55,Math.min(1,(zoom-10)/6.5));
  const circle = useMemo(() => {
    if(!position) return null;
    const ring = Array.from({length:65},(_,i)=>{
      const angle = i/64*Math.PI*2;
      return [position.lng+Math.cos(angle)*position.accuracy/(111320*Math.cos(position.lat*Math.PI/180)),position.lat+Math.sin(angle)*position.accuracy/111320];
    });
    return {type:'Feature' as const,properties:{},geometry:{type:'Polygon' as const,coordinates:[ring]}};
  },[position]);
  const fitAll = useCallback(() => {
    const map=ref.current;
    const points=places.flatMap(p=>p.coordinates?[p.coordinates]:[]);
    if(!map || !points.length) return;
    map.fitBounds([[Math.min(...points.map(p=>p[1])),Math.min(...points.map(p=>p[0]))],[Math.max(...points.map(p=>p[1])),Math.max(...points.map(p=>p[0]))]],{padding:90,maxZoom:17,duration:0,bearing:0,pitch:0});
  },[places]);
  const focus = useCallback(() => {
    if(!ref.current) return;
    if(selected?.coordinates) ref.current.jumpTo({center:[selected.coordinates[1],selected.coordinates[0]],zoom:17,bearing:0,pitch:0});
    else if(position) ref.current.jumpTo({center:[position.lng,position.lat],zoom:16,bearing:0,pitch:0});
    else if(places.length<20) fitAll();
    else ref.current.jumpTo({center:[-37.2058,-11.014],zoom:16.5,bearing:0,pitch:0});
  },[selected,position,places,fitAll]);
  useEffect(()=>{if(ready) focus();},[ready,focus]);
  useEffect(()=>{
    const map=ref.current;
    if(!ready || !map) return;
    const canvas=map.getCanvas();
    let drag:{x:number;y:number;bearing:number;pitch:number}|null=null;
    const end=()=>{drag=null;canvas.classList.remove('is-rotating');};
    const start=(event:MouseEvent)=>{
      if(event.button!==1) return;
      event.preventDefault();event.stopImmediatePropagation();
      map.stop();
      drag={x:event.clientX,y:event.clientY,bearing:map.getBearing(),pitch:map.getPitch()};
      canvas.classList.add('is-rotating');
    };
    const move=(event:MouseEvent)=>{
      if(!drag) return;
      if(!(event.buttons & 4)){end();return;}
      event.preventDefault();
      map.jumpTo({bearing:drag.bearing+(event.clientX-drag.x)*.5,pitch:Math.max(0,Math.min(60,drag.pitch-(event.clientY-drag.y)*.35))});
    };
    canvas.addEventListener('mousedown',start,true);
    window.addEventListener('mousemove',move);
    window.addEventListener('mouseup',end);
    window.addEventListener('blur',end);
    return ()=>{
      end();canvas.removeEventListener('mousedown',start,true);
      window.removeEventListener('mousemove',move);window.removeEventListener('mouseup',end);window.removeEventListener('blur',end);
    };
  },[ready]);
  if(!key) return <div className="empty">O mapa está em configuração. Você pode consultar todos os espaços pela lista.</div>;
  return <>
    <Map ref={ref} mapLib={maplibre} initialViewState={{longitude:-37.2058,latitude:-11.014,zoom:16.5}} mapStyle={`https://api.maptiler.com/maps/streets-v2/style.json?key=${key}`}
      style={{width:'100%',height:'100%'}} minZoom={11} maxZoom={20} maxPitch={60} attributionControl={false} scrollZoom dragRotate pitchWithRotate touchPitch
      onLoad={()=>setReady(true)} onMove={e=>{setZoom(e.viewState.zoom);setPitch(e.viewState.pitch);}} onError={()=>setTilesFailed(true)}
      onResize={()=>{if(ready) focus();}} canvasContextAttributes={{preserveDrawingBuffer:true}}>
      <NavigationControl position="top-left" visualizePitch />
      <AttributionControl position="bottom-right" compact={false} />
      {pins.map(({place,coordinates,offset,displaced})=><Marker key={place.id} longitude={coordinates[1]} latitude={coordinates[0]} offset={offset} anchor="bottom" style={{zIndex:place.id===selected?.id?3:1}}>
        <button style={{transform:`rotate(-45deg) scale(${pinScale})`}} className={`festival-pin ${zoom<15?'is-overview':''} kind-${placeKind(place)} ${place.id===selected?.id?'is-selected':''}`} aria-label={`Abrir ${place.name}`} title={`${place.name}${displaced?' — espaços no mesmo local':''}`} onClick={()=>onSelect(place.id)}>
          <PlaceSymbol place={place} size={22} /><span className="pin-number">{String(place.number).padStart(2,'0')}</span><span className="pin-name">{place.name}</span>
        </button>
        {displaced && <svg className="pin-tether" width="1" height="1" aria-hidden="true"><line x1="0" y1="0" x2={-offset[0]} y2={-offset[1]} stroke="#574b61" strokeWidth="1" strokeDasharray="2 3" /></svg>}
      </Marker>)}
      {ready && circle && <Source id="position-accuracy" type="geojson" data={circle}><Layer id="accuracy-fill" type="fill" paint={{'fill-color':'#176da0','fill-opacity':.12}} /><Layer id="accuracy-border" type="line" paint={{'line-color':'#176da0','line-width':1}} /></Source>}
      {position && <Marker longitude={position.lng} latitude={position.lat}><span className="user-position" role="img" aria-label={`Sua localização aproximada, precisão de ${Math.round(position.accuracy)} metros`} /></Marker>}
    </Map>
    <a className="maptiler-logo" href="https://www.maptiler.com/" target="_blank" rel="noreferrer" aria-label="MapTiler"><img src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler" width="82" height="24" /></a>
    <div className="map-view-controls">
      <button className="map-overview" onClick={fitAll}>Ver todos os espaços</button>
      <button className="map-pitch" aria-pressed={pitch>5} onClick={()=>ref.current?.jumpTo({pitch:pitch>5?0:45})}>{pitch>5?'Vista de cima':'Inclinar mapa'}</button>
    </div>
    {tilesFailed && <div className="map-network" role="status">O fundo do mapa não carregou completamente. Você pode consultar os espaços pela lista.</div>}
  </>;
}
