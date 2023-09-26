import { FunctionComponent } from "react";
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


export const TileItem: FunctionComponent<TitleItemFactoryProps> = props => {
  switch (props.size) {
    case TitleSize.Small:
      return <TitleItemCompact {...props} />

    case TitleSize.Full: 
      return <TitleItemFull {...props} />;
  }
}