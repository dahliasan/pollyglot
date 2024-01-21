import { ChatFormCompletion } from '@/components/chat-form-completion'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between py-6 px-4'>
      <ChatFormCompletion />
    </main>
  )
}
