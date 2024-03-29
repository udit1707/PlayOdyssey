"use client";
import Header from "@/components/Header/Header";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import { videoArr } from "@/utils/constant";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PlayVideo = () => {
  const [currentVideo, setCurrentVideo] = useState<any>(null);
  const [currentRuntime, setCurrentRuntime] = useState<any>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      const video = videoArr.find((i) => i.id === Number(id));
      setCurrentVideo(video?.videosrc);
      const nowPlaying = localStorage.getItem("nowplaying");
      if (nowPlaying) {
        const nowPlayingArr = JSON.parse(nowPlaying);
        const idx = nowPlayingArr.findIndex(
          (el: any) => Number(el.id) === Number(id)
        );
        if (idx !== -1) {
          setCurrentRuntime(nowPlayingArr[idx].runtime);
        } else {
          nowPlayingArr.push({ id: id, runtime: 0 });
          localStorage.removeItem("nowplaying");
          localStorage.setItem("nowplaying", JSON.stringify(nowPlayingArr));
        }
      } else {
        const nowPlayingArr: any[] = [];
        localStorage.setItem("nowplaying", JSON.stringify(nowPlayingArr));
      }
    }
  }, [id]);

  return (
    <div className="home-cnt">
      <Header title="Now Playing..." />
      {currentVideo && (
        <VideoPlayer
          id={id}
          src={currentVideo}
          currentRuntime={currentRuntime}
        />
      )}
    </div>
  );
};

export default PlayVideo;
