import { useCallback, useState, useRef } from "react";
import { Title } from "./Title.interface";

const TitleItemFull: React.FunctionComponent<Title> = props => {
  const [isItemMaximized, setIsItemMaximized] = useState(false);
  const teaser = useRef<HTMLIFrameElement>(null);

  const posterMouseOverHandler = useCallback(() => {
    setIsItemMaximized(false);

    teaser?.current?.addEventListener('mouseleave', () => {
      setIsItemMaximized(true);
    });
  }, []);


  return (<div className={`${isItemMaximized ? "enlargened" : ""} title-item-full` }>
    <a href={`../title/${props.name}`} className={"title"}>{props.name}</a>
    <iframe ref={teaser} className={`${isItemMaximized ? "": "hidden"}`} width={"200"} height={"90"} title="teaser" id="teaser" src={`https://www.youtube.com/embed/${props.teaser_youtube_id}?autoplay=1&mute=1`}></iframe>
    <span id="description">{props.description}</span>
    <img className={`poster`} src={"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Cpolygon points='15,3 20.7,24 9,9.9 20.8,9.9 9.15,24' fill='gold' /%3E%3C/svg%3E"} alt=""/>
    <div className="rating-stars">
      { [...Array(Math.floor(props.rating))].map(() => {
        return <img className="rating-star" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Cpolygon points='15,3 20.7,24 9,9.9 20.8,9.9 9.15,24' fill='gold' /%3E%3C/svg%3E" alt="Star SVG" />
      })
      } 
      {props.rating - Math.floor(props.rating) > 0 && <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50'%3E%3Cpolygon points='25,5 34.5,40 15,16.5 35,16.5 15.5,40' fill='gray' /%3E%3C/svg%3E" alt="Star SVG"/>}
    </div>
  </div>);  
}
  
export default TitleItemFull;