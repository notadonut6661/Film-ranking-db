import { Title } from "./Title.interface";
import TitleItemCompact from "./TitleItemCompact";
import TitleItemFull from "./TitleItemFull";
import "./style.scss"

export enum TitleSize {
  Small,
  Full
}
  
type TitleItemFactoryProps =  {
  size: TitleSize;
} & Title;


export const TileItem: (props: TitleItemFactoryProps) => JSX.Element | null = props => {
  switch (props.size) {
    case TitleSize.Small:
      return <TitleItemCompact name={props.name} description={props.description} rating={props.rating} maturity={props.maturity} poster={new Blob()} teaser_url={""} />

    case TitleSize.Full: 
      return <TitleItemFull name={props.name} description={props.description} rating={props.rating} maturity={props.maturity} poster={new Blob()} teaser_url={""} />;
  }

  return null;
}