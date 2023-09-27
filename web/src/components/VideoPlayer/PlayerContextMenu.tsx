import { FunctionComponent, useEffect, useState } from "react";

interface PlayerContextMenuProps {
  isActive: boolean;
  target: React.RefObject<HTMLVideoElement>;
}
 
const PlayerContextMenu: FunctionComponent<PlayerContextMenuProps> = props => {
  const [isActive, setIsActive] = useState(false);
  const [menuPosition, setMenuPosition] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    props.target.current?.addEventListener('contextmenu', ev => {
      setMenuPosition([ev.pageY , ev.pageX]);
      setIsActive(true);
      ev.preventDefault();
    });
  }, []);
  
  return (<menu className={`context-menu ${isActive ? "active" : ""}`} style={{top: `calc(${menuPosition[0]}px - 5.95vh)`, left: menuPosition[1]}}>
    <li>Report teaser</li>
  </menu>); 
}
 
export default PlayerContextMenu; 
