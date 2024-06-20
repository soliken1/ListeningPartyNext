import React from "react";
import ReactPlayer from "react-player";

const EmbedPlayer = ({ playingVideo }) => {
  return (
    <div className="flex flex-col h-96 w-full p-1 bg-black rounded-xl md:h-full md:w-full">
      <ReactPlayer
        style={{ backgroundColor: "transparent" }}
        width="100%"
        height="100%"
        url={`https://www.youtube.com/embed/${playingVideo}?autoplay=1`}
        playing
        controls
        pip={false}
      ></ReactPlayer>
    </div>
  );
};

export default EmbedPlayer;
