import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export const ParrotAvatar = ({ ...props }) => {
  return (
    <Avatar {...props}>
      <AvatarImage src={'/parrot.png'} alt='@pollyglot' />
      <AvatarFallback>PG</AvatarFallback>
    </Avatar>
  )
}

export const UserAvatar = ({ ...props }) => {
  return (
    <Avatar {...props}>
      <AvatarImage src='/parrot-dalle2.png' alt='@user' />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  )
}
