import { CreateMessage } from 'ai'

export type MessageProps = {
  className?: string
  children: React.ReactNode
}

export type TranslationInputs = {
  textToTranslate: string
  language: string
}

export type ChatMessageProps = CreateMessage & {
  audioIndex?: number
}
