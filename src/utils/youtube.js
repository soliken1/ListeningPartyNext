import axios from "axios";

const KEY = process.env.YOUTUBE_API_KEY;

const youtubeAPI = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 3,
    key: KEY,
  },
  headers: {},
});

export default youtubeAPI;
