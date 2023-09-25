import { useCallback, useState, useRef, useEffect } from "react";
import { Title } from "./Title.interface";
import config from "data/Json/config.json";
import { VideoPlayer } from "components/VideoPlayer";

const getTextMaxLength = (el: HTMLElement| null): number => {
  if (!el) return 0;

  const maxRows =  el.offsetHeight / (parseFloat(window.getComputedStyle(el).fontSize) + 3);

  return maxRows * 14;
} 

const TitleItemCompact: React.FunctionComponent<Title> = props => {
  const teaser = useRef<HTMLIFrameElement>(null);
  const descriptionEl = useRef<HTMLSpanElement>(null);
  const [croppedDescription, setCroppedDescription] = useState(props.description);

  useEffect(() => {
    if (props.description.length > getTextMaxLength(descriptionEl?.current)) {
      setCroppedDescription("...");
    }
  });

  return (<div className="title-item-compact">
   <a href={`../title/${props.name}`} id="title">{props.name}</a>
   <VideoPlayer src={"https://v.redd.it/177smsvvgtpb1/DASH_96.mp4"} id="teaser" />
    <span id="description" ref={descriptionEl}>{`${props.description.split('').slice(0, getTextMaxLength(document.getElementById("description"))).join('')}${croppedDescription}`}</span> 
    <div className="rating-stars">
      { [...Array(Math.floor(props.rating))].map(() => {
        return <img className="rating-star" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/OOjs_UI_icon_unStar.svg/1024px-OOjs_UI_icon_unStar.svg.png" alt="Star SVG" />
      })} 
      {props.rating - Math.floor(props.rating) > 0 && <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50'%3E%3Cpolygon points='25,5 34.5,40 15,16.5 35,16.5 15.5,40' fill='gray' /%3E%3C/svg%3E" alt="Star SVG"/>}
   /
   </div>
    <div className="rating-stars max">
    {
        [...(new Array(config.max_film_rating))].map(() => {
          return <img className="rating-star-max" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/OOjs_UI_icon_unStar.svg/1024px-OOjs_UI_icon_unStar.svg.png" alt="Star SVG" />
        })
      } 
    </div>
  </div> ); 
}
 
export default TitleItemCompact;