"use client";
import he from "he";
function VideoTitle({ title }) {
  const decodedTitle = title ? he.decode(title) : "";

  return <h1>{decodedTitle}</h1>;
}

export default VideoTitle;
