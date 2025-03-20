import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Emotional Connect',
  description: 'online dating by using advanced emotion AI to help people form deeper, more meaningful connections',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
