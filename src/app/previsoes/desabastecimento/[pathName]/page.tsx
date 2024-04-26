'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AxiosError } from 'axios'
import { DotLoader } from 'react-spinners'

import { api } from '@/lib/api'
import { getUser } from '@/lib/user'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

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

export default function Previsoes() {
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
            path.includes('medicacao')
              ? c.itens_categoria.includes('Medicação')
              : path.includes('escolar') &&
                c.itens_categoria.includes('Escolar'),
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
            path.includes('medicacao')
              ? c.categoria.itens_categoria.includes('Medicação')
              : path.includes('escolar') &&
                c.categoria.itens_categoria.includes('Escolar'),
          )
          setDashboardUrl(url?.categoria.url_completa)
          setTimeout(() => {
            setLoading(false)
          }, 2500)
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

  if (path === '/previsoes/desabastecimento/medicacao') {
    title = 'previsões - desabastecimento - Medicação'
  } else if (path === '/previsoes/desabastecimento/merenda_escolar') {
    title = 'previsões - desabastecimento - merenda escolar'
  }

  console.log(dashboardUrl)

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
          src={''}
          frameBorder="0"
        ></iframe>
      </main>
      <Footer />
    </>
  )
}
