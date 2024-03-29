import { FunctionComponent, useEffect, useState } from "react";

type ContextMenuOption = {value: string, href: string};

interface ContextMenuProps {
  trigger: React.RefObject<HTMLVideoElement>;
  options: Array<ContextMenuOption> | Array<Array<ContextMenuOption>>;
}
 
const ContextMenu: FunctionComponent<ContextMenuProps> = props => {
  const [isActive, setIsActive] = useState(false);
  const [menuPosition, setMenuPosition] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    props.trigger.current?.addEventListener('contextmenu', ev => {
      setMenuPosition([ev.pageY , ev.pageX]);
      setIsActive(prev => !prev);
      ev.preventDefault();
    });

    props.trigger.current?.addEventListener('click', ev => {
      setIsActive(false);
    });
  }, [isActive, props.trigger]);
  
  return (<menu className={`context-menu ${isActive ? "active" : ""}`} style={{top: `calc(${menuPosition[0]}px - 5.95vh)`, left: menuPosition[1]}}>
    {props.options.map(el => { 
      if (!Array.isArray(el)) return <li><a {...el}>{el.value}</a></li>;

      return <li><menu>{el.map(el => <li><a {...el}>{el.value}</a></li>)}</menu></li>;
    })}
  </menu>); 
}
 
export default ContextMenu;
