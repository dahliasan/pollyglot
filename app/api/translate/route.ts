import OpenAI from 'openai'
import {
  ChatCompletionSystemMessageParam,
  ChatCompletionUserMessageParam,
} from 'openai/resources/index.mjs'
import { OpenAIStream, StreamingTextResponse } from 'ai'

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { prompt: textToTranslate, language } = await req.json()
  console.log(textToTranslate, language)

  const systemMessage: ChatCompletionSystemMessageParam = {
    role: 'system',
    content:
      'You are a helpful translation assistant that translates text into the requested language. In your response only return the translated text. The text to translate and language to translate to will be provided within """.',
  }

  const userMessage: ChatCompletionUserMessageParam = {
    role: 'user',
    content: `
            """
            text to translate: ${textToTranslate}
            langauge to translate to: ${language}
            """`,
  }

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-4-1106-preview',
    stream: true,
    messages: [systemMessage, userMessage],
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)

  // Respond with the stream
  return new StreamingTextResponse(stream)
}