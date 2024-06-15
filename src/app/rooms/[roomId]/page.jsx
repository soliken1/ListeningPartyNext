import Banner from "@/src/components/Banner";
import SearchSong from "@/src/components/SearchSong";
import Video from "@/src/components/Video";
function Room({ params }) {
  return (
    <div>
      <Banner />
      <SearchSong />
      <Video id={params} />
    </div>
  );
}

export default Room;
