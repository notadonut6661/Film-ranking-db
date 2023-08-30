import { Title } from "./Title.interface";
import TitleItemCompact from "./TitleItemCompact";
import TitleItemFull from "./TitleItemFull";

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
      return <TitleItemCompact name={""} description={""} rating={0} maturity={0} poster={new Blob()} teaser_url={""} />

    case TitleSize.Full: 
      return <TitleItemFull name={""} description={""} rating={0} maturity={0} poster={new Blob()} teaser_url={""} />;
  }

  return null;
}