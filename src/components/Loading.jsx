import React from "react";
import { waveform } from "ldrs";

const Loading = () => {
  waveform.register();
  return (
    <div className="flex justify-center items-center h-96">
      <l-waveform size="35" stroke="3.5" speed="1" color="white"></l-waveform>
    </div>
  );
};

export default Loading;
