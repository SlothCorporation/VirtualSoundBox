import Layout from "@/components/Layout";
import Input from "@/components/Form/Input";
import {
  setListDataAtom,
  liveStreamDataAtom,
} from "@/atoms/admin/postGenerator/atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import {
  fetchYoutubeData,
  fetchSuggestedMusic,
  setMusicData,
} from "@/hooks/admin/postGenerator/api";

function zeroPadding(NUM: number, LEN: number) {
  return (Array(LEN).join("0") + NUM).slice(-LEN);
}

function PostGenerator() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [music, setMusic] = useState("");
  const [artist, setArtist] = useState("");
  const [isFocus, setIsFocus] = useState({ music: false, artist: false });
  const [suggestions, setSuggestions] = useState([]);
  const setListData = useSetAtom(setListDataAtom);
  const [liveStreamData, setLiveStreamData] = useAtom(liveStreamDataAtom);

  const handleFetchYoutubeData = async () => {
    if (liveStreamData.url === youtubeUrl) return;
    const data = await fetchYoutubeData(youtubeUrl);
    if (data) {
      setLiveStreamData({ title: data.title, url: youtubeUrl });
    }
  };

  const handleSetListAdd = () => {
    setListData((prev) => [...prev, { music, artist }]);
    setMusic("");
    setArtist("");
  };

  const suggestedMusic = useCallback(async () => {
    if (!music && !artist) {
      setSuggestions([]);
      return;
    }
    const data = await fetchSuggestedMusic(music, artist);
    setSuggestions(data);
  }, [music, artist]);

  useEffect(() => {
    suggestedMusic();
  }, [music, artist, suggestedMusic]);

  const handleSuggest = async (item: { name: string; artist: string }) => {
    setMusic(item.name);
    setArtist(item.artist);
    setIsFocus({ music: false, artist: false });
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-end gap-2.5">
        <div className="w-full">
          <Input
            label="Youtube URL"
            placeholder="https://www.youtube.com/watch?v=..."
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
        </div>
        <div className="text-nowrap">
          <button
            className="relative rounded border p-1.5 text-sm font-bold"
            onClick={handleFetchYoutubeData}
          >
            <span className="grow px-2">YouTubeを取得</span>
          </button>
        </div>
      </div>
      <div className="flex items-end gap-2.5">
        <div>
          <Input
            label="曲名"
            placeholder="さんぽ"
            value={music}
            autoComplete="off"
            onFocus={() => setIsFocus((prev) => ({ ...prev, music: true }))}
            onBlur={() => setIsFocus((prev) => ({ ...prev, music: false }))}
            onChange={(e) => setMusic(e.target.value)}
          />
          {isFocus.music && suggestions.length > 0 && (
            <ul className="absolute mt-1 max-h-48 w-fit overflow-y-auto rounded border border-gray-400 bg-white p-1.5 text-sm">
              {suggestions.map(
                (item: { name: string; artist: string }, index) => (
                  <li
                    className="cursor-pointer border-b border-gray-400 p-1.5 last:border-none hover:bg-gray-100"
                    key={index}
                    onMouseDown={() => handleSuggest(item)}
                  >
                    {item.name}/{item.artist}
                  </li>
                ),
              )}
            </ul>
          )}
        </div>
        <div>
          <Input
            label="アーティスト"
            placeholder="かぐや様"
            value={artist}
            autoComplete="off"
            onFocus={() => setIsFocus((prev) => ({ ...prev, artist: true }))}
            onBlur={() => setIsFocus((prev) => ({ ...prev, artist: false }))}
            onChange={(e) => setArtist(e.target.value)}
          />
          {isFocus.artist && suggestions.length > 0 && (
            <ul className="absolute mt-1 max-h-48 w-fit overflow-y-auto rounded border border-gray-400 bg-white p-1.5 text-sm">
              {suggestions.map(
                (item: { name: string; artist: string }, index) => (
                  <li
                    className="cursor-pointer border-b border-gray-400 p-1.5 last:border-none hover:bg-gray-100"
                    key={index}
                    onMouseDown={() => handleSuggest(item)}
                  >
                    {item.name}/{item.artist}
                  </li>
                ),
              )}
            </ul>
          )}
        </div>
        <div>
          <button
            className="relative rounded border p-1.5 text-sm font-bold"
            onClick={handleSetListAdd}
          >
            <span className="grow px-2">SET</span>
          </button>
        </div>
      </div>
      <PostPreview />
    </div>
  );
}

