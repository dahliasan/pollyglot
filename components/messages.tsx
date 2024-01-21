import { MessageProps } from '@/types/chat'
import { ParrotAvatar, UserAvatar } from './avatars'
import { cn } from '@/lib/utils'

export const AppMessage = ({ children, className, ...props }: MessageProps) => {
  return (
    <div
      className={cn('flex items-end justify-start mb-4', className)}
      {...props}
    >
      <div className='flex flex-col space-y-1 text-sm sm:text-base max-w-sm mx-2 order-2 items-start'>
        <div>
          <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-sky-950 text-white'>
            {children}
          </span>
        </div>
      </div>
      <ParrotAvatar className='order-1 bg-blue-100' />
    </div>
  )
}

export const UserMessage = ({
  children,
  className,
  ...props
}: MessageProps) => {
  return (
    <div
      className={cn('flex items-end justify-end mb-4', className)}
      {...props}
    >
      <div className='flex flex-col space-y-1 text-sm sm:text-base max-w-sm mx-2 order-1 items-end'>
        <div>
          <span className='px-4 py-2 rounded-lg inline-block rounded-br-none bg-sky-200 text-black'>
            {children}
          </span>
        </div>
      </div>
      <UserAvatar className='order-2' />
    </div>
  )
}
