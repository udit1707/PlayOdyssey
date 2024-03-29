import Image from "next/image";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";
import PlayHome from "./PlayHome/PlayHome";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <div className="home-cnt">
      <Header title="PlayOdyssey" />
      <PlayHome />
    </div>
  );
}
