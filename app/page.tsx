'use client'
import { ChatForm } from '@/components/chat-form'
import { ReactQueryProvider } from './react-query-provider'

export default function Home() {
  return (
    <ReactQueryProvider>
      <main className='flex h-screen sm:h-auto flex-col items-center justify-between sm:py-6 sm:px-4'>
        <ChatForm />
      </main>
    </ReactQueryProvider>
  )
}
