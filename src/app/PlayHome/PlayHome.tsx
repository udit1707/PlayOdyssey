"use client";
import { useEffect, useRef, useState } from "react";
import "./PlayHome.css";
import VideoCard from "../../components/VideoCard/VideoCard";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/Header";
import { videoArr } from "@/utils/constant";

const PlayHome = () => {
  const [currentVideo, setCurrentVideo] = useState<string>("");
  const router = useRouter();

  const handleThumbnailClick = (idx: number) => {
    setCurrentVideo(videoArr[idx].videosrc);
    router.push(`/playvideo?id=${videoArr[idx].id}`);
  };
  return (
    <div className="tiles-cnt">
      {videoArr.map((i, index) => {
        return (
          <VideoCard
            key={index}
            src={i.thumbnail}
            onClick={() => handleThumbnailClick(index)}

          />
        );
      })}
    </div>
  );
};

export default PlayHome;
