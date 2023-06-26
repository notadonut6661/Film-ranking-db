export default function PosterCropPopup(): JSX.Element {
   return <div className="poster-crop-popup">
    <div>
      <canvas />
      <div id="crop-chooser">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div className="control-panel"></div>
  </div>;
} 
