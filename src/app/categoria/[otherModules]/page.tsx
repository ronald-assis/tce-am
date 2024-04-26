'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AxiosError } from 'axios'
import { DotLoader } from 'react-spinners'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getUser } from '@/lib/user'
import { api } from '@/lib/api'

interface CategoryType {
  id_categoria: string
  nome_categoria: string
  desc_categoria: string
  itens_categoria: string
  url_dashboard_simples: string
  url_dashboard_completa: string
}

interface ResponseCategoriesType {
  paginaAtual: number
  registroPorPagina: number
  conteudo: CategoryType[]
}

interface PUCategoryType {
  id_categoria: string
  nome_categoria: string
  desc_categoria: string
  itens_categoria: string
  url_simples: string
  url_completa: string
}
interface PermissionUsertype {
  categoria: PUCategoryType
  id_categoria: string
}

export default function OtherModules() {
  const [loading, setLoading] = useState(false)
  const [dashboardUrl, setDashboardUrl] = useState<string | undefined>('')
  const path = usePathname()

  useEffect(() => {
    const user = getUser()
    setLoading(true)

    if (user.admin === 1) {
      api
        .get('/categorias')
        .then(({ data }) => {
          const response: ResponseCategoriesType = data
          const url = response.conteudo.find((c) =>
            path.includes('fraudes')
              ? c.nome_categoria.includes('fraudes')
              : path.includes('indicadores') &&
                c.nome_categoria.includes('Indicadores'),
          )
          setDashboardUrl(url?.url_dashboard_completa)
          setTimeout(() => {
            setLoading(false)
          }, 1500)
        })
        .catch((e) => {
          const error = e as AxiosError | Error
          if (error instanceof AxiosError) {
            console.error(error.response?.data)
          }
        })
    }

    if (user.admin !== 1) {
      api
        .get(`/usuarios-permissao/${user.id_usuario}`)
        .then(({ data }) => {
          const response: PermissionUsertype[] = data
          const url = response.find((c) =>
            path.includes('fraudes')
              ? c.categoria.nome_categoria.includes('fraudes')
              : path.includes('indicadores') &&
                c.categoria.nome_categoria.includes('Indicadores'),
          )
          setDashboardUrl(url?.categoria.url_completa)
          setTimeout(() => {
            setLoading(false)
          }, 1500)
        })
        .catch((e) => {
          const error = e as AxiosError | Error
          if (error instanceof AxiosError) {
            console.error(error.response?.data)
          }
        })
    }
  }, [path])

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
        {loading && (
          <DotLoader
            className="left-1/2 top-40"
            color="#3667d6"
            size={100}
            speedMultiplier={3}
          />
        )}
        <iframe
          className={`${loading ? 'hidden' : 'flex'} m-auto h-[44rem] w-11/12`}
          src={dashboardUrl}
          frameBorder="0"
        ></iframe>
      </main>
      <Footer />
    </>
  )
}
