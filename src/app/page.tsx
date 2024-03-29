"use client";
import PlayHome from "./PlayHome/PlayHome";
import Header from "@/components/Header/Header";
import { useState } from "react";
import { videoArr } from "@/utils/constant";

export default function Home() {
  const [isReordermode, setIsReorderMode] = useState<Boolean>(false);
  const [items, setItems] = useState<any>(videoArr);
  const [order, setOrder] = useState<any>(videoArr);

  const handleToggleReorder = () => {
    setIsReorderMode((prev) => !prev);
    setOrder(items);
  };

  const handleSaveOrder = () => {
    setIsReorderMode(false);
    setItems((prev: any) => order);
  };

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
      <PlayHome
        isReordermode={isReordermode}
        videoArr={items}
        order={order}
        setOrder={setOrder}
      />
    </div>
  );
}
