import type { Metadata } from 'next'
import { Maven_Pro } from 'next/font/google'
import './globals.css'

const mavenpro = Maven_Pro({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pollyglot',
  description: 'Get a perfect translation everytime!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={mavenpro.className}>{children}</body>
    </html>
  )
}
