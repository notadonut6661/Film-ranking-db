import { Title } from "./Title.interface";

const TitleItemCompact: React.FunctionComponent<Title> = props => {
  return (<div className="title-item-compact">
    <span>{props.name}</span>
    <img src={URL.createObjectURL(props.poster)} alt="" />
    <span>{props.description}</span>
    { [...Array(Math.floor(props.rating))].map(() => {
      return <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cpolygon points='50,10 69,80 30,33 70,33 31,80' fill='gold' /%3E%3C/svg%3E" alt="Star SVG"></img>
    })
    }
    { [...Array((props.rating - Math.floor(props.rating)) * 2)].map(() => {
      return <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cpolygon points='50,10 69,80 30,33 70,33 31,80' fill='gold' /%3E%3C/svg%3E" alt="Star SVG"></img>
    })
    }
  </div> );
}
 
export default TitleItemCompact;