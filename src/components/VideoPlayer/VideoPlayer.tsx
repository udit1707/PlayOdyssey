"use client";
import { useEffect, useRef, useState } from "react";
import "./VideoPlayer.css";
import { MdOutlineFullscreen } from "react-icons/md";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import PuffLoader from "react-spinners/PuffLoader";

interface VideoPlayerProps {
  id: any;
  src: string;
  currentRuntime?: any;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  id,
  src,
  currentRuntime,
}) => {
  const [isControlCenterVisible, setIsControlCenterVisible] =
    useState<Boolean>(false);
  const [isPlaying, setIsPlaying] = useState<Boolean>(false);
  const [isMuted, setIsMuted] = useState<Boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [currentTime, setCurrentTime] = useState<number>(
    currentRuntime !== null ? parseFloat(currentRuntime) : 0
  );
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const playerRef = useRef<any>(null);
  const videoContainerRef = useRef<any>(null);
  const [isFullScreen, setIsFullScreen] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const handleToggleControlCenter = (showControlCenter: any) => {
    setIsControlCenterVisible(showControlCenter);
  };

  const handleToggleMute = () => {
    playerRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);

    playerRef.current.volume = newVol;
    setVolume(newVol);
    if (newVol === 0.0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    playerRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const renderCurrentTime = () => {
    let minutesCC: any = Math.floor(currentTime / 60);
    const hoursCC = Math.floor(minutesCC / 60)
      .toString()
      .padStart(2, "0");
    const secondsCC = Math.floor(currentTime % 60)
      .toString()
      .padStart(2, "0");
    minutesCC = minutesCC.toString().padStart(2, "0");

    return `${hoursCC}:${minutesCC}:${secondsCC}`;
  };

  const renderTotalTime = () => {
    const totalTime = parseFloat(playerRef.current.duration);
    let minutesTT: any = Math.floor(totalTime / 60);
    const hoursTT = Math.floor(minutesTT / 60)
      .toString()
      .padStart(2, "0");
    const secondsTT = Math.floor(totalTime % 60)
      .toString()
      .padStart(2, "0");
    minutesTT = minutesTT.toString().padStart(2, "0");

    return isNaN(Number(secondsTT))
      ? `00:00:00`
      : `${hoursTT}:${minutesTT}:${secondsTT}`;
  };

  const handleTogglePlayPause = (nowPlay: any) => {
    if (playerRef.current) {
      if (nowPlay) {
        setIsPlaying((prev) => nowPlay);
        playerRef.current.play();
        playerRef.current.currentTime = currentTime;
      } else {
        setIsPlaying((prev) => nowPlay);
        playerRef.current.pause();
      }
    }
  };

  const handlePlaybackSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
  };

  const handlePlayerClick = () => {
    setIsPlaying((prev: Boolean) => {
      if (prev) {
        playerRef.current.pause();
        return false;
      } else {
        playerRef.current.play();
        return true;
      }
    });
  };

  const handleToggleFullScreen = () => {
    if (playerRef.current) {
      if (!document.fullscreenElement) {
        videoContainerRef.current
          .requestFullscreen()
          .then(() => {
            playerRef.current.style.objectFit = "fill";
            setIsFullScreen(true);
          })
          .catch((err: any) => {
            console.log(
              `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
            );
          });
      } else {
        document.exitFullscreen();
        playerRef.current.style.objectFit = "contain";
        setIsFullScreen(false);
      }
    }
  };

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  useEffect(() => {
    let mouseTimer: any;
    const handleMouseMove = () => {
      if (!document.fullscreenElement) {
        return;
      }
      handleToggleControlCenter(true);
      clearTimeout(mouseTimer);
      mouseTimer = setTimeout(() => {
        handleToggleControlCenter(false);
      }, 3000);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(mouseTimer);
    };
  }, []);

  useEffect(() => {
    return () => {
      const nowPlaying = localStorage.getItem("nowplaying");
      if (nowPlaying) {
        const nowPlayingArr = JSON.parse(nowPlaying);
        const filtered = nowPlayingArr.filter(
          (el: any) => Number(el.id) !== Number(id)
        );
        const newArr = [...filtered, { id: id, runtime: currentTime }];
        localStorage.removeItem("nowplaying");
        localStorage.setItem("nowplaying", JSON.stringify(newArr));
      }
    };
  }, [currentTime]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.addEventListener("loadeddata", () => {
        setIsLoading(false); // Set loading state to false when video has finished loading
      });
    }
  }, []);

  return (
    <div
      className="player-cnt"
      onMouseEnter={
        !isFullScreen ? () => handleToggleControlCenter(true) : () => {}
      }
      onMouseLeave={
        !isFullScreen ? () => handleToggleControlCenter(false) : () => {}
      }
      ref={videoContainerRef}
    >
      {isLoading && (
        <PuffLoader color="#adff00" size={200} className="playlist-loader" />
      )}

      <video
        ref={playerRef}
        width="70%"
        className="player"
        controls={false}
        onClick={handlePlayerClick}
        onTimeUpdate={() => setCurrentTime(playerRef.current.currentTime)}
      >
        <source src={src} type="video/mp4" />
        {/* <source src="/DEVENDRA.mp4" type="video/mp4" /> */}
      </video>
      {isControlCenterVisible && <div className="control-cnt-bg"></div>}
      {isControlCenterVisible && (
        <div className="control-cnt">
          <div className="control-play-seek">
            {isPlaying ? (
              <FaPause
                className="control-btn"
                onClick={() => handleTogglePlayPause(false)}
              />
            ) : (
              <FaPlay
                className="control-btn"
                onClick={() => handleTogglePlayPause(true)}
              />
            )}
            <div className="control-seek-time-cnt">
              <span className="current-time">
                {playerRef.current ? renderCurrentTime() : `00:00:00`}
              </span>
              <input
                type="range"
                min={0}
                max={playerRef.current ? playerRef.current.duration : 0}
                step={0.01}
                value={currentTime}
                onChange={handleSeek}
                className="seek-bar"
              />
              <span className="total-time">
                {playerRef.current ? renderTotalTime() : `00:00:00`}
              </span>
            </div>
          </div>
          <div className="control-cnt--right">
            <div className="volume-control">
              {isMuted ? (
                <FaVolumeMute
                  className="control-btn"
                  onClick={handleToggleMute}
                />
              ) : (
                <FaVolumeUp
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
            <select
              className="speed-selector"
              value={playbackSpeed}
              onChange={(e) =>
                handlePlaybackSpeedChange(parseFloat(e.target.value))
              }
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
            <MdOutlineFullscreen
              className="control-btn"
              onClick={handleToggleFullScreen}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
