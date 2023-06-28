import "./style.scss";
import { useCallback, useState, useMemo, useRef, useEffect } from "react";

interface Coords {
  x: number;
  y: number;
}

export default function PosterCropPopup(): JSX.Element {
  const [isPosterRatioNormal, setIsPosterRatioNormal] = useState(true);
  const cropArea = useRef<HTMLDivElement  | null>(null);
  const imageCanvas = useRef<HTMLCanvasElement |null>(null);

  const [cropAreaPos, setCropAreaPos] = useState<Coords | null>(null);

  const submitClickHandler = useCallback(() => {}, []);

  const cropAreaSelectorDragHandler = useCallback((ev:  React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const shiftX  = ev.clientX - Number(cropArea.current?.getBoundingClientRect().left);
    const shiftY = ev.clientY -  Number(cropArea.current?.getBoundingClientRect().top);
    
    console.log(shiftY, ev.pageY);
        
    function onMouseMove(event: MouseEvent) {
      
      console.log(shiftY, event.pageY );
      
        setCropAreaPos({x: event.pageX - shiftX, y: event.pageY - shiftY});
        
      }

      document.addEventListener('mousemove', onMouseMove);

      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', onMouseMove);
      });
      ev.preventDefault();
    }, []);
  const cropAreaResizeHandler = useCallback(() => {}, [])
  

  return (
    <div className="poster-crop-popup">
      <div className="crop-editor">
        <div id="current-image">
          <canvas ref={imageCanvas}/>
        </div>
        <div id="crop-chooser"  style={null === cropAreaPos ? {} : {left: cropAreaPos.x, top: cropAreaPos.y - 59.0625} } ref={cropArea}>
          <div id="move-crop-chooser" onMouseDown={cropAreaSelectorDragHandler} draggable="true"></div>
        </div>
      </div>
      <div className="control-panel">
        <input type="button" id="submit" value="Submit" onClick={submitClickHandler}/>
        <ul className="select-ratio">
          <label id="normal-width">
            <span>2:3</span>
            <input type="radio" name="poster-ratio" checked={true}/>
          </label>
          <label id="double-width">
            <span>4:3</span>
            <input type="radio" name="poster-ratio" />
          </label>
        </ul>
      </div>
    </div>
  );
}
