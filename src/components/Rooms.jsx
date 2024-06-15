import React from "react";
import Link from "next/link";
import TextFormatter from "../utils/TextFormatter";

const Rooms = ({ data, current }) => {
  const isIdNull = data?.id || "";
  return (
    <Link
      key={data.id}
      href={`/rooms/${isIdNull}`}
      className="[&_*]:hover:cursor-pointer max-w-lg mx-auto rounded-xl bg-gray-950 hover:shadow-indigo-900 overflow-hidden hover:shadow-lg ease-linear duration-200 md:h-auto md:w-96"
    >
      <div className="md:flex md:flex-col md:h-full">
        <div className="md:shrink-0 md:w-full w-full h-52 md:h-40">
          <img
            className="w-full h-full object-cover"
            src={
              current?.selectedVideo?.snippet?.thumbnails?.high?.url || "/1.jpg"
            }
          />
        </div>
        <div className="p-8 flex flex-col justify-center gap-2">
          <label className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {data.room_name}
          </label>
          <label className="mt-1 text-white">{data.room_desc}</label>
          <label className="block mt-1 text-lg leading-tight font-medium text-white">
            <TextFormatter title={current?.selectedVideo.snippet.title} />
          </label>
          <label className="mt-2 text-slate-500">
            {current?.selectedVideo.snippet.description}
          </label>
        </div>
      </div>
    </Link>
  );
};

export default Rooms;