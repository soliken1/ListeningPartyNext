import React from "react";
import TextFormatter from "@/src/utils/TextFormatter";

const SearchResult = ({ searchResults, handleVideoSelect }) => {
  return (
    <div>
      {searchResults.map((video) => (
        <div
          key={video.id.videoId}
          className="w-full h-full md:h-32 rounded-xl flex flex-col md:flex-row gap-5 [&_*]:hover:cursor-pointer ease-linear duration-200 hover:bg-gray-900"
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
  );
};

export default SearchResult;
