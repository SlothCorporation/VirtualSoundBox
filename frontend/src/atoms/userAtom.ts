import { atom } from "jotai";

type User = {
  uuid: string;
  name: string;
  email: string;
  plan: string;
  admin_flg: number;
};

export const userAtom = atom<User | null | undefined>(undefined);
