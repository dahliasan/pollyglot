'use client'
import { ChatForm } from '@/components/chat-form'
import { ReactQueryProvider } from './react-query-provider'

export default function Home() {
  return (
    <ReactQueryProvider>
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <ChatForm />
      </main>
    </ReactQueryProvider>
  )
}
