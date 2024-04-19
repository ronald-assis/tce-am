'use client'

import { usePathname } from 'next/navigation'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function OtherModules() {
  const path = usePathname()
  let title = ''

  if (path === '/categoria/tipologia_de_fraudes_em_licitacoes_e_contrato') {
    title = 'Tipologia de Fraudes em Licitações e Contratos'
  } else if (path === '/categoria/indicadores_de_politicas_publicas') {
    title = 'Indicadores de Políticas Publicas'
  }

  return (
    <>
      <Header title={title.toUpperCase()} />
      <main className="mt-40 w-full ">
        <iframe
          className="m-auto h-[43rem] w-11/12"
          src="https://bigdata.redmaxx.com.br/b/dashboard-tce-am-fraudes-licitacoes-contratos"
          frameBorder="0"
        ></iframe>
      </main>
      <Footer />
    </>
  )
}
