import { create } from 'zustand'
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs'

// Define the store's state
interface StoreState {
  messages: ChatCompletionMessageParam[]
  language: string
  textToTranslate: string
}

// Define the store's actions
interface StoreActions {
  addMessage: (message: ChatCompletionMessageParam) => void
  reset: () => void
  setLanguage: (language: string) => void
  setTextToTranslate: (text: string) => void
}

// Combine the state and actions into one type
type Store = StoreState & StoreActions

const initialMessages: ChatCompletionMessageParam[] = [
  {
    role: 'assistant',
    content:
      'hello, I am pollyglot, choose a language and I will translate your text to english for you.',
  },
]

// Create the store
export const useChatStore = create<Store>((set) => ({
  messages: [...initialMessages],
  language: 'french',
  textToTranslate: 'hello how are you?',

  addMessage: (message: ChatCompletionMessageParam) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  reset: () =>
    set({
      messages: [...initialMessages],
    }),
  setLanguage: (language) => set({ language: language }),
  setTextToTranslate: (text) => set({ textToTranslate: text }),
}))
