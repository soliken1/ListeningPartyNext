"use client";

import React, { useState, useEffect } from "react";
import { db } from "../configs/firebaseConfig";
import { collection, getDocs } from "@firebase/firestore";
import dynamic from "next/dynamic";

const Rooms = dynamic(() => import("./Rooms"), {
  ssr: false,
});

const Loading = dynamic(() => import("./Loading"), { ssr: false });

const RoomContent = () => {
  const [roomList, setRoomList] = useState([]);
  const [currentPlay, setCurrentPlay] = useState([]);
  const [isCurrPlayLoading, setIsCurrPlayLoading] = useState(false);
  const [isRoomListLoading, setIsRoomListLoading] = useState(false);

  useEffect(() => {
    const getRoomList = async () => {
      try {
        setIsRoomListLoading(true);
        const roomCollectionRef = collection(db, "music-room");
        const roomSnapshot = await getDocs(roomCollectionRef);
        const roomsData = roomSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRoomList(roomsData);
        setIsRoomListLoading(false);
      } catch (error) {
        console.error("Error getting room list: ", error);
        setIsRoomListLoading(false);
      }
    };
    getRoomList();
  }, []);

  useEffect(() => {
    const getCurrentPlay = async () => {
      try {
        setIsCurrPlayLoading(true);
        const currentCollectionRef = collection(db, "current_playing");
        const currentSnapshot = await getDocs(currentCollectionRef);
        const currentData = currentSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCurrentPlay(currentData);
        setIsCurrPlayLoading(false);
      } catch (error) {
        console.error("Error getting current playing: ", error);
        setIsCurrPlayLoading(false);
      }
    };
    getCurrentPlay();
  }, []);

  if (isCurrPlayLoading || isRoomListLoading) {
    return <Loading />;
  }

  return (
    <div className="[&_*]:hover:cursor-pointer relative flex flex-1 flex-col flex-wrap gap-10 justify-evenly md:flex-row mt-5 p-5">
      {roomList && currentPlay.length > 0 ? (
        roomList.map((room) => {
          const currentVideo = currentPlay.find(
            (video) => video.id === room.id
          );
          return (
            <Rooms
              key={room.id || null}
              data={room || null}
              current={currentVideo || null}
            />
          );
        })
      ) : (
        <div className="text-transparent">No rooms available</div>
      )}
    </div>
  );
};

export default RoomContent;
