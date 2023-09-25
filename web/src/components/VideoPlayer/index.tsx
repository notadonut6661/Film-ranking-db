import { FunctionComponent } from 'react';
import 'style.scss';

enum VideoControls {
  None,
  Play,
  Full
}

interface VideoPlayerProps {
  src: string;
  autoplay?: boolean;
  muted?: boolean;
  controls?: VideoControls;
}

export const VideoPlayer: FunctionComponent<VideoPlayerProps> = props => {
  
  return <>
    <video onMouseDown={() => {}} controls={false}>
      <source src={props.src}/>
    </video>
  </>;
}