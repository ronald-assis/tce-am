'use client'
import { usePathname } from 'next/navigation'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export default function Predicoes() {
  const path = usePathname()
  let title = ''

  if (path === '/predicoes/desbastecimento/medicacao') {
    title = 'precições > desabastecimento > Medicação'
  } else if (path === '/predicoes/desabastecimento/merenda_escolar') {
    title = 'precições > desabastecimento > merenda escolar'
  }

  return (
    <>
      <Header title={title.toUpperCase()} />
      <Footer />
    </>
  )
}
