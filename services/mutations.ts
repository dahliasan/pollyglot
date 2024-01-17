import { useMutation } from '@tanstack/react-query'
import { fetchTranslation } from './api'
import { useChatStore } from './store'
import { TranslationInputs } from '@/types/chat'

export const useFetchTranslation = () => {
  const { addMessage } = useChatStore()

  return useMutation({
    mutationFn: (data: TranslationInputs) => fetchTranslation(data),
    onMutate: () => {
      console.log('mutate')
    },
    onError: () => {
      console.log('error')
      addMessage({
        role: 'assistant',
        content: 'Sorry! Something went wrong. Please try again later.',
      })
    },
    onSuccess: (data) => {
      addMessage({
        role: 'assistant',
        content: data.message.content,
      })
    },
  })
}
