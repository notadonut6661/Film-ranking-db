import { useCallback, useState, useRef } from "react";
import { Title } from "./Title.interface";

const TitleItemFull: React.FunctionComponent<Title> = props => {
  const [isItemMaximized, setIsItemMaximized] = useState(false);
  const teaser = useRef<HTMLIFrameElement>(null);

  const posterMouseOverHandler = useCallback(() => {
    setIsItemMaximized(true);

    teaser?.current?.addEventListener('mouseleave', () => {
      setIsItemMaximized(false);
    });
  }, []);


  return (<div className={`${isItemMaximized ? "expanded" : ""} title-item-full` } onMouseOver={posterMouseOverHandler} ref={teaser}>
    <a href={`../title/${props.name}`} className={"title"}>{props.name}</a>
    <iframe ref={teaser} className={`${isItemMaximized ? "": "hidden"}`} title="teaser" id="teaser" src={`https://www.youtube.com/embed/94jLgRG0FqI?autoplay=1&mute=0`}></iframe>
    <span id="description">{props.description}</span>
    <div className={`${isItemMaximized ? "hidden  " : ""} poster`}>
      <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/OOjs_UI_icon_unStar.svg/1024px-OOjs_UI_icon_unStar.svg.png"} alt=""/>
    </div>
    <span id="rating">{props.rating.toFixed(Math.min(2, String(props.rating % 1).length - 1))} / 10</span>
    {/* <div className="rating-stars">
      { [...Array(Math.floor(props.rating))].map(() => {
        return <img className="rating-star" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Cpolygon points='15,3 20.7,24 9,9.9 20.8,9.9 9.15,24' fill='gold' /%3E%3C/svg%3E" alt="Star SVG" />
      })
      } 
      {props.rating - Math.floor(props.rating) > 0 && <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50'%3E%3Cpolygon points='25,5 34.5,40 15,16.5 35,16.5 15.5,40' fill='gray' /%3E%3C/svg%3E" alt="Star SVG"/>}
    </div> */}
  </div>);  
}
  
export default TitleItemFull;