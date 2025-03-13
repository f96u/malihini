import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '');

export async function POST(request: Request) {
  const { prompt } = await request.json()
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' })

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