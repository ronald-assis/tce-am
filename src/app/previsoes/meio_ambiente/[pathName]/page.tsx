'use client'
import { usePathname } from 'next/navigation'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export default function Previsoes() {
  const path = usePathname()
  let title = ''
  if (path === '/previsoes/meio_ambiente/qualidade_do_ar') {
    title = 'previsões > meio ambiente > qualidade do ar'
  } else if (path === '/previsoes/meio_ambiente/desmatamento') {
    title = 'previsões > meio ambiente > desmatamento'
  }

  return (
    <>
      <Header title={title.toUpperCase()} />
      <Footer />
    </>
  )
}
