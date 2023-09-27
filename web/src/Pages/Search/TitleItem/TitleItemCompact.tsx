import { useCallback, useState, useRef, useEffect } from "react";
import { Title } from "./Title.interface";
import config from "data/Json/config.json";
import { VideoControls, VideoPlayer } from "components/VideoPlayer";
import getTextMaxLength from "utils/getMaxTextLength";

const TitleItemCompact: React.FunctionComponent<Title> = props => {
  const teaser = useRef<HTMLIFrameElement>(null);
  const [croppedDescription, setCroppedDescription] = useState(props.description);

  useEffect(() => {
    if (props.description.length > getTextMaxLength(document.getElementById("description"))) {
      console.log('jesus', getTextMaxLength(document.getElementById("description")), croppedDescription.split('').slice(0, getTextMaxLength(document.getElementById("description"))).join(''));
      
      setCroppedDescription(prev => `${prev.split('').slice(0, getTextMaxLength(document.getElementById("description"))).join('')}...`);
    }
  }, [props.description.length]);

  return (<div className="title-item-compact">
   <a href={`../title/${props.name}`} id="title">{props.name}</a>
   <VideoPlayer  preview={``} src={"https://packaged-media.redd.it/0n8ekze2cdqb1/pb/m2-res_720p.mp4?m=DASHPlaylist.mpd&v=1&e=1695733200&s=05cb875a6a3cfca1d952d31c8fc19b6fd14206e6#t=0"} id="teaser" controls={VideoControls.Play} />
    <span id="description">{`${croppedDescription}`}</span> 
    <div className="rating">
      <span>{props.rating} 
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/OOjs_UI_icon_unStar.svg/1024px-OOjs_UI_icon_unStar.svg.png" alt="">
        </img>/ 10 </span>    
    </div>
    <a className="title-tag" id="test" href="../">Spooky</a>
  </div> ); 
}
 
export default TitleItemCompact;