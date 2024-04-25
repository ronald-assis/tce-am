'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { Card } from '@/components/Card'
import { Header } from '@/components/Header'

import { api } from '@/lib/api'
import { getUser } from '@/lib/user'
import { Footer } from '@/components/Footer'
import { AxiosError } from 'axios'

type CategoriesType = {
  nome_categoria: string
  desc_categoria: string
  itens_categoria: string
  url_simples: string
  url_completa: string
}

interface UserPermissionResponseType {
  data: [
    {
      id_categoria: string
      categoria: CategoriesType
    },
  ]
}

interface PermissionTitle {
  nome_categoria: string[]
}

interface PermissionSubTitle {
  desc_categoria: string[]
}

interface PermissionItenSubTitle {
  itens_categoria: string[]
}

export default function Home() {
  const [showCards, setShowCards] = useState(false)
  const [showNaturalEnvironment, setNaturalEnvironment] = useState(false)
  const [showShortages, setShortages] = useState(false)
  const [title, setTitle] = useState<PermissionTitle>({ nome_categoria: [] })
  const [subTitle, setSubTitle] = useState<PermissionSubTitle>({
    desc_categoria: [],
  })
  const [itenSubTitle, setItenSubTitle] = useState<PermissionItenSubTitle>({
    itens_categoria: [],
  })

  const handleShowCardCategory = () => {
    setShowCards(!showCards)
    setNaturalEnvironment(false)
    setShortages(false)
  }

  useEffect(() => {
    const idUser = getUser().id_usuario
    api
      .get(`/usuarios-permissao/${idUser}`)
      .then(({ data }: UserPermissionResponseType) => {
        const nameCategories: string[] = []
        const descCategories: string[] = []
        const itemCategories: string[] = []

        data.forEach((category) => {
          nameCategories.push(category.categoria.nome_categoria)
          descCategories.push(category.categoria.desc_categoria)
          itemCategories.push(category.categoria.itens_categoria)
        })

        setTitle({ nome_categoria: nameCategories })
        setSubTitle({ desc_categoria: descCategories })
        setItenSubTitle({ itens_categoria: itemCategories })
      })
      .catch((e) => {
        const error = e as AxiosError | Error
        if (error instanceof AxiosError) {
          console.log(error.response?.data.message)
          if (error.response?.data.status === 'unauthorized') {
            window.location.reload()
          }
        }
      })
  }, [])

  const showSubCategories = (params?: string) => {
    return () => {
      if (params === 'desabastecimento') {
        setNaturalEnvironment(false)
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'instant',
        })

        return setShortages(!showShortages)
      }

      if (params === 'meio_ambiente') {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'instant',
        })
        setShortages(false)
        return setNaturalEnvironment(!showNaturalEnvironment)
      }
    }
  }

  const changeClassName = (params?: string) => {
    if (params === 'desabastecimento' && showShortages) {
      return '-translate-y-2  scale-105 bg-blue_warm-80'
    }

    if (params === 'meio_ambiente' && showNaturalEnvironment) {
      return '-translate-y-2  scale-105 bg-blue_warm-80'
    }
    return ''
  }

  const disabledWhenClickButtonCategory = (category: string): boolean => {
    return getUser().admin !== 1
      ? !title.nome_categoria.some((t) => t.includes(category))
      : false
  }

  const disabledWhenClickButtonSub = (category: string): boolean => {
    return getUser().admin !== 1
      ? !subTitle.desc_categoria.some((t) => t.includes(category))
      : false
  }

  return (
    <>
      <Header homePage title="PAINEL DE TRABALHO DO AUDITOR" />
      <Footer />
      <main className="relative flex min-h-screen flex-col items-center justify-center  bg-gray-200">
        <div
          className={`${showCards ? 'mt-40' : ''} flex w-3/4 items-center justify-center gap-6`}
        >
          <aside className={`h-56 w-72 xl:w-80`}>
            <Link
              href={
                getUser().admin === 1 ||
                title.nome_categoria.some((t) =>
                  t.includes('Tipologia de Fraudes em Licitações e Contratos'),
                )
                  ? `/categoria/tipologia_de_fraudes_em_licitacoes_e_contrato`
                  : ''
              }
              className={`h-full w-full cursor-not-allowed`}
            >
              <Card
                title={'Tipologia de Fraudes em Licitações e Contratos'}
                sizeIcon={88}
                className={`${showCards ? 'bg-blue_warm-20 hover:bg-blue_warm-20' : 'bg-blue_warm-70 hover:bg-blue_warm-80'}  disabled:hover:-translate-none motion-reduce:translate-none h-full w-full cursor-not-allowed disabled:bg-blue_warm-20`}
                icon={'liaFileContractSolid'}
                disabled={disabledWhenClickButtonCategory(
                  'Tipologia de Fraudes em Licitações e Contratos',
                )}
              />
            </Link>
          </aside>

          <a className="cursor-not-allowed">
            <Card
              title={'Previsões'}
              sizeIcon={88}
              className={`${showCards ? '-translate-y-2  scale-105 bg-blue_warm-80' : 'bg-blue_warm-70'} disabled:hover:-translate-none h-56 w-64 cursor-not-allowed disabled:bg-blue_warm-20 xl:w-80`}
              icon={'liaFileContractSolid'}
              onClick={handleShowCardCategory}
              disabled={
                getUser().admin !== 1
                  ? !title.nome_categoria.some((t) => t.includes('Previsões'))
                  : false
              }
            />
          </a>

          <aside className={`h-56 w-72 xl:w-80`}>
            <Link
              href={
                getUser().admin === 1 ||
                !title.nome_categoria.some((t) =>
                  t.includes('Indicadores de Políticas Publicas'),
                )
                  ? `/categoria/indicadores_de_politicas_publicas`
                  : ''
              }
              className={`h-full w-full cursor-not-allowed`}
            >
              <Card
                title={'Indicadores de Políticas Publicas'}
                sizeIcon={88}
                className={`${showCards ? 'bg-blue_warm-20 hover:bg-blue_warm-20' : 'bg-blue_warm-70 hover:bg-blue_warm-80'}  disabled:hover:-translate-none motion-reduce:translate-none h-full w-full cursor-not-allowed disabled:bg-blue_warm-20`}
                icon={'liaFileContractSolid'}
                disabled={disabledWhenClickButtonCategory(
                  'Indicadores de Políticas Publicas',
                )}
              />
            </Link>
          </aside>
        </div>

        <div className="flex w-[80%] flex-col items-center xl:w-[53%]">
          {showCards && (
            <div
              className={`${showShortages || showNaturalEnvironment ? 'mb-0' : 'mb-28'} mt-8 flex gap-5`}
            >
              <a className="cursor-not-allowed">
                <Card
                  title={'Desabastecimento'}
                  sizeIcon={64}
                  icon={'siSpond'}
                  className={`${changeClassName('desabastecimento')} ${showNaturalEnvironment ? 'bg-blue_warm-20 hover:bg-blue_warm-20' : 'bg-blue_warm-70 hover:bg-blue_warm-80'} w-72 disabled:bg-blue_warm-20`}
                  onClick={showSubCategories('desabastecimento')}
                  disabled={disabledWhenClickButtonSub('Desabastecimento')}
                />
              </a>

              <a className="cursor-not-allowed">
                <Card
                  title={'Meio Ambiente'}
                  sizeIcon={64}
                  icon={'faEnvira'}
                  className={`${changeClassName('meio_ambiente')} ${showShortages ? 'bg-blue_warm-20 hover:bg-blue_warm-20' : 'bg-blue_warm-70 hover:bg-blue_warm-80'} w-72 disabled:cursor-not-allowed disabled:bg-blue_warm-20`}
                  onClick={showSubCategories('meio_ambiente')}
                  disabled={disabledWhenClickButtonSub('Meio ambiente')}
                />
              </a>
            </div>
          )}

          {showShortages && (
            <div className="mb-44 mt-8 flex gap-3 self-start">
              <Link
                href={
                  getUser().admin === 1 ||
                  itenSubTitle.itens_categoria.some((t) =>
                    t.includes('Medicação'),
                  )
                    ? `/previsoes/desabastecimento/medicacao`
                    : ''
                }
                className={`h-full w-full cursor-not-allowed`}
              >
                <Card
                  title={'Medicação'}
                  sizeIcon={44}
                  icon={'giMedicines'}
                  className="h-24 w-60 bg-blue_warm-70 disabled:bg-blue_warm-20"
                  disabled={
                    getUser().admin !== 1
                      ? !itenSubTitle.itens_categoria.some((t) =>
                          t.includes('Medicação'),
                        )
                      : false
                  }
                />
              </Link>

              <Link
                href={
                  getUser().admin === 1 ||
                  itenSubTitle.itens_categoria.some((t) =>
                    t.includes('Merenda escolar'),
                  )
                    ? `/previsoes/desabastecimento/merenda_escolar`
                    : ''
                }
                className={`h-full w-full cursor-not-allowed`}
              >
                <Card
                  title={'Merenda Escolar'}
                  sizeIcon={44}
                  icon={'giMeal'}
                  className="h-24 w-60 bg-blue_warm-70 disabled:bg-blue_warm-20"
                  disabled={
                    getUser().admin !== 1
                      ? !itenSubTitle.itens_categoria.some((t) =>
                          t.includes('Merenda Escolar'),
                        )
                      : false
                  }
                />
              </Link>
            </div>
          )}

          {showNaturalEnvironment && (
            <div className="mb-44 mt-8 flex gap-3 self-end">
              <Link
                href={
                  getUser().admin === 1 ||
                  itenSubTitle.itens_categoria.some((t) =>
                    t.includes('Qualidade do ar'),
                  )
                    ? `/previsoes/meio_ambiente/qualidade_do_ar`
                    : ''
                }
                className={`h-full w-full cursor-not-allowed`}
              >
                <Card
                  title={'Qualidade do Ar'}
                  sizeIcon={44}
                  icon={'siAirFlow'}
                  className="h-24 w-60 bg-blue_warm-70 disabled:bg-blue_warm-20"
                  disabled={
                    getUser().admin !== 1
                      ? !itenSubTitle.itens_categoria.some((t) =>
                          t.includes('Qualidade do ar'),
                        )
                      : false
                  }
                />
              </Link>

              <Link
                href={
                  getUser().admin === 1 ||
                  itenSubTitle.itens_categoria.some((t) =>
                    t.includes('Desmatamento'),
                  )
                    ? '/previsoes/meio_ambiente/desmatamento'
                    : ''
                }
                className={`h-full w-full cursor-not-allowed`}
              >
                <Card
                  title={'Desmatamento'}
                  sizeIcon={44}
                  icon={'giBurningTree'}
                  className="h-24 w-60 bg-blue_warm-70 disabled:bg-blue_warm-20"
                  disabled={
                    getUser().admin !== 1
                      ? !itenSubTitle.itens_categoria.some((t) =>
                          t.includes('Desmatamento'),
                        )
                      : false
                  }
                />
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
