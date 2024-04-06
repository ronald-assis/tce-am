'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Card } from '@/components/Card'
import { Header } from '@/components/Header'
import { useState } from 'react'
import { Footer } from '@/components/Footer'
import { NameIcons } from '@/components/Icons'

type PropToCardType = {
  title: string
  icon: NameIcons
  sizeIcon: number
  to?: string
  sub_category?: string
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
      icon: 'user',
      sizeIcon: 88,
      to: '/tipologia_de_fraudes_em_licitacoes_e_contrato',
    },
    {
      title: 'Predições',
      icon: 'user',
      sizeIcon: 88,
    },
    {
      title: 'Indicadores de Políticas Publicas',
      icon: 'user',
      sizeIcon: 88,
      to: '/indicadores_de_politicas_publicas',
    },
  ]

  const subCategories: PropToCardType[] = [
    {
      title: 'Desabastecimento',
      icon: 'graduationCap',
      sizeIcon: 88,
      sub_category: 'desabastecimento',
    },
    {
      title: 'Meio Ambiente',
      icon: 'wheat',
      sizeIcon: 88,
      sub_category: 'meio_ambiente',
    },
  ]

  const shortages: PropToCardType[] = [
    {
      title: 'Medicação',
      icon: 'graduationCap',
      sizeIcon: 88,
      sub_category: 'desabastecimento',
    },
    {
      title: 'Merenda escolar',
      icon: 'wheat',
      sizeIcon: 88,
      sub_category: 'meio_ambiente',
    },
  ]

  const naturalEnvironment: PropToCardType[] = [
    {
      title: 'Qualidade do Ar',
      icon: 'graduationCap',
      sizeIcon: 88,
      sub_category: 'desabastecimento',
    },
    {
      title: 'Desmatamento',
      icon: 'wheat',
      sizeIcon: 88,
      sub_category: 'meio_ambiente',
    },
  ]
  const showSubCategories = (params?: string) => {
    return () => {
      if (params === 'desabastecimento') {
        console.log('des')
        setNaturalEnvironment(false)
        return setShortages(!showShortages)
      }

      if (params === 'meio_ambiente') {
        console.log('meio')
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
      <Header title="PAINEL DE TRABALHO DO AUDITOR" />
      <main className="relative flex min-h-screen flex-col items-center justify-center  bg-gray-200">
        <div
          className={`${showCards ? 'mt-48' : ''} flex w-3/4 items-center justify-center gap-6`}
        >
          {titles.map((t, i) =>
            t.to ? (
              <Link href={`/${pathName}${t.to}`} key={i}>
                <Card
                  title={t.title}
                  sizeIcon={t.sizeIcon}
                  className="w-96"
                  icon={t.icon}
                />
              </Link>
            ) : (
              <Card
                key={i}
                title={t.title}
                sizeIcon={t.sizeIcon}
                className={`${showCards ? '-translate-y-2  scale-105 bg-blue_warm-80' : ''} w-96`}
                icon={t.icon}
                onClick={handleShowCardCategory}
              />
            ),
          )}
        </div>

        {showCards && (
          <div className="mt-8 flex gap-3">
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
                className="w-72"
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
                className="w-72"
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
