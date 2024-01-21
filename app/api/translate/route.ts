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
  baseURL: 'https://oai.hconeai.com/v1',
  defaultHeaders: {
    'Helicone-Auth': process.env.HELICONE_AUTH,
  },
})

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { prompt: textToTranslate, language } = await req.json()
  console.log(textToTranslate, language)

  const systemMessage: ChatCompletionSystemMessageParam = {
    role: 'system',
    content:
      'You are a helpful translation assistant that translates text into the requested language. In your response only return the translated text. The text to translate and language to translate to will be provided within """. If the languge to translate is "english" then automatically detect what languge the original text is in and translate it to english.',
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
    model: 'gpt-3.5-turbo-1106',
    stream: true,
    messages: [systemMessage, userMessage],
    temperature: 0.8,
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)

  // Respond with the stream
  return new StreamingTextResponse(stream)
}
