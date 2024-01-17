import OpenAI from 'openai'
import {
  ChatCompletionUserMessageParam,
  ChatCompletionSystemMessageParam,
} from 'openai/resources/index.mjs'

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})

export async function POST(request: Request) {
  const { textToTranslate, language } = request.body

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

  const completion = await openai.chat.completions.create({
    model: 'gpt-4-1106-preview',
    messages: [systemMessage, userMessage],
  })

  return Response.json(completion.choices[0])
}
