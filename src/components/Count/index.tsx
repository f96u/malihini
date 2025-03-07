'use client'

import { countAtom, countMinusAtom } from "@/atoms"
import { useAtom } from "jotai"

export const Count = () => {
  const [countState, setCountState] = useAtom(countAtom)
  const [countMinusState] = useAtom(countMinusAtom)
  return (
    <div>
      <p suppressHydrationWarning>countState: {countState}</p>
      <p suppressHydrationWarning>countMinusState: {countMinusState}</p>
      <button onClick={() => setCountState((c) => c + 1)}>Count Up !</button>
    </div>
  )
}