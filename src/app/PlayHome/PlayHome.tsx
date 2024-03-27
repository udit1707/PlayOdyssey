"use client";
import { useEffect, useRef, useState } from "react";
import "./PlayHome.css";
import VideoCard from "../VideoCard/VideoCard";

const videoArr = [
  {
    thumbnail:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
    videosrc:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    thumbnail:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
    videosrc:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    thumbnail:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
    videosrc:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    thumbnail:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
    videosrc:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    thumbnail:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
    videosrc:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
  {
    thumbnail:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
    videosrc:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
  {
    thumbnail:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg",
    videosrc:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  },
  {
    thumbnail:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
    videosrc:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.jpg",
  },
  {
    thumbnail:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg",
    videosrc:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  },
  {
    thumbnail:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
    videosrc:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  },
];

const PlayHome = () => {
  const [currentVideo, setCurrentVideo] = useState<string>("");
  const handleThumbnailClick = (idx: number) => {
    setCurrentVideo(videoArr[idx].videosrc);
  };
  return (
    <div className="home-cnt">
      {videoArr.map((i, index) => {
        return (
          <VideoCard
            src={i.thumbnail}
            onClick={() => handleThumbnailClick(index)}
          />
        );
      })}
    </div>
  );
};

export default PlayHome;
