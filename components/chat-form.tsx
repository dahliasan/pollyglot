'use client'
/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/9xN1wT7WokO
 */
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import Hero from './hero'
import { UserMessage, AppMessage } from './messages'
import { ScrollArea } from '@/components/ui/scroll-area'
import * as React from 'react'
import { useChat } from 'ai/react'
import {
  assistantMessage,
  generateUserChatMessage,
  initialChatMessages,
} from '@/lib/prompts'
import { ChatMessageProps } from '@/types/chat'
import { Message } from 'ai'

const languageButtons = [
  {
    label: '🇫🇷 French',
    value: 'french',
  },
  {
    label: '🇪🇸 Spanish',
    value: 'spanish',
  },
  {
    label: '🇯🇵 Japanese',
    value: 'japanese',
  },
  {
    label: '🇲🇾 Malay',
    value: 'malay',
  },
]

export function ChatForm() {
  const scrollAreaRef = React.useRef<HTMLDivElement | null>(null)
  const [language, setLanguage] = React.useState('french')
  const [UIMessages, setUIMessages] = React.useState<ChatMessageProps[]>([
    assistantMessage,
  ])
  const chatPairs = React.useRef(0)

  const {
    messages,
    append,
    isLoading,
    input,
    setInput,
    handleInputChange,
    data,
    setMessages,
  } = useChat({
    api: '/api/chat',
    initialInput: 'hello how are you?',
    initialMessages: initialChatMessages as Message[],
    onFinish: (message) => {
      setUIMessages((prev) => {
        return [
          ...prev,
          {
            ...message,
            audioIndex: chatPairs.current,
          },
        ]
      })
      chatPairs.current++
    },
  })

  const audioData = data as { audio: string }[]

  const handleSubmit = async () => {
    if (!input) return

    const userMessage = generateUserChatMessage(input, language)
    setUIMessages((prev) => [
      ...prev,
      {
        role: 'user',
        content: input,
      },
    ])
    setInput('')

    await append(userMessage)
  }

  const handleLanguageChange = (language: string) => {
    setLanguage(language)
  }

  const reset = () => {
    setMessages(initialChatMessages)
    setUIMessages([assistantMessage])
    setInput('hello how are you?')
  }

  React.useEffect(() => {
    const scrollArea = scrollAreaRef.current
    if (scrollArea) {
      const viewport = scrollArea.querySelector(
        '[data-radix-scroll-area-viewport]'
      )
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight
      }
    }
  }, [messages])

  return (
    <div
      key='1'
      className='flex flex-col h-full w-full max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md'
    >
      <Hero />
      <ScrollArea
        ref={scrollAreaRef}
        className='min-h-[200px] h-[50vh] px-4 py-2'
      >
        {UIMessages.map((message, i) => {
          if (message.role === 'user') {
            return (
              <UserMessage key={i}>
                {typeof message.content === 'string' && message.content}
              </UserMessage>
            )
          } else {
            return (
              <AppMessage key={i}>
                {typeof message.content === 'string' && message.content}
                {audioData &&
                  audioData.length > 0 &&
                  message.audioIndex !== undefined && (
                    <audio
                      className='mt-4 h-[40px] '
                      controls
                      autoPlay
                      src={`data:audio/mp3;base64,${
                        audioData[message.audioIndex].audio
                      }`}
                    />
                  )}
              </AppMessage>
            )
          }
        })}
        {isLoading && (
          <AppMessage>
            {messages[messages.length - 1].role === 'assistant'
              ? messages[messages.length - 1].content + ' \n\n...'
              : 'Thinking...'}
          </AppMessage>
        )}
      </ScrollArea>
      <div className='flex flex-col space-y-4 px-2 py-4 border-t-2'>
        <div className='flex gap-2 flex-wrap'>
          {languageButtons.map((button) => (
            <Button
              key={button.value}
              className='text-xs h-8'
              variant={button.value === language ? 'default' : 'outline'}
              onClick={() => {
                handleLanguageChange(button.value)
              }}
            >
              {button.label}
            </Button>
          ))}
        </div>
        <div className='flex gap-4 items-stretch'>
          <Textarea
            className='max-h-[6em] overflow-auto min-h-[1em]'
            placeholder='Type your message here...'
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                handleSubmit()
              }
            }}
          />
          <div>
            <Button
              type='button'
              onClick={() => {
                handleSubmit()
              }}
              disabled={isLoading || !input}
              className='w-full'
            >
              Send
            </Button>

            <Button
              variant={'link'}
              onClick={() => reset()}
              className='w-full mt-px'
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
