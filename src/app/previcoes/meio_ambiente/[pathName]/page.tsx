'use client'
import { usePathname } from 'next/navigation'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export default function Previcoes() {
  const path = usePathname()
  let title = ''
  if (path === '/previcoes/meio_ambiente/qualidade_do_ar') {
    title = 'previções > meio ambiente > qualidade do ar'
  } else if (path === '/previcoes/meio_ambiente/desmatamento') {
    title = 'previções > meio ambiente > desmatamento'
  }

  return (
    <>
      <Header title={title.toUpperCase()} />
      <Footer />
    </>
  )
}
