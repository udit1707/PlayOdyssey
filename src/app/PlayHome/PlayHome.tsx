"use client";
import "./PlayHome.css";
import VideoCard from "../../components/VideoCard/VideoCard";
import { useRouter } from "next/navigation";
import { videoArr } from "@/utils/constant";

const PlayHome = () => {
  const router = useRouter();

  const handleThumbnailClick = (idx: number) => {
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
