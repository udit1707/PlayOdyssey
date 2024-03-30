"use client";
import PlayHome from "./PlayHome/PlayHome";
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import { videoArr } from "@/utils/constant";
import PuffLoader from "react-spinners/PuffLoader";

export default function Home() {
  const [isReordermode, setIsReorderMode] = useState<Boolean>(false);
  const [items, setItems] = useState<any>(null);
  const [order, setOrder] = useState<any>(videoArr);

  const handleToggleReorder = () => {
    setIsReorderMode((prev) => !prev);
    setOrder(items);
  };

  const handleSaveOrder = () => {
    setIsReorderMode(false);
    setItems((prev: any) => order);
    const lastSavedPlaylist = localStorage.getItem("lastSavedPlaylist");
    if (lastSavedPlaylist) {
      localStorage.removeItem("lastSavedPlaylist");
    }
    localStorage.setItem("lastSavedPlaylist", JSON.stringify(order));
  };

  useEffect(() => {
    const lastSavedPlaylist = localStorage.getItem("lastSavedPlaylist");
    if (lastSavedPlaylist) {
      setItems(JSON.parse(lastSavedPlaylist));
    } else {
      setItems(videoArr);
    }
  }, []);

  return (
    <div className="home-cnt">
      <Header title="PlayOdyssey" />
      <div className="reorder-btn-cnt">
        {isReordermode && (
          <span className="reorder-info-text">
            Drag and Drop tiles to reorder playlist!
          </span>
        )}
        <div className="reorder-btn" onClick={handleToggleReorder}>
          {isReordermode ? "Exit Reorder Mode" : "Reorder Playlist"}
        </div>
        {isReordermode && (
          <div
            className="reorder-btn reorder-btn--save"
            onClick={handleSaveOrder}
          >
            Save Order
          </div>
        )}
      </div>
      {
        items?
        <PlayHome
        isReordermode={isReordermode}
        videoArr={items}
        order={order}
        setOrder={setOrder}
      />:<PuffLoader color="#adff00" size={200} className="playlist-loader"/>}
    </div>
  );
}
