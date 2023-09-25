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


  return (<a href={`../title/${props.name}`}><div className={`${isItemMaximized ? "expanded" : ""} title-item-full` } onMouseOver={posterMouseOverHandler} ref={teaser}>
    <span>{props.name}</span>
    <iframe ref={teaser} className={`${isItemMaximized ? "": "hidden"}`} title="teaser" id="teaser" src={`https://www.youtube.com/embed/jTx5c-2QOXc?autoplay=1&mute=0&controls=0`}></iframe>
    <span id="description">{props.description}</span>
    <div className={`${isItemMaximized ? "hidden  " : ""} poster`}>
      <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/OOjs_UI_icon_unStar.svg/1024px-OOjs_UI_icon_unStar.svg.png"} alt=""/>
    </div>
    <span id="rating">{props.rating.toFixed(Math.min(2, String(props.rating % 1).length - 1))} / 10</span>
  </div></a>);  
}
  
export default TitleItemFull;