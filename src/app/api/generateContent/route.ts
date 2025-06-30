import { errorResponse } from '@/utils/errorResponse';
import { GoogleGenerativeAI } from '@google/generative-ai';

const MAX_PROMPT_LENGTH = 200

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '');

export async function POST(request: Request) {
  const { prompt } = await request.json()
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite', generationConfig: { maxOutputTokens: 100 } })
  if (prompt.length >= MAX_PROMPT_LENGTH) {
    return errorResponse('parameter', `Prompt exceeds maximum length of ${MAX_PROMPT_LENGTH} characters.`)
  }
  const result = await model.generateContentStream(prompt)
  return new Response(new ReadableStream({
    async pull(controller) {
      const { done, value } = await result.stream.next()
      if (done) {
        controller.close()
      } else {
        controller.enqueue(value.text())
      }
    },
  }))
}