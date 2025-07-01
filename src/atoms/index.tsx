import { atom, PrimitiveAtom } from 'jotai'

type get = (_: PrimitiveAtom<number>) => number

export const countAtom = atom(0);
export const countMinusAtom = atom<number>((get: get) => get(countAtom) * -1);

// 場所の情報を管理するatom
export interface Location {
  lat: number;
  lng: number;
  name: string;
  address?: string;
  placeId?: string;
  rating?: number;
  types?: string[];
}

export const locationsAtom = atom<Location[]>([]);
