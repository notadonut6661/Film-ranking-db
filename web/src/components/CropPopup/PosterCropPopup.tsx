import "./style.scss";
import { useCallback, useState, useMemo } from "react";

export default function PosterCropPopup(): JSX.Element {
  const isPosterRatioNormal = useState(true);
  
  const submitClickHandler = useCallback(() => {}, []);
  const cropAreaSelectorDragHandler = useCallback(() => {}, []);
  const cropAreaResizeHandler = useCallback(() => {}, [])
  
  return (
    <div className="poster-crop-popup">
      <div className="crop-editor">
        <canvas />
        <div id="crop-chooser">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="control-panel">
        <input type="button" id="submit"/>
        <label>
          <input type="radio" name="poster-ratio" />
        </label>
        <label>
          <input type="radio" name="poster-ratio" />
        </label>
      </div>
    </div>
  );
}
