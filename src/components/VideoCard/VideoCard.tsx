"use client";
import { useState, forwardRef } from "react";
import "./VideoCard.css";
import { FaPlay } from "react-icons/fa";
import Image from "next/image";

interface VideoCardProps {
  src: string;
  title: string;
  className?: any;
  onClick?: any;
  style?: any;
  ref?: any;
  lastPlayed?: Boolean;
}

const VideoCard: React.ForwardRefRenderFunction<
  HTMLDivElement,
  VideoCardProps
> = ({ lastPlayed, src, className, onClick, title, style, ...props }, ref) => {
  const [isMouseEnter, setIsMouseEnter] = useState<Boolean>(false);

  return (
    <div
      className={[
        "video-card",
        className && className,
        isMouseEnter && "video-card--hover",
        lastPlayed && "last-played-mark",
      ].join(" ")}
      onClick={onClick}
      onMouseEnter={() => setIsMouseEnter(true)}
      onMouseLeave={() => setIsMouseEnter(false)}
      style={style && { ...style }}
      ref={ref}
      {...props}
    >
      {isMouseEnter && (
        <div className="hover-overlay">
          <FaPlay className="overlay-btn" />
          <div className="overlay-title">{title}</div>
        </div>
      )}
      <Image
        src={src}
        alt="thumbnail-video"
        className={[
          "video-card--img",
          isMouseEnter && "video-card--img-hover",
        ].join(" ")}
        width={240}
        height={240}
        layout="responsive"
      />
    </div>
  );
};

export default forwardRef(VideoCard);
