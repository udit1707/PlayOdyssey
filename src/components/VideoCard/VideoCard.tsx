"use client";
import { useEffect, useRef, useState } from "react";
import "./VideoCard.css";

interface VideoCardProps {
  src: string;
  className?: any;
  onClick: any;
}

const VideoCard: React.FC<VideoCardProps> = ({ src, className, onClick }) => {
  return (
    <div
      className={["video-card", className && className].join(" ")}
      onClick={onClick}
    >
      <img src={src} alt="thumbnail-video" className="video-card--img"/>
    </div>
  );
};

export default VideoCard;
