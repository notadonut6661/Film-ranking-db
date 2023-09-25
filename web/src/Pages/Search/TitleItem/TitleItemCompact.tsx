import { useCallback, useState, useRef, useEffect } from "react";
import { Title } from "./Title.interface";

const TitleItemCompact: React.FunctionComponent<Title> = props => {
  const teaser = useRef<HTMLIFrameElement>(null);

  return (<div className="title-item-compact">
   <a href={`../title/${props.name}`}>{props.name}</a>
    <iframe ref={teaser} className={``} width="200 " height="90" title="teaser" id="teaser" src={`https://www.youtube.com/embed/${props.teaser_youtube_id}?autoplay=1&mute=1`}></iframe>
    <span id="description">{props.description}</span> 
    <div className="rating-stars">
      { [...Array(Math.floor(props.rating))].map(() => {
        return <img className="rating-star" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/OOjs_UI_icon_unStar.svg/1024px-OOjs_UI_icon_unStar.svg.png" alt="Star SVG" />
      })
      } 
      {props.rating - Math.floor(props.rating) > 0 && <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50'%3E%3Cpolygon points='25,5 34.5,40 15,16.5 35,16.5 15.5,40' fill='gray' /%3E%3C/svg%3E" alt="Star SVG"/>}
    </div>
  </div> ); 
}
 
export default TitleItemCompact;