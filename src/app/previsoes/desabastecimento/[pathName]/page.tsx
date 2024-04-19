'use client'
import { usePathname } from 'next/navigation'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export default function Previsoes() {
  const path = usePathname()
  let title = ''

  if (path === '/previsoes/desabastecimento/medicacao') {
    title = 'previsões > desabastecimento > Medicação'
  } else if (path === '/previsoes/desabastecimento/merenda_escolar') {
    title = 'previsões > desabastecimento > merenda escolar'
  }

  return (
    <>
      <Header title={title.toUpperCase()} />
      <Footer />
    </>
  )
}
