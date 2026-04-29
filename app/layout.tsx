import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AutoParts EU',
  description: 'Подбор автозапчастей из Европы'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
