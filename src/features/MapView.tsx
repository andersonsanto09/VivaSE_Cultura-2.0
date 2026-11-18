import { useCallback, useEffect, useMemo, useRef, useId, useState } from 'react';
import Map, { AttributionControl, Layer, Marker, NavigationControl, Popup, Source } from 'react-map-gl/maplibre';
import type { MapRef } from 'react-map-gl/maplibre';
import * as maplibre from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import PlaceSymbol, { placeKind } from '../components/PlaceSymbol';
import type { Place } from '../domain/catalog';
import { layoutIndividualPins, overlappingNeighbours, pinOffsetAtZoom } from '../domain/map-layout';
import { categoryTone, categoryItems } from '../components/CategoryChips';
import { ScanLine, Layers, Compass } from 'lucide-react';
import 'maplibre-gl/dist/maplibre-gl.css';

maplibre.setWorkerUrl(workerUrl);
interface Props {
  places: Place[]; selected?: Place; onSelect: (id: string) => void;
  position: { lat: number; lng: number; accuracy: number } | null;
  preserveCamera?:boolean;
}
const key = import.meta.env.VITE_MAPTILER_KEY;
export default function MapView({ places, selected, onSelect, position, preserveCamera=false }: Props) {
  const ref = useRef<MapRef>(null);
  const [ready,setReady] = useState(false);
  const [zoom,setZoom] = useState(16.5);
  const [pitch,setPitch] = useState(0);
  const [tilesFailed,setTilesFailed] = useState(false);
  const [legendOpen,setLegendOpen]=useState(false);
  const legendId=useId();
  const legendButton=useRef<HTMLButtonElement>(null);
  const lastSize=useRef({width:0,height:0});
  const cameraInitialized=useRef(false);
  const previousSelection=useRef(selected?.id);
  const nativeMarkers=useRef(new globalThis.Map<string,maplibre.Marker>());
  const [picker,setPicker]=useState<{ids:string[];coordinates:[number,number]}|null>(null);
  const lastPin=useRef<HTMLButtonElement|null>(null);
  const pinScale=Math.max(.55,Math.min(1,(zoom-10)/6.5));
  const pins=useMemo(()=>ready?layoutIndividualPins(places.flatMap(place=>place.coordinates?[{place,x:0,y:0}]:[])):[],[places,ready]);
  const displayPins=useMemo(()=>pins.map(pin=>({...pin,offset:pinOffsetAtZoom(pin.offset,zoom)})),[pins,zoom]);
  useEffect(()=>{
    if(!legendOpen)return;
    legendButton.current?.focus({preventScroll:true});
    const close=(event:KeyboardEvent)=>{if(event.key==='Escape'){setLegendOpen(false);legendButton.current?.focus({preventScroll:true});}};
    window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close);
  },[legendOpen]);
  const closePicker=useCallback(()=>{setPicker(null);lastPin.current?.focus({preventScroll:true});},[]);
  useEffect(()=>{if(!picker)return;const close=(event:KeyboardEvent)=>{if(event.key==='Escape')closePicker();};window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close);},[picker,closePicker]);
  useEffect(()=>{setPicker(null);setLegendOpen(false);},[places,selected]);
  function hideBasePOI(){
    const map=ref.current;if(!map)return;
    for(const layer of map.getStyle().layers) if(layer.type==='symbol' && 'source-layer' in layer && layer['source-layer']==='poi') map.getMap().setLayoutProperty(layer.id,'visibility','none');
  }
  const circle = useMemo(() => {
    if(!position) return null;
    const ring = Array.from({length:65},(_,i)=>{
      const angle = i/64*Math.PI*2;
      return [position.lng+Math.cos(angle)*position.accuracy/(111320*Math.cos(position.lat*Math.PI/180)),position.lat+Math.sin(angle)*position.accuracy/111320];
    });
    return {type:'Feature' as const,properties:{},geometry:{type:'Polygon' as const,coordinates:[ring]}};
  },[position]);
  const fitPlaces = useCallback((includeBica:boolean) => {
    const map=ref.current;
    const points=places.filter(p=>includeBica || !/(?:^|-)bica$/.test(p.id)).flatMap(p=>p.coordinates?[p.coordinates]:[]);
    if(!map || !points.length) return;
    map.fitBounds([[Math.min(...points.map(p=>p[1])),Math.min(...points.map(p=>p[0]))],[Math.max(...points.map(p=>p[1])),Math.max(...points.map(p=>p[0]))]],{padding:{top:Math.min(160,map.getContainer().clientHeight*.3),bottom:Math.min(220,map.getContainer().clientHeight*.36),left:Math.min(78,map.getContainer().clientWidth*.18),right:Math.min(78,map.getContainer().clientWidth*.18)},maxZoom:includeBica?17:16.5,duration:0,bearing:0,pitch:0});
  },[places]);
  const focus = useCallback(() => {
    if(!ref.current || !ref.current.getContainer().clientWidth || !ref.current.getContainer().clientHeight) return;
    if(selected?.coordinates) ref.current.jumpTo({center:[selected.coordinates[1],selected.coordinates[0]],zoom:17,bearing:0,pitch:0});
    else if(position) ref.current.jumpTo({center:[position.lng,position.lat],zoom:16,bearing:0,pitch:0});
    else if(places.length===1 || places.every(p=>p.id==='bica')) fitPlaces(true);
    else fitPlaces(false);
  },[selected,position,places,fitPlaces]);
  useEffect(()=>{if(ready && (!preserveCamera || !cameraInitialized.current)){focus();cameraInitialized.current=true;}},[ready,focus,preserveCamera]);
  useEffect(()=>{
    if(ready && preserveCamera && selected?.id && previousSelection.current!==selected.id)focus();
    previousSelection.current=selected?.id;
  },[ready,preserveCamera,selected?.id,focus]);
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
      onLoad={()=>{const container=ref.current?.getContainer();if(!container)return;hideBasePOI();lastSize.current={width:container.clientWidth,height:container.clientHeight};setReady(true);}} onMove={e=>{
        // Update native markers in the same MapLibre event as the camera. React
        // may defer decorative updates under load; geographic alignment cannot.
        for(const pin of pins){
          const marker=nativeMarkers.current.get(pin.place.id);if(!marker)continue;
          const offset=pinOffsetAtZoom(pin.offset,e.viewState.zoom);marker.setOffset(offset);
          const tether=marker.getElement().querySelector('.pin-tether line');
          tether?.setAttribute('x2',String(-offset[0]));tether?.setAttribute('y2',String(-offset[1]));
          const anchor=marker.getElement().querySelector('.pin-tether circle');
          anchor?.setAttribute('cx',String(-offset[0]));anchor?.setAttribute('cy',String(-offset[1]));
        }
        setZoom(e.viewState.zoom);setPitch(e.viewState.pitch);
      }} onError={()=>setTilesFailed(true)}
      onResize={()=>{const container=ref.current?.getContainer();if(!container)return;const wasHidden=!lastSize.current.width || !lastSize.current.height;lastSize.current={width:container.clientWidth,height:container.clientHeight};if(ready && wasHidden)focus();}} canvasContextAttributes={{preserveDrawingBuffer:true}}>
      <NavigationControl position="top-left" visualizePitch />
      <AttributionControl position="bottom-right" compact={false} />
      {displayPins.map(pin=>{
        const {place,offset}=pin;
        const [lat,lng]=place.coordinates!;
        const approximate=place.locationKind!=='equipment' || place.id==='bica';
        return <Marker key={place.id} ref={marker=>{if(marker)nativeMarkers.current.set(place.id,marker);else nativeMarkers.current.delete(place.id);}} longitude={lng} latitude={lat} offset={offset} anchor="bottom" style={{zIndex:place.id===selected?.id?3:1,pointerEvents:'none'}}>
          <button style={{transform:`rotate(-45deg) scale(${pinScale})`,pointerEvents:'auto'}} className={`festival-pin tone-${categoryTone(place.category)} kind-${placeKind(place)} ${approximate?'is-approximate':''} ${place.id===selected?.id?'is-selected':''}`} aria-label={`Abrir ${place.name}`} title={`${place.name}${approximate?' — referência aproximada':''}`} onClick={event=>{
            lastPin.current=event.currentTarget;
            setLegendOpen(false);
            const projected=displayPins.map(item=>{const point=ref.current!.project([item.place.coordinates![1],item.place.coordinates![0]]);return {...item,x:point.x,y:point.y};});
            const neighbours=overlappingNeighbours(projected,projected.find(item=>item.place.id===place.id)!,pinScale);
            if(neighbours.length>1)setPicker({ids:neighbours.map(p=>p.place.id),coordinates:[lng,lat]});
            else {setPicker(null);onSelect(place.id);}
          }}>
            <PlaceSymbol place={place} size={18} />{place.id===selected?.id && place.number!==undefined && <span className="pin-number">{String(place.number).padStart(2,'0')}</span>}<span className="pin-name">{place.name}</span>
          </button>
          {Math.hypot(...offset)>1 && <svg className="pin-tether" width="1" height="1" aria-hidden="true"><line x1="0" y1="0" x2={-offset[0]} y2={-offset[1]} stroke="#574b61" strokeWidth="1" strokeDasharray="2 3" /><circle cx={-offset[0]} cy={-offset[1]} r="2" fill="#574b61" /></svg>}
        </Marker>;
      })}
      {picker && <Popup longitude={picker.coordinates[0]} latitude={picker.coordinates[1]} onClose={closePicker} closeOnClick={false} maxWidth="290px" focusAfterOpen>
        <section className="nearby-picker" aria-label="Espaços próximos"><h3>{picker.ids.length} espaços aqui</h3><p>Escolha um espaço nesta referência.</p>{picker.ids.map(id=>{
          const place=places.find(p=>p.id===id);if(!place)return null;
          return <button key={id} onClick={()=>{setPicker(null);onSelect(id);}}><span className={`picker-symbol tone-${categoryTone(place.category)}`}><PlaceSymbol place={place} size={18} /></span><span>{place.name}</span></button>;
        })}</section>
      </Popup>}
      {ready && circle && <Source id="position-accuracy" type="geojson" data={circle}><Layer id="accuracy-fill" type="fill" paint={{'fill-color':'#176da0','fill-opacity':.12}} /><Layer id="accuracy-border" type="line" paint={{'line-color':'#176da0','line-width':1}} /></Source>}
      {position && <Marker longitude={position.lng} latitude={position.lat}><span className="user-position" role="img" aria-label={`Sua localização aproximada, precisão de ${Math.round(position.accuracy)} metros`} /></Marker>}
    </Map>
    <a className="maptiler-logo" href="https://www.maptiler.com/" target="_blank" rel="noreferrer" aria-label="MapTiler"><img src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler" width="82" height="24" /></a>
    <div className="map-view-controls">
      <button className="map-overview" aria-label="Ver todos os espaços" onClick={()=>{setPicker(null);fitPlaces(true);}}><ScanLine size={16} aria-hidden="true" />Ver todos</button>
      <button className="map-pitch" aria-pressed={pitch>5} onClick={()=>ref.current?.jumpTo({pitch:pitch>5?0:45})}><Compass size={16} aria-hidden="true" />{pitch>5?'Vista de cima':'Inclinar mapa'}</button>
      <button ref={legendButton} className="map-legend-trigger" aria-expanded={legendOpen} aria-controls={legendId} onClick={()=>{setPicker(null);setLegendOpen(value=>!value);}}><Layers size={16} aria-hidden="true" />Legenda</button>
    </div>
    {legendOpen && <section id={legendId} className="map-legend-panel" aria-label="Legenda do mapa"><h3>Explore por categoria</h3>{categoryItems.map(({name,tone,icon:Symbol})=><div className="legend-row" key={name}><span className={`category-dot tone-${tone}`}><Symbol size={15} aria-hidden="true" /></span>{name}</div>)}<p><span className="precision-swatch" />Tracejado: referência aproximada.<br />Os traços ligam o pin ao ponto original.</p></section>}
    {tilesFailed && <div className="map-network" role="status">O fundo do mapa não carregou completamente. Você pode consultar os espaços pela lista.</div>}
  </>;
}
