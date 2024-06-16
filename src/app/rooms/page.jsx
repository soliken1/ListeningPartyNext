"use client";
import RelevantContent from "@/src/components/RelevantContent";
import dynamic from "next/dynamic";

const RoomContent = dynamic(() => import("@/src/components/RoomContent"), {
  ssr: false,
});
const Banner = dynamic(() => import("@/src/components/Banner"), { ssr: false });

function Rooms() {
  return (
    <div>
      <Banner />
      <div className="mt-5">
        <RelevantContent />
        <RoomContent />
      </div>
    </div>
  );
}

export default Rooms;
