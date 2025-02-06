import { atom } from "jotai";

type liveStreamData = {
  title: string;
  url: string;
};

type setListData = {
  music: string;
  artist: string;
};

export const liveStreamDataAtom = atom<liveStreamData>({
  title: "",
  url: "",
});
export const setListDataAtom = atom<setListData[]>([]);
