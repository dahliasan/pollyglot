import OpenAI from 'openai'
import {
  OpenAIStream,
  StreamingTextResponse,
  experimental_StreamData,
} from 'ai'

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  baseURL: 'https://oai.hconeai.com/v1',
  defaultHeaders: {
    'Helicone-Auth': process.env.HELICONE_AUTH!,
  },
})

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json()

  // Instantiate the StreamData. It works with all API providers.
  const data = new experimental_StreamData()

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-4-1106-preview',
    stream: true,
    messages: messages,
    temperature: 0.8,
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response, {
    async onCompletion(completion) {
      const mp3 = await openai.audio.speech.create({
        model: 'tts-1',
        voice: 'alloy',
        input: completion,
      })

      // Convert the audio file to a Base64 string
      const buffer = Buffer.from(await mp3.arrayBuffer())
      const base64Audio = buffer.toString('base64')

      // Append the Base64 audio to the StreamData
      data.append({
        audio: base64Audio,
      })
    },
    onFinal(completion) {
      // IMPORTANT! you must close StreamData manually or the response will never finish.
      data.close()
    },
    // IMPORTANT! until this is stable, you must explicitly opt in to supporting streamData.
    experimental_streamData: true,
  })

  // Respond with the stream
  return new StreamingTextResponse(stream, {}, data)
}
