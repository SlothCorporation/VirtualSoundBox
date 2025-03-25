import { atomWithStorage, createJSONStorage } from "jotai/utils";

type liveStreamData = {
  title: string;
  url: string;
};

type setListData = {
  music: string;
  artist: string;
};

const sessionStorageSetListData = () => {
  if (typeof window !== "undefined") {
    return createJSONStorage<setListData[]>(() => window.sessionStorage);
  }
  return undefined;
};

const sessionStorageLiveStreamData = () => {
  if (typeof window !== "undefined") {
    return createJSONStorage<liveStreamData>(() => window.sessionStorage);
  }
  return undefined;
};

export const liveStreamDataAtom = atomWithStorage(
  "liveStreamDataAtom",
  {
    title: "",
    url: "",
  },
  sessionStorageLiveStreamData(),
);

export const setListDataAtom = atomWithStorage<setListData[]>(
  "setListDataAtom",
  [],
  sessionStorageSetListData(),
);
