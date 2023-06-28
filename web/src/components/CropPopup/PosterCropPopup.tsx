import "./style.scss";
import { useCallback, useState, useMemo, useRef, useEffect } from "react";

export default function PosterCropPopup(): JSX.Element {
  const [isPosterRatioNormal, setIsPosterRatioNormal] = useState(true);
  const cropArea = useRef<HTMLDivElement  | null>(null);
  const imageCanvas = useRef<HTMLCanvasElement |null>(null);
  const [cropAreaPos, setCropAreaPos] = useState(window.innerWidth / 2);
  const submitClickHandler = useCallback(() => {}, []);

  const cropAreaSelectorDragHandler = useCallback((ev:  React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      ev.preventDefault();
      const left = ev.clientX - Number(cropArea.current?.getBoundingClientRect().left);

      function onMouseMove(event: MouseEvent) {
        if (event.pageX - left)
        setCropAreaPos(event.pageX - left);
      }

      document.addEventListener('mousemove', onMouseMove);

      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', onMouseMove);
      });

    }, []);
  const cropAreaResizeHandler = useCallback(() => {}, [])
  

  return (
    <div className="poster-crop-popup">
      <div className="crop-editor">
        <div id="current-image">
          <canvas ref={imageCanvas}/>
        </div>
        <div id="crop-chooser"  style={{left: `${cropAreaPos}px`, top: `${imageCanvas.current?.getBoundingClientRect().top}px`}} ref={cropArea}>
          <div id="move-crop-chooser" onMouseDown={cropAreaSelectorDragHandler} draggable="true"></div>
        </div>
      </div>
      <div className="control-panel">
        <input type="button" id="submit" value="Submit" onClick={submitClickHandler}/>
        <ul className="select-ratio">
          <label id="normal-width">
            <span>2:3</span>
            <input type="radio" name="poster-ratio" />
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
