'use client'

import { usePathname } from 'next/navigation'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function OtherModules() {
  const title = usePathname()
  return (
    <>
      <Header title={title.toUpperCase()} />
      <Footer />
    </>
  )
}
