import type { Metadata } from 'next'
import {
  Roboto_Flex as RobotoFlex,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'

const roboto = RobotoFlex({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
})

export const metadata: Metadata = {
  title: 'TCE - AM',
  description: 'Aplicação com base em Dashboard',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body
        suppressHydrationWarning={true}
        className={`@${roboto.variable} ${baiJamjuree.variable} font-sans`}
      >
        <Header />
        {children}
      </body>
    </html>
  )
}
