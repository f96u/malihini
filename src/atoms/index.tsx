import { atom } from 'jotai'

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
