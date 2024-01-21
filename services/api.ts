import OpenAI from 'openai'
import {
  ChatCompletionSystemMessageParam,
  ChatCompletionUserMessageParam,
} from 'openai/resources/index.mjs'
import { TranslationInputs } from '@/types/chat'

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
})

export const fetchTranslation = async (data: TranslationInputs) => {
  const { textToTranslate, language } = data

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

  return completion.choices[0]
}
