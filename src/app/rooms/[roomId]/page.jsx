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
import Searchbar from "@/src/components/Searchbar";
import EmbedPlayer from "@/src/components/EmbedPlayer";
import QueuedList from "@/src/components/QueuedList";
import SelectedDescription from "@/src/components/SelectedDescription";
import Messages from "@/src/components/Messages";
import MessageBox from "@/src/components/MessageBox";
import SearchResult from "@/src/components/SearchResult";

const Room = ({ params }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [session, setSession] = useState([]);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);

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
      const messages = snapshot.docs.map((doc) => {
        const data = doc.data();
        const username = data.sender_user.split(" ")[0];
        return {
          id: doc.id,
          ...data,
          sender_user: username,
        };
      });
      setSession(messages);
    });
    return () => unsubscribe();
  }, [roomId]);

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
        <Searchbar
          handleSearch={handleSearch}
          searchQuery={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="w-full h-full flex justify-center items-center p-5 mt-5 md:mt-0">
          <div className="flex flex-row flex-wrap gap-5 justify-between items-center md:w-full md:h-full md:flex-nowrap">
            <EmbedPlayer playingVideo={playingVideo} />

            <QueuedList />
          </div>
        </div>

        <div className="flex flex-1 flex-wrap flex-row justify-center md:mt-0 gap-10 md:w-full ps-5 pe-5 md:h-full md:flex-nowrap p-5">
          <div className="flex flex-col gap-5 md:h-full justify-between w-full md:w-full rounded-xl p-5 bg-gray-950">
            <SelectedDescription
              selectedVideo={selectedVideo}
              playingVideo={playingVideo}
            />

            <Messages session={session} />

            <MessageBox
              onSubmitMessage={onSubmitMessage}
              message={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 md:w-3/6 me-5 rounded-xl p-3 bg-gray-950">
            <div className="flex items-center justify-center h-12">
              <label className="text-white font-medium text-lg">
                Video Results
              </label>
            </div>
            <SearchResult
              searchResults={searchResults}
              handleVideoSelect={handleVideoSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