const musicTemplate = `🎤{{number}}:{{music}}/{{artist}}🎶

{{liveTitle}}
{{liveUrl}} @YouTubeより`;

const setListTemplate = `{{liveTitle}}
{{liveUrl}} @YouTubeより

本日のセトリ
@{{setList}}
{{number}}:{{music}}/{{artist}}
@{{end}}`;

type TemplateVariables = {
  [key: string]: string | string[] | { [key: string]: string }[];
};

function replacePlaceholders(
  template: string,
  variables: TemplateVariables,
): string {
  return template
    .replace(
      /@{{(\w+)}}([\s\S]*?)@{{end}}/g,
      (_, key: string, content: string) => {
        if (Array.isArray(variables[key])) {
          return (variables[key] as { [key: string]: string }[])
            .map((item) =>
              content
                .replace(
                  /{{(.*?)}}/g,
                  (_, varKey: string) => item[varKey.trim()] || "",
                )
                .trim(),
            )
            .join("\n");
        }
        return content.trim();
      },
    )
    .replace(/{{(.*?)}}/g, (_, key: string) =>
      String(variables[key.trim()] || ""),
    );
}

function PostPreview() {
  const [generatedText, setGeneratedText] = useState("");
  const liveStreamData = useAtomValue(liveStreamDataAtom);
  const data = useAtomValue(setListDataAtom);

  useEffect(() => {
    setGeneratedText(
      replacePlaceholders(musicTemplate, {
        number: String(data.length),
        music: data.slice(-1)[0]?.music,
        artist: data.slice(-1)[0]?.artist,
        liveTitle: liveStreamData.title,
        liveUrl: liveStreamData.url,
      }),
    );
  }, [liveStreamData, data]);

  const handlePost = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(generatedText)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full">
      <div className="mb-2 h-52 w-full whitespace-pre-wrap rounded border border-gray-400 px-4 py-[0.62rem] text-sm">
        {data.length > 0 ? generatedText : ""}
      </div>
      <button
        className="w-full rounded border p-1.5 text-sm font-bold"
        onClick={() => handlePost()}
      >
        Tweet
      </button>
    </div>
  );
}

function SetListGenerator() {
  const [listData, setListData] = useAtom(setListDataAtom);

  const handleRemove = (index: number) => {
    setListData((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <div className="flex w-full flex-col gap-2">
      <div>
        <span>セットリスト</span>
        <ul className="h-60 overflow-y-scroll rounded border border-gray-400 p-1.5">
          {listData.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between border-b py-1.5"
            >
              <span className="mr-2">{`${index + 1} : ${item.music}/${item.artist}`}</span>
              <button
                className="relative rounded border p-1.5 text-sm font-bold"
                onClick={() => handleRemove(index)}
              >
                <MdDelete />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <SetListPreview />
    </div>
  );
}

function SetListPreview() {
  const [generatedText, setGeneratedText] = useState("");
  const liveStreamData = useAtomValue(liveStreamDataAtom);
  const data = useAtomValue(setListDataAtom);

  useEffect(() => {
    setGeneratedText(
      replacePlaceholders(setListTemplate, {
        liveTitle: liveStreamData.title,
        liveUrl: liveStreamData.url,
        setList: data.map((item, index) => ({
          number: zeroPadding(index + 1, String(data.length).length),
          music: item.music,
          artist: item.artist,
        })),
      }),
    );
  }, [liveStreamData, data]);

  const handlePost = () => {
    setMusicData(data);
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(generatedText)}`;
    window.open(url, "_blank");
  };
  return (
    <div className="w-full">
      <div className="mb-2 h-52 w-full whitespace-pre-wrap rounded border border-gray-400 px-4 py-[0.62rem] text-sm">
        {data.length > 0 ? generatedText : ""}
      </div>
      <button
        className="w-full rounded border p-1.5 text-sm font-bold"
        onClick={() => handlePost()}
      >
        Tweet
      </button>
    </div>
  );
}

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col gap-10 md:flex-row md:gap-5">
        <PostGenerator />
        <SetListGenerator />
      </div>
    </Layout>
  );
}
