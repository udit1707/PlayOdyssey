"use client";
import { useRef, useState } from "react";
import "./VideoPlayer.css";
import { CiPlay1, CiPause1, CiVolumeHigh, CiVolumeMute } from "react-icons/ci";

const VideoPlayer = () => {
  const [isControlCenterVisible, setIsControlCenterVisible] =
    useState<Boolean>(false);
  const [isPlaying, setIsPlaying] = useState<Boolean>(false);
  const [isMuted, setIsMuted] = useState<Boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const playerRef = useRef<any>(null);

  const handleToggleControlCenter = (showControlCenter: any) => {
    console.log("entering");
    setIsControlCenterVisible(showControlCenter);
  };

  const handleToggleMute = () => {
    playerRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    console.log(newVol);

    playerRef.current.volume = newVol;
    setVolume(newVol);
    if (newVol === 0.0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const handleTogglePlayPause = (nowPlay: any) => {
    if (playerRef.current) {
      if (nowPlay) {
        setIsPlaying((prev) => nowPlay);
        playerRef.current.play();
      } else {
        setIsPlaying((prev) => nowPlay);
        playerRef.current.pause();
      }
    }
  };
  return (
    <div
      className="player-cnt"
      onMouseEnter={() => handleToggleControlCenter(true)}
      onMouseLeave={() => handleToggleControlCenter(false)}
    >
      <video ref={playerRef} width="70%" className="player" controls={false}>
        <source src="/DEVENDRA.mp4" type="video/mp4" />
      </video>
      {isControlCenterVisible && <div className="control-cnt-bg"></div>}
      {isControlCenterVisible && (
        <div className="control-cnt">
          <div className="control-cnt--left">
            {isPlaying ? (
              <CiPause1
                className="control-btn"
                onClick={() => handleTogglePlayPause(false)}
              />
            ) : (
              <CiPlay1
                className="control-btn"
                onClick={() => handleTogglePlayPause(true)}
              />
            )}
          </div>
          <div className="control-cnt--right">
            <div className="volume-control">
              {isMuted ? (
                <CiVolumeMute
                  className="control-btn"
                  onClick={handleToggleMute}
                />
              ) : (
                <CiVolumeHigh
                  className="control-btn"
                  onClick={handleToggleMute}
                />
              )}
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
