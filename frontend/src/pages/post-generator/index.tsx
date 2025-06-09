import Layout from "@/components/Layout";
import Input from "@/components/Form/Input";
import {
  setListDataAtom,
  liveStreamDataAtom,
} from "@/atoms/postGenerator/atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import type { DependencyList, EffectCallback } from "react";
import { useCallback, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import {
  fetchYoutubeData,
  fetchSuggestedMusic,
  setMusicData,
  fetchTemplates,
} from "@/hooks/postGenerator/api";
import { replacePlaceholders } from "@/lib/post-generator";
import { userAtom } from "@/atoms/userAtom";
import Link from "next/link";

const musicTemplate = `🎤{{number}}:{{music}}/{{artist}}🎶

{{liveTitle}}
{{liveUrl}} @YouTubeより`;

const streamTemplate = `{{liveTitle}}
{{liveUrl}} @YouTubeより`;

const setListTemplate = `{{liveTitle}}
{{liveUrl}} @YouTubeより

本日のセトリ
@{{setList}}
{{number}}:{{music}}/{{artist}}
@{{end}}`;

function zeroPadding(NUM: number, LEN: number) {
  return (Array(LEN).join("0") + NUM).slice(-LEN);
}

function useDelayedEffect(
  effect: EffectCallback,
  deps: DependencyList,
  timeout: number = 1000,
) {
  useEffect(() => {
    const timeoutId = setTimeout(effect, timeout);

    return () => clearTimeout(timeoutId);
  }, deps);
}
type Template = {
  uuid: string;
  user_uuid: string;
  type: "music" | "list";
  name: string;
  content: string;
  created_at: string;
  updated_at: string;
};

type PostGeneratorProps = {
  musicTemplates: Array<Template>;
};

function PostGenerator({ musicTemplates = [] }: PostGeneratorProps) {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [music, setMusic] = useState("");
  const [artist, setArtist] = useState("");
  const [content, setContent] = useState(musicTemplate);
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

  useDelayedEffect(
    () => {
      suggestedMusic();
    },
    [music, artist, suggestedMusic],
    300,
  );

  const handleSuggest = async (item: { name: string; artist: string }) => {
    setMusic(item.name);
    setArtist(item.artist);
    setIsFocus({ music: false, artist: false });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUuid = e.target.value;

    if (selectedUuid === "default") {
      setContent(musicTemplate); // defaultの場合はmusicTemplateを設定
    } else {
      const selectedTemplate = musicTemplates.find(
        (template) => template.uuid === selectedUuid,
      );
      if (selectedTemplate) {
        setContent(selectedTemplate.content);
      }
    }
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
      {musicTemplates.length > 0 && (
        <div>
          <select
            className="w-full rounded border p-1.5 text-sm"
            onChange={handleSelectChange}
          >
            <option value="default">デフォルト</option>
            {musicTemplates.map((template) => (
              <option key={template.uuid} value={template.uuid}>
                {template.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <PostPreview template={content} />
    </div>
  );
}

type PostPreviewProps = {
  template: string;
};

function PostPreview({ template }: PostPreviewProps) {
  const [generatedText, setGeneratedText] = useState("");
  const liveStreamData = useAtomValue(liveStreamDataAtom);
  const data = useAtomValue(setListDataAtom);

  useEffect(() => {
    setGeneratedText(
      replacePlaceholders(data.length > 0 ? template : streamTemplate, {
        number: String(data.length),
        music: data.slice(-1)[0]?.music,
        artist: data.slice(-1)[0]?.artist,
        liveTitle: liveStreamData.title,
        liveUrl: liveStreamData.url,
      }),
    );
  }, [liveStreamData, data, template]);

  const handlePost = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(generatedText)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full">
      <div className="mb-2 h-52 w-full overflow-y-scroll whitespace-pre-wrap rounded border border-gray-400 px-4 py-[0.62rem] text-sm">
        {(data.length > 0 || liveStreamData.url) && generatedText}
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

type setListGeneratorProps = {
  setListTemplates: Array<Template>;
};

function SetListGenerator({ setListTemplates = [] }: setListGeneratorProps) {
  const [listData, setListData] = useAtom(setListDataAtom);
  const [content, setContent] = useState(setListTemplate);

  const handleRemove = (index: number) => {
    setListData((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUuid = e.target.value;

    if (selectedUuid === "default") {
      setContent(musicTemplate); // defaultの場合はmusicTemplateを設定
    } else {
      const selectedTemplate = setListTemplates.find(
        (template) => template.uuid === selectedUuid,
      );
      if (selectedTemplate) {
        setContent(selectedTemplate.content);
      }
    }
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <div>
        <span>セットリスト</span>
        {setListTemplates.length > 0 && (
          <div>
            <select
              className="w-full rounded border p-1.5 text-sm"
              onChange={handleSelectChange}
            >
              <option value="default">デフォルト</option>
              {setListTemplates.map((template) => (
                <option key={template.uuid} value={template.uuid}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>
        )}
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
      <SetListPreview template={content} />
    </div>
  );
}

type SetListPreviewProps = {
  template: string;
};

function SetListPreview({ template }: SetListPreviewProps) {
  const [generatedText, setGeneratedText] = useState("");
  const liveStreamData = useAtomValue(liveStreamDataAtom);
  const data = useAtomValue(setListDataAtom);

  useEffect(() => {
    setGeneratedText(
      replacePlaceholders(template, {
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
      <div className="mb-2 h-52 w-full overflow-y-scroll whitespace-pre-wrap rounded border border-gray-400 px-4 py-[0.62rem] text-sm">
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

function Page() {
  const user = useAtomValue(userAtom);
  const [musicTemplates, setMusicTemplates] = useState([]);
  const [setListTemplates, setSetListTemplates] = useState([]);

  const loadTemplates = async () => {
    const data = await fetchTemplates();
    setMusicTemplates(
      data.filter((template: Template) => template.type === "music"),
    );
    setSetListTemplates(
      data.filter((template: Template) => template.type === "list"),
    );
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  return (
    <Layout>
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">ポストジェネレーター</h1>
        {user && (
          <div className="mb-4 flex justify-end">
            <Link
              href="/post-generator/edit/"
              className="text-blue-600 underline"
            >
              テンプレートの編集
            </Link>
          </div>
        )}
        <div className="flex flex-col gap-10 md:flex-row md:gap-5">
          <PostGenerator musicTemplates={musicTemplates} />
          <SetListGenerator setListTemplates={setListTemplates} />
        </div>
      </div>
    </Layout>
  );
}

export default Page;
