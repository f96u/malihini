'use client'
import { Content } from "@google/generative-ai"
import { PaperPlaneIcon } from "@radix-ui/react-icons"
import { Form } from 'radix-ui'
import { useState } from "react"
import { useSetAtom } from 'jotai'
import { locationsAtom } from '@/atoms'
import { extractPlacesFromBotResponse } from '@/utils/placeExtractor'

export function ChatWidget() {
  const [history, setHistory] = useState<Content[]>([{
    role: 'bot',
    parts: [{ text: 'Hello! How can I help you today?' }],
  }])
  const [lastBotMessage, setLastBotMessage] = useState('')
  const setLocations = useSetAtom(locationsAtom)
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const prompt = e.currentTarget.message.value;
    setHistory(history => [...history, { role: 'user', parts: [{ text: prompt }] }])
    const res = await fetch('/api/generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    })
    const reader = res.body?.getReader()
    if (!reader) {
      return
    }
    const decoder = new TextDecoder()
    let generateChar = ''
    while (true) {
      const { done, value } = await reader?.read()
      if (done) {
        const finalMessage = generateChar
        setHistory(history => [...history, { role: 'bot', parts: [{ text: finalMessage }] }])
        setLastBotMessage('')
        
        // Botの応答から場所の情報を抽出して地図に追加
        try {
          const locations = await extractPlacesFromBotResponse(finalMessage)
          if (locations.length > 0) {
            setLocations(prev => [...prev, ...locations])
          }
        } catch (error) {
          console.error('Error extracting places from bot response:', error)
        }
        break
      }
      const decoded = decoder.decode(value)
      generateChar += decoded
      setLastBotMessage(generateChar)
    }
  }

  return (
    <div className="bg-black/10 p-4 rounded-md shadow-md">
      <ul>
        {history.map((content, i) => (
          <li key={i}>
            {content.parts.map((part, j) => (
              <span key={j} className={content.role === 'bot' ? 'text-left' : 'text-right'}>
                {part.text}
              </span>
            ))}
          </li>
        ))}
        <li>{lastBotMessage}</li>
      </ul>
      <Form.Root className="flex gap-2 w-full mt-4" onSubmit={handleSubmit}>
        <Form.Field asChild name="message">
          <Form.Control asChild>
            <input
              className="p-2.5 w-full inline-flex items-center justify-center rounded-sm text-sm text-white bg-black/10 shadow-sm hover:shadow-md forcus:shadow-lg"
              autoComplete="off"
              required
            />
			    </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button>
            <PaperPlaneIcon className="size-5" />
          </button>
		    </Form.Submit>
      </Form.Root>
    </div>
  )
}