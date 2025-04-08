export const fetchYoutubeData = async (url: string) => {
  const response = await fetch(`/api/youtube?url=${url}`);
  const data = await response.json();
  return data;
};

export const fetchSuggestedMusic = async (
  music: string | null,
  artist: string | null,
) => {
  const response = await fetch(`/api/music?music=${music}&artist=${artist}`);
  const data = await response.json();
  return data.length ? data : [];
};

export const setMusicData = async (
  data: {
    music: string;
    artist: string;
  }[],
) => {
  const response = await fetch("/api/music", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  });
  const result = await response.json();
  return result;
};
// https://www.googleapis.com/youtube/v3/videos?part=snippet&id=1UbYw6yN7RE&key=AIzaSyAjB-JSwA5_89AKgbzjGebfe0eJbJOw-M8
