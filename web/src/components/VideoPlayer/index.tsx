import { FunctionComponent } from 'react';
import './style.scss';

enum VideoControls {
  None,
  Play,
  Full
}

interface VideoPlayerProps {
  src: string;
  autoplay?: boolean;
  muted?: boolean;
  id?: string;
  controls?: VideoControls;
}

export const VideoPlayer: FunctionComponent<VideoPlayerProps> = props => {
  
  return <>
    <video onMouseDown={() => {}} autoPlay={props.autoplay} muted={props.muted} controls={false} id={props.id}>
      <source src={props.src}/>
    </video>
  </>;
}