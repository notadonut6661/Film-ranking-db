import "./style.scss";
import { useCallback, useState, useMemo, useRef, useEffect } from "react";
import { CheckCollision } from './CheckCollision';
import { CollideableObjectsRelationship } from "data/Interfaces/CollideableObjectsRelationship.enum";

interface Coords {
  x?: number;
  y?: number;
  height?: number; 
  width?: number;
}

export default function PosterCropPopup(): JSX.Element {
  const [isPosterRatioNormal, setIsPosterRatioNormal] = useState<boolean>(true);
  const cropArea = useRef<HTMLDivElement | null>(null);
  const imageCanvas = useRef<HTMLCanvasElement | null>(null);

  const [cropAreaPos, setCropAreaPos] = useState<Coords>({});

  const submitClickHandler = useCallback(() => {}, []);

  useEffect(() => {
    setCropAreaPos(() => {
      return {
        height: cropArea.current?.getBoundingClientRect().height,
        width: cropArea.current?.getBoundingClientRect().width,
        x: cropArea.current?.getBoundingClientRect().x,
        y: cropArea.current?.getBoundingClientRect().y
      }
    })
  }, []);
  
  const cropAreaSelectorDragHandler = useCallback((ev:  React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const shiftX  = ev.clientX - Number(cropArea.current?.getBoundingClientRect().left);
    const shiftY = ev.clientY -  Number(cropArea.current?.getBoundingClientRect().top);
    
    console.log(shiftY, ev.pageY);
    
    function onMouseMove(event: MouseEvent) {
      if (cropArea.current === null || imageCanvas.current === null) return;

      const newCropAreaPosition: Readonly<DOMRect> = {
        ...cropArea.current.getBoundingClientRect(), 
        top: event.pageY - shiftY,
        bottom: event.pageY  - shiftY + Number(cropArea.current?.getBoundingClientRect().height),
        left: event.pageX - shiftX,
        right: event.pageX - shiftX + Number(cropArea.current?.getBoundingClientRect().width)
      }
      
      const canMove = CheckCollision(newCropAreaPosition, imageCanvas.current?.getBoundingClientRect(), CollideableObjectsRelationship.FirstInsideSecond);

      if (canMove.top && canMove.bottom) {
        console.log(canMove)
        setCropAreaPos(prev => {return {...prev, y: newCropAreaPosition.top}});
      } else if (!canMove.top) {
       setCropAreaPos(prev => {return {...prev, y: Number(imageCanvas.current?.getBoundingClientRect().top)}});
      }  else if (!canMove.bottom) {
         setCropAreaPos(prev => {return {...prev, y: Number(imageCanvas.current?.getBoundingClientRect().bottom) - Number(cropArea.current?.getBoundingClientRect().height)}});
       };
      
      if(canMove.left && canMove.right) {
        setCropAreaPos(prev => {return {...prev, x: newCropAreaPosition.left}});
      } else if (!canMove.left) {
        setCropAreaPos(prev => {return {...prev, x: Number(imageCanvas.current?.getBoundingClientRect().left)}});
      } else if (!canMove.right) {
        setCropAreaPos(prev => {return {...prev, x: Number(imageCanvas.current?.getBoundingClientRect().right) - Number(cropArea.current?.getBoundingClientRect().width)}})
      };
      }
		
      document.addEventListener('mousemove', onMouseMove);

      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', onMouseMove);
      });
      ev.preventDefault();
    }, []);
    
  const cropAreaResizeHandler = useCallback((ev: React.MouseEvent<HTMLDivElement, MouseEvent>, linePos: 'right' | 'left' | 'top' | 'bottom') => {
    function onMouseMove(event: MouseEvent) {
      console.log(event.pageY - (cropAreaPos.y ?? 0), event.pageX)
      
      //#################################################################
      const newHeight = event.pageY - (cropAreaPos.y ?? 0);
      
      setCropAreaPos(prev => {
        // TODO consider there is 2 possible ratios
        return {...prev, height: newHeight, width: newHeight*0.666}
      });
    }
    console.log(isPosterRatioNormal)

    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onMouseMove);
    });
    ev.preventDefault();
  }, [isPosterRatioNormal, cropAreaPos])
  

  return (
    <div className="poster-crop-popup">
      <div className="crop-editor">
        <div id="current-image">
          <canvas ref={imageCanvas}/>
        </div>
        <div id="crop-chooser"  style={ undefined === cropAreaPos.x || cropAreaPos.y === undefined || cropAreaPos.height === undefined ? {} : {left: cropAreaPos.x, top: cropAreaPos.y - 59.0625, height: cropAreaPos.height, width: cropAreaPos.width} } ref={cropArea}>
          <div id="move-crop-chooser" onMouseDown={cropAreaSelectorDragHandler}></div>
          <div id="left-side-line" className="crop-editor-line" onMouseDown={ev => cropAreaResizeHandler(ev, 'left')}></div>
          <div id="top-side-line" className="crop-editor-line" onMouseDown={ev => cropAreaResizeHandler(ev, 'top')}></div>
          <div id="right-side-line" className="crop-editor-line" onMouseDown={ev => cropAreaResizeHandler(ev, 'right')}></div>
          <div id="bottom-side-line" className="crop-editor-line" onMouseDown={ev => cropAreaResizeHandler(ev, 'bottom')}></div>
        </div>
      </div>
      <div className="control-panel">
        <input type="button" id="submit" value="Submit" onClick={submitClickHandler}/>
        <ul className="select-ratio">
          <label id="normal-width" >
            <span>2:3</span>
            <input type="radio" name="poster-ratio" checked={isPosterRatioNormal} onClick={( ) => setIsPosterRatioNormal(true)} />
          </label>
          <label id="double-width" >
            <span>4:3</span>
            <input type="radio" name="poster-ratio" checked={!isPosterRatioNormal} onClick={( ) => setIsPosterRatioNormal(false)} />
          </label>
        </ul>
      </div>
    </div>
  );
}
