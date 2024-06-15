"use client";

import React, { useEffect, useState } from "react";
import { onSnapshot, doc, setDoc } from "@firebase/firestore";
import { db, auth } from "@/src/configs/firebaseConfig";
import TextFormatter from "@/src/utils/TextFormatter";
import Banner from "@/src/components/Banner";
import Inputbox from "@/src/components/Inputbox";
import youtubeAPI from "@/src/utils/youtube";

const Room = ({ params }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const playingVideo = selectedVideo?.id.videoId || "";

  const roomId = params?.roomId || "";

  useEffect(() => {
    if (!roomId) return;

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
  }, [roomId]);

  const handleVideoSelect = async (video) => {
    try {
      await setDoc(doc(db, "current_playing", roomId), {
        selectedVideo: video,
        userId: auth?.currentUser?.uid,
      });
    } catch (error) {
      console.error("Error selecting video: ", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await youtubeAPI.get("/search", {
        params: {
          q: query,
        },
      });

      setSearchResults(response.data.items);
      console.log(response.data.items);
    } catch (error) {
      console.error("Error fetching videos:", error.message);
    }
  };

  return (
    <div className="h-screen">
      <Banner />

      <div className="absolute z-10 top-1 left-1/2 transform -translate-x-1/2 translate-y-3 flex flex-shrink-0 items-center justify-center w-1/4">
        <form className="w-full" onSubmit={handleSearch}>
          <Inputbox
            type="text"
            classes="h-8 w-full rounded ps-2 text-sm"
            value={query}
            pholder="Search Videos Here..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="flex flex-1 flex-row flex-wrap gap-2 justify-between items-center mt-5 p-5 md:w-full md:h-3/4 md:flex-nowrap">
        <div className="flex flex-col h-96 w-full md:h-full md:w-full p-3">
          <iframe
            className="h-full w-full md:h-full md:w-full rounded-xl"
            src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="flex flex-col gap-2 h-96 w-full md:h-full md:w-2/6 p-5 rounded-xl bg-gray-950">
          <h2 className="text-lg font-medium text-white">Queued Videos</h2>
        </div>
      </div>

      <div className="flex flex-1 flex-wrap flex-row gap-8 justify-between items-center md:w-full p-3 md:h-auto md:flex-nowrap">
        <div className="flex flex-col gap-5 justify-between h-96 w-full md:w-full rounded-xl p-5 bg-gray-950">
          <div className="flex flex-col gap-2">
            <label className="mt-1 text-xl leading-tight font-medium text-white">
              <TextFormatter title={selectedVideo?.snippet?.title} />
            </label>
            <label className="mt-1 text-sm text-zinc-500">
              <TextFormatter title={selectedVideo?.snippet?.channelTitle} />
            </label>
            <label className="text-sm text-zinc-500">
              <TextFormatter title={selectedVideo?.snippet?.description} />
            </label>
          </div>
          <div className="flex flex-col mt-5 overflow-y-auto">
            <label className="text-white">Hello</label>
          </div>
        </div>

        <div className="flex flex-col gap-2 md:w-3/6 me-5">
          {searchResults.map((video) => (
            <div
              key={video.id.chennelId}
              className="md:h-32 rounded-xl flex flex-row gap-4 [&_*]:hover:cursor-pointer"
              onClick={() => handleVideoSelect(video)}
            >
              <img
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
                className="md:w-6/12 object-cover rounded-xl mt-1"
              />
              <div className="flex flex-col">
                <label className="text-sm text-white">
                  <TextFormatter title={video.snippet.title} />
                </label>
                <label className="text-xs text-gray-300">
                  <TextFormatter title={video.snippet.channelTitle} />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Room;
