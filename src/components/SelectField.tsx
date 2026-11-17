import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
export default function SelectField({label,value,onChange,options}:{label:string;value:string;onChange:(value:string)=>void;options:{value:string;label:string}[]}) {
  return <div className="select-field"><span>{label}</span><Select.Root value={value || 'all'} onValueChange={next=>onChange(next==='all'?'':next)}>
    <Select.Trigger aria-label={label} className="select-trigger"><Select.Value /><Select.Icon><ChevronDown size={18} /></Select.Icon></Select.Trigger>
    <Select.Portal><Select.Content className="select-content" position="popper" sideOffset={6} collisionPadding={12}>
      <Select.ScrollUpButton className="select-scroll"><ChevronUp size={18} /></Select.ScrollUpButton>
      <Select.Viewport>{options.map(option=><Select.Item key={option.value || 'all'} value={option.value || 'all'} className="select-item"><Select.ItemText>{option.label}</Select.ItemText><Select.ItemIndicator><Check size={16} /></Select.ItemIndicator></Select.Item>)}</Select.Viewport>
      <Select.ScrollDownButton className="select-scroll"><ChevronDown size={18} /></Select.ScrollDownButton>
    </Select.Content></Select.Portal>
  </Select.Root></div>;
}
