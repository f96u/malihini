'use client'
import { useEffect, useState } from "react"

export default function GeminiSample() {
  const [ apiResult, setApiResult ] = useState('')
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: 'Hello, Gemini!' }),
      })
      const reader = res.body?.getReader()
      if (!reader) return
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader?.read()
        if (done) break
        setApiResult(apiResult => apiResult + decoder.decode(value))
      }
    }
    )()
  }, [])
  return (
    <div>
      {apiResult}
    </div>
  )
}