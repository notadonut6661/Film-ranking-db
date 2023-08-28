enum TitleSize {
  Small,
  Full
}

interface TitleItemFactoryProps {
  size: TitleSize;
  title: {
    name: string;
    description: string;
    rating: number;
    maturity: number;
    poster: Blob;
    teaser_url: string;
  }
}


export const TileItem: React.FunctionComponent<TitleItemFactoryProps> = props => {
  return <></>;
};  