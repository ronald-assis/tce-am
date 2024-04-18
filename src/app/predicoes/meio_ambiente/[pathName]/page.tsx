'use client'
import { usePathname } from 'next/navigation'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export default function Predicoes() {
  const path = usePathname()
  let title = ''
  if (path === '/predicoes/meio_ambiente/qualidade_do_ar') {
    title = 'precições > meio ambiente > qualidade do ar'
  } else if (path === '/predicoes/meio_ambiente/desmatamento') {
    title = 'precições > meio ambiente > desmatamento'
  }

  return (
    <>
      <Header title={title.toUpperCase()} />
      <Footer />
    </>
  )
}
