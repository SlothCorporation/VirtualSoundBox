import { NEXT_PUBLIC_BACKEND_URL } from "@/config/env-client";
import { apiFetch } from "@/lib/api";

const youtubeUrl = `${NEXT_PUBLIC_BACKEND_URL}/api/youtube`;
const musicUrl = `${NEXT_PUBLIC_BACKEND_URL}/api/music`;

export const fetchYoutubeData = async (url: string) => {
  const response = await fetch(`${youtubeUrl}?url=${url}`);
  const data = await response.json();
  return data;
};

export const fetchSuggestedMusic = async (
  music: string | null,
  artist: string | null,
) => {
  const response = await fetch(`${musicUrl}?music=${music}&artist=${artist}`);
  const data = await response.json();
  return data.length ? data : [];
};

export const setMusicData = async (
  data: {
    music: string;
    artist: string;
  }[],
) => {
  const response = await apiFetch("/api/music", {
    method: "POST",
    body: JSON.stringify({ data }),
  });
  const result = await response.json();
  return result;
};
// https://www.googleapis.com/youtube/v3/videos?part=snippet&id=1UbYw6yN7RE&key=AIzaSyAjB-JSwA5_89AKgbzjGebfe0eJbJOw-M8
