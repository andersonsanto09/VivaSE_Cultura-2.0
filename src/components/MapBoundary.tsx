import {Component} from 'react';
import type {ReactNode} from 'react';
export default class MapBoundary extends Component<{children:ReactNode},{failed:boolean}> {
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  render(){return this.state.failed?<div className="empty" role="status">Não foi possível abrir o mapa. Os espaços continuam disponíveis pela lista.</div>:this.props.children;}
}
