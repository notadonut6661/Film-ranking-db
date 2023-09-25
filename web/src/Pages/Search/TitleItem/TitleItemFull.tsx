import { useCallback, useState, useRef, useEffect } from "react";
import { Title } from "./Title.interface";
import getTextMaxLength from "utils/getMaxTextLength";

const TitleItemFull: React.FunctionComponent<Title> = props => {
  const [isItemMaximized, setIsItemMaximized] = useState(false);
  const [croppedDescription, setCroppedDescription] = useState(props.description);
  const teaser = useRef<HTMLIFrameElement>(null);
  const descriptionEl = useRef<HTMLSpanElement>(null);

  const posterMouseOverHandler = useCallback(() => {
    setIsItemMaximized(true);

    teaser?.current?.addEventListener('mouseleave', () => {
      setIsItemMaximized(false);
    });
  }, []);

  useEffect(() => {
    if (props.description.length > getTextMaxLength(descriptionEl?.current)) {
      console.log(11, croppedDescription);
      setCroppedDescription(prev => `${prev.split('').slice(0, getTextMaxLength(document.getElementById("description"))).join('')}...`);
    }
    
  }, []);
  

  return (<div className={`${isItemMaximized ? "expanded" : ""} title-item-full` } onMouseOver={posterMouseOverHandler} ref={teaser}>
    <span id="title">{props.name}</span>
    <iframe ref={teaser} className={`${isItemMaximized ? "": "hidden"}`} title="teaser" id="teaser" src={`https://www.youtube.com/embed/jTx5c-2QOXc?autoplay=1&mute=0&controls=0`}></iframe>
    <span id="description">{croppedDescription}</span>  
    <div className={`${isItemMaximized ? "hidden  " : ""} poster`}>
      <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/OOjs_UI_icon_unStar.svg/1024px-OOjs_UI_icon_unStar.svg.png"} alt=""/>
    </div>
    <span id="rating">{props.rating.toFixed(Math.min(2, String(props.rating % 1).length - 1))} / 10</span>
  </div>);  
}
  
export default TitleItemFull;