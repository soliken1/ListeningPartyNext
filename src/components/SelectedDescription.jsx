import React from "react";
import TextFormatter from "@/src/utils/TextFormatter";

const SelectedDescription = ({ selectedVideo, playingVideo }) => {
  return (
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
  );
};

export default SelectedDescription;
