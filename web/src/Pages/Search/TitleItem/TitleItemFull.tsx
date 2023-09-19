import { Title } from "./Title.interface";

const TitleItemFull: React.FunctionComponent<Title> = props => {
  return (<div className="title-item-full">
    <a href={`../title/${props.name}`}>{props.name}</a>
    <img className={`poster`} src={"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cpolygon points='50,10 69,80 30,33 70,33 31,80' fill='green' /%3E%3C/svg%3E"} alt=""/>
    <div className="rating-stars">
      { [...Array(Math.floor(props.rating))].map(() => {
        return <img className="rating-star" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50'%3E%3Cpolygon points='25,5 34.5,40 15,16.5 35,16.5 15.5,40' fill='gold' /%3E%3C/svg%3E" alt="Star SVG" />
      })
      } 
      {props.rating - Math.floor(props.rating) > 0 && <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50'%3E%3Cpolygon points='25,5 34.5,40 15,16.5 35,16.5 15.5,40' fill='gray' /%3E%3C/svg%3E" alt="Star SVG"/>}
    </div>
  </div>);
}
 
export default TitleItemFull;