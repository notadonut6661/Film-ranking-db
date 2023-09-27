import { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import './style.scss';
import PlayerContextMenu from './PlayerContextMenu';

export enum VideoControls {
  None,
  Play,
  Full
}

interface VideoPlayerProps {
  preview: string;
  src: string;
  autoplay?: boolean;
  muted?: boolean;
  id?: string;
  controls?: VideoControls;
}

 
export const VideoPlayer: FunctionComponent<VideoPlayerProps> = props => {
  const player = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const playerClickHandler = useCallback(() => {
    if (VideoControls.None === props.controls) return;

    if (VideoControls.Play === props.controls) {
      setIsPaused(prev => !prev);

      if (!player.current?.paused) {
        player.current?.pause();
        return;
      }

      player.current?.play();
    }
  }, [props.controls]);

  return <div className={`${isPaused ? "paused": ""} player`} id={props.id}>
    <img src={props.preview} alt='Teaser preview' className='preview'/>
    <video ref={player}  onClick={playerClickHandler} autoPlay={props.autoplay} muted={props.muted} controls={false} id='hui' >
      <source src={props.src}/> 
    </video>
    <PlayerContextMenu {...{isActive}} target={player} />
  </div>;
} 
