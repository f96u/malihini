import { atom, PrimitiveAtom } from 'jotai'

type get = (_: PrimitiveAtom<number>) => number

export const countAtom = atom(0);
export const countMinusAtom = atom<number>((get: get) => get(countAtom) * -1);
