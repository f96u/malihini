// import { GoogleGenerativeAI } from '@google/generative-ai';

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '');

async function run() {
  // const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' })
  // const prompt = "Gemini APIについて教えてください。"

  // NOTE: CIのためにコメントアウト
  // const result = await model.generateContent(prompt)
  // const response = await result.response
  // const text = response.text()
  // return text
  return 'Gemini APIは、Googleが提供する自然言語生成AIです。'
}

export default async function GeminiSample() {
  const apiResult = await run()
  return (
    <div>
      {apiResult}
    </div>
  )
}