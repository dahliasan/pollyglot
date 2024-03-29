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
import { useChatStore } from '@/services/store'
import { useCompletion } from 'ai/react'

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
    label: '❓ to English',
    value: 'english',
  },
]

export function ChatFormCompletion() {
  const scrollAreaRef = React.useRef<HTMLDivElement | null>(null)
  const { messages, language, setLanguage, addMessage, reset } = useChatStore()

  const {
    completion,
    complete,
    isLoading,
    input: textToTranslate,
    setInput: setTextToTranslate,
    handleInputChange,
    data,
  } = useCompletion({
    api: '/api/translate',
    initialInput: 'hello how are you?',
  })

  const handleSubmit = async () => {
    addMessage({ role: 'user', content: textToTranslate })
    const completion = await complete(textToTranslate, {
      body: {
        language,
      },
    })

    if (completion) {
      addMessage({ role: 'assistant', content: completion })
    }

    setTextToTranslate('')
  }

  const handleLanguageChange = (language: string) => {
    setLanguage(language)
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
  }, [messages, textToTranslate, data])

  return (
    <div
      key='1'
      className='flex flex-col h-full w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md'
    >
      <Hero />
      <ScrollArea ref={scrollAreaRef} className='min-h-[200px] h-[40vh] p-4'>
        {messages.map((message, i) => {
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
              </AppMessage>
            )
          }
        })}
        {isLoading && (
          <AppMessage>{completion ? completion : 'Translating...'}</AppMessage>
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
            value={textToTranslate}
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
              disabled={isLoading || !textToTranslate}
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
