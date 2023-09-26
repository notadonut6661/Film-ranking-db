import { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
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
  const [isPaused, setIsPaused] = useState(false);

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

  useEffect(() => {
    Player.current?.addEventListener('play', () => setIsPaused(false));
    Player.current?.addEventListener('pause', () => setIsPaused(true));
  }, []);
  
  return <div className={`${Player.current?.paused ? "paused": ""} player`} id={props.id}>
    <video ref={Player}  onContextMenu={ev => ev.preventDefault()} onClick={playerClickHandler} autoPlay={props.autoplay} muted={props.muted} controls={false} >
      <source src={props.src}/>
    </video>
  </div>;
} 