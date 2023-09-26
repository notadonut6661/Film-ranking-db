import { FunctionComponent, useCallback, useRef } from 'react';
import './style.scss';


interface VideoPlayerProps {
  src: string;
  autoplay?: boolean;
  muted?: boolean;
  id?: string;
  controls?: VideoControls;
}

export enum VideoControls {
  None,
  Play,
  Full
}
 
export const VideoPlayer: FunctionComponent<VideoPlayerProps> = props => {
  const Player = useRef<HTMLVideoElement>(null);

  const playerClickHandler = useCallback(() => {
    console.log(Player.current?.paused)
    if (VideoControls.None === props.controls) return;

    if (VideoControls.Play === props.controls) {
      if (!Player.current?.paused) {
        Player.current?.pause();
        return;
      }

      Player?.current?.play();
    }
  }, [props.controls]);

  return <>
    <video ref={Player} onClick={playerClickHandler} autoPlay={props.autoplay} muted={props.muted} controls={false} id={props.id}>
      <source src={props.src}/>
    </video>
  </>;
}