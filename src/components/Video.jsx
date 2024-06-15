"use client";
import { useEffect, useState } from "react";
import { onSnapshot, doc } from "@firebase/firestore";
import { db } from "../configs/firebaseConfig";
import TextFormatter from "../utils/TextFormatter";

const Video = ({ id }) => {
  const roomId = id?.roomId || "";
  const [selectedVideo, setSelectedVideo] = useState(null);
  const playingVideo = selectedVideo?.id.videoId || "";

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "current_playing", roomId),
      (doc) => {
        if (doc.exists()) {
          const roomData = doc.data();
          setSelectedVideo(roomData.selectedVideo);
        }
      }
    );
    return () => unsubscribe();
  }, [id]);

  return (
    <div className="flex flex-col gap-2 justify-center items-center mt-5">
      <label className="block mt-1 text-lg leading-tight font-medium text-white">
        <TextFormatter title={selectedVideo?.snippet.title} />
      </label>
      <iframe
        width="610"
        height="355"
        src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Video;
