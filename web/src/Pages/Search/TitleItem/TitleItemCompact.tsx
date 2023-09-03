import { useCallback, useState, useRef } from "react";
import { Title } from "./Title.interface";

const TitleItemCompact: React.FunctionComponent<Title> = props => {
  const [isTeaserHidden, setIsTeaserHidden] = useState(true);
  const teaser = useRef<HTMLIFrameElement>(null);
  const posterMouseOverHandler = useCallback(() => {
    setIsTeaserHidden(false);

    teaser?.current?.addEventListener('mouseleave', () => {
      setIsTeaserHidden(true);
    });
  }, []);
  
  return (<div className="title-item-compact">
    <a href={`../title/${props.name}`}>{props.name}</a>
    <img src={URL.createObjectURL(props.poster)} alt="" onMouseOver={posterMouseOverHandler} />
    <iframe ref={teaser} className={`${isTeaserHidden ? "hidden" : ""}`} width="420" height="315" title="teaser" src={`https://www.youtube.com/embed/${props.teaser_url}?autoplay=1&mute=1`}></iframe>
    <span>{props.description}</span>
    { [...Array(Math.floor(props.rating))].map(() => {
      return <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cpolygon points='50,10 69,80 30,33 70,33 31,80' fill='gold' /%3E%3C/svg%3E" alt="Star SVG"></img>
    })
    }
    {props.rating - Math.floor(props.rating) > 0 && <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cpolygon points='50,10 69,80 30,33 70,33 31,80' fill='gray' /%3E%3C/svg%3E" alt="Star SVG"></img>
    }
  </div> );
}
 
export default TitleItemCompact;