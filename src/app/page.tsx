'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Card } from '@/components/Card'
import { Header } from '@/components/Header'
import { useState } from 'react'
import { NameIcons } from '@/components/Icons'
import { Button } from '@/components/Button'

type PropToCardType = {
  title: string
  icon: NameIcons
  sizeIcon: number
  to?: string
  sub_category?: string
  admin?: number
}

export default function Home() {
  const [showCards, setShowCards] = useState(false)
  const [showNaturalEnvironment, setNaturalEnvironment] = useState(false)
  const [showShortages, setShortages] = useState(false)
  const pathName = usePathname()

  const handleShowCardCategory = () => {
    setShowCards(!showCards)
    setNaturalEnvironment(false)
    setShortages(false)
  }

  const titles: PropToCardType[] = [
    {
      title: 'Tipologia de Fraudes em Licitações e Contratos',
      icon: 'liaFileContractSolid',
      sizeIcon: 88,
      to: '/tipologia_de_fraudes_em_licitacoes_e_contrato',
      admin: 1,
    },
    {
      title: 'Predições',
      icon: 'liaFileContractSolid',
      sizeIcon: 88,
      admin: 1,
    },
    {
      title: 'Indicadores de Políticas Publicas',
      icon: 'liaFileContractSolid',
      sizeIcon: 88,
      to: '/indicadores_de_politicas_publicas',
      admin: 1,
    },
  ]

  const subCategories: PropToCardType[] = [
    {
      title: 'Desabastecimento',
      icon: 'siSpond',
      sizeIcon: 64,
      sub_category: 'desabastecimento',
      admin: 1,
    },
    {
      title: 'Meio Ambiente',
      icon: 'faEnvira',
      sizeIcon: 64,
      sub_category: 'meio_ambiente',
      admin: 1,
    },
  ]

  const shortages: PropToCardType[] = [
    {
      title: 'Medicação',
      icon: 'giMedicines',
      sizeIcon: 44,
      sub_category: 'desabastecimento',
      admin: 1,
    },
    {
      title: 'Merenda escolar',
      icon: 'giMeal',
      sizeIcon: 44,
      sub_category: 'meio_ambiente',
      admin: 1,
    },
  ]

  const naturalEnvironment: PropToCardType[] = [
    {
      title: 'Qualidade do Ar',
      icon: 'siAirFlow',
      sizeIcon: 44,
      sub_category: 'desabastecimento',
      admin: 1,
    },
    {
      title: 'Desmatamento',
      icon: 'giBurningTree',
      sizeIcon: 44,
      sub_category: 'meio_ambiente',
      admin: 1,
    },
  ]
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

  return (
    <>
      <Header homePage title="PAINEL DE TRABALHO DO AUDITOR" />
      <main className="relative flex min-h-screen flex-col items-center justify-center  bg-gray-200">
        <div
          className={`${showCards ? 'mt-40' : ''} flex w-3/4 items-center justify-center gap-6`}
        >
          {titles.map((t, i) =>
            t.to ? (
              <Button
                className={`${t.admin === 1 ? 'cursor-not-allowed' : 'cursor-pointer'} h-64 w-72 cursor-not-allowed xl:w-80`}
                key={i}
                disabled
              >
                <Link
                  href={t.admin !== 1 ? '' : `/categoria/${pathName}${t.to}`}
                  className={`${t.admin !== 1 ? 'cursor-not-allowed' : 'cursor-pointer'} h-full w-full`}
                >
                  <Card
                    title={t.title}
                    sizeIcon={t.sizeIcon}
                    className={`${t.admin === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}  disabled:hover:-translate-none motion-reduce:translate-none w-full disabled:bg-blue_warm-20`}
                    icon={t.icon}
                    disabled
                  />
                </Link>
              </Button>
            ) : (
              <Card
                key={i}
                title={t.title}
                sizeIcon={t.sizeIcon}
                className={`${showCards ? '-translate-y-2  scale-105 bg-blue_warm-80' : ''} h-56 w-64 xl:w-80`}
                icon={t.icon}
                onClick={handleShowCardCategory}
              />
            ),
          )}
        </div>

        {showCards && (
          <div
            className={`${showShortages || showNaturalEnvironment ? 'mb-0' : 'mb-28'} mt-8 flex gap-5`}
          >
            {subCategories.map((s, i) => (
              <Card
                key={i}
                title={s.title}
                sizeIcon={s.sizeIcon}
                icon={s.icon}
                className={`${changeClassName(s.sub_category)} w-72`}
                onClick={showSubCategories(s.sub_category)}
              />
            ))}
          </div>
        )}

        {showShortages && (
          <div className="mb-44 mt-8 flex gap-3">
            {shortages.map((s, i) => (
              <Card
                key={i}
                title={s.title}
                sizeIcon={s.sizeIcon}
                icon={s.icon}
                className="h-24 w-60"
              />
            ))}
          </div>
        )}

        {showNaturalEnvironment && (
          <div className="mb-44 mt-8 flex gap-3">
            {naturalEnvironment.map((s, i) => (
              <Card
                key={i}
                title={s.title}
                sizeIcon={s.sizeIcon}
                icon={s.icon}
                className="h-24 w-60"
              />
            ))}
          </div>
        )}
      </main>
    </>
  )
}
