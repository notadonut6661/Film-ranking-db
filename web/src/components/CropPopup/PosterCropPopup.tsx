export default function PosterCropPopup(): JSX.Element {
   return <div className="poster-crop-popup">
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
      <label>
        <input type="radio" name="poster-ratio"/>
      </label>
      <label>
        <input type="radio" name="poster-ratio"/>
      </label>
    </div>
  </div>;
} 
