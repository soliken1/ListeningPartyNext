"use client";

import React, { useEffect, useState } from "react";
import {
  onSnapshot,
  doc,
  setDoc,
  collection,
  where,
  query,
  addDoc,
  serverTimestamp,
} from "@firebase/firestore";
import { db, auth } from "@/src/configs/firebaseConfig";
import TextFormatter from "@/src/utils/TextFormatter";
import Banner from "@/src/components/Banner";
import Inputbox from "@/src/components/Inputbox";
import youtubeAPI from "@/src/utils/youtube";

const tailwindColors = [
  "text-red-500",
  "text-blue-500",
  "text-green-500",
  "text-yellow-500",
  "text-purple-500",
  "text-pink-500",
  "text-indigo-500",
  "text-teal-500",
  "text-orange-500",
  "text-lime-500",
  "text-cyan-500",
  "text-amber-500",
  "text-emerald-500",
  "text-fuchsia-500",
  "text-rose-500",
];

const getRandomColorClass = () => {
  const randomIndex = Math.floor(Math.random() * tailwindColors.length);
  return tailwindColors[randomIndex];
};

const Room = ({ params }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [session, setSession] = useState([]);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [userColors, setUserColors] = useState({});

  const playingVideo = selectedVideo?.id.videoId || "";
  const roomId = params?.roomId || "";

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setUserData(user);
    });
    return () => unsubscribeAuth();
  }, []);

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
          q: searchQuery,
        },
      });
      setSearchResults(response.data.items);
    } catch (error) {
      console.error("Error fetching videos:", error.message);
    }
  };

  const onSubmitMessage = (event) => {
    event.preventDefault();
    onCreateMessage();
  };

  useEffect(() => {
    const sessionCollectionRef = collection(db, "session");
    const q = query(sessionCollectionRef, where("room_id", "==", roomId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSession(messages);

      const newUserColors = { ...userColors };
      messages.forEach((msg) => {
        if (!newUserColors[msg.sender_user]) {
          newUserColors[msg.sender_user] = getRandomColorClass();
        }
      });
      setUserColors(newUserColors);
    });
    return () => unsubscribe();
  }, [roomId, userColors]);

  const onCreateMessage = async () => {
    try {
      const addUser =
        userData && userData.displayName
          ? userData.displayName
          : userData && userData.email && userData.email.split("@")[0];

      await addDoc(collection(db, "session"), {
        room_id: roomId,
        sender_message: message,
        sender_created: serverTimestamp(),
        userId: auth?.currentUser?.uid,
        sender_user: addUser,
      });
      setMessage("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      <Banner />
      <div className="w-screen h-screen md:p-0">
        <div className="absolute z-10 top-1 left-1/2 transform -translate-x-1/2 translate-y-3 flex flex-shrink-0 items-center justify-center w-2/4">
          <form className="w-full" onSubmit={handleSearch}>
            <Inputbox
              type="text"
              classes="h-8 w-full rounded ps-2 text-sm"
              value={searchQuery}
              pholder="Search Videos Here..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        <div className="w-full h-full flex justify-center items-center p-5 mt-5 md:mt-0">
          <div className="flex flex-row flex-wrap gap-5 justify-between items-center md:w-full md:h-3/4 md:flex-nowrap">
            <div className="flex flex-col h-96 w-full md:h-full md:w-full">
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
        </div>

        <div className="flex flex-1 flex-wrap flex-row justify-center md:mt-0 gap-10 md:w-full ps-5 pe-5 md:h-full md:flex-nowrap p-5">
          <div className="flex flex-col gap-5 md:h-full justify-between w-full md:w-full rounded-xl p-5 bg-gray-950">
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
              <label className="text-sm text-zinc-500">
                Official Youtube Link{" "}
                <a
                  className="text-indigo-500"
                  href={`https://www.youtube.com/watch?v=${playingVideo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click Here
                </a>
              </label>
            </div>
            <div className="flex flex-col overflow-auto gap-5">
              {session
                .filter((session) => session.sender_created !== null)
                .sort(
                  (a, b) => a.sender_created.seconds - b.sender_created.seconds
                )
                .map((session) => {
                  const colorClass =
                    userColors[session.sender_user] || getRandomColorClass();
                  return (
                    <div key={session.id} className="flex flex-row gap-2">
                      <label className="text-zinc-500 text-xs">
                        {session.sender_created
                          ? new Date(
                              session.sender_created.seconds * 1000
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : ""}
                      </label>
                      <label className={`${colorClass} text-xs`}>
                        {session.sender_user + ": "}
                      </label>
                      <label className="text-white text-xs w-48 md:w-10/12">
                        {session.sender_message}
                      </label>
                    </div>
                  );
                })}
            </div>
            <div>
              <form onSubmit={onSubmitMessage}>
                <Inputbox
                  type="text"
                  classes="rounded-lg h-8 ps-3 text-xs w-10/12"
                  value={message}
                  pholder="Start Messaging Here..."
                  onChange={(e) => setMessage(e.target.value)}
                />
              </form>
            </div>
          </div>

          <div className="flex flex-col gap-2 md:w-3/6 me-5 pb-3">
            {searchResults.map((video) => (
              <div
                key={video.id.videoId}
                className="w-full h-full md:h-32 rounded-xl flex flex-col md:flex-row gap-5 [&_*]:hover:cursor-pointer ease-linear duration-200 hover:bg-gray-950"
                onClick={() => handleVideoSelect(video)}
              >
                <img
                  src={video.snippet.thumbnails.high.url}
                  alt={video.snippet.title}
                  className="h-full md:w-6/8 object-cover rounded-xl"
                />
                <div className="flex flex-col p-5">
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
    </div>
  );
};

export default Room;
