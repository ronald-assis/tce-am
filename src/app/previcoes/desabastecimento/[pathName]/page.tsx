'use client'
import { usePathname } from 'next/navigation'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export default function Previcoes() {
  const path = usePathname()
  let title = ''

  if (path === '/previcoes/desabastecimento/medicacao') {
    title = 'previções > desabastecimento > Medicação'
  } else if (path === '/previcoes/desabastecimento/merenda_escolar') {
    title = 'previções > desabastecimento > merenda escolar'
  }

  return (
    <>
      <Header title={title.toUpperCase()} />
      <Footer />
    </>
  )
}
