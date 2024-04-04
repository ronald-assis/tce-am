'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import dynamicIconImports from 'lucide-react/dynamicIconImports'

import { Card } from '@/components/Card'
import { Header } from '@/components/Header'
import { useState } from 'react'

type PropToCardType = {
  title: string
  icon: keyof typeof dynamicIconImports
  sizeIcon: number
  to?: string
}

export default function Home() {
  const [showCards, setShowCards] = useState(false)
  const pathName = usePathname()

  const titles: PropToCardType[] = [
    {
      title: 'Tipologia de Fraudes em Licitações e Contratos',
      icon: 'graduation-cap',
      sizeIcon: 88,
      to: '/licitacoes_e_contrato',
    },
    {
      title: 'Predições',
      icon: 'graduation-cap',
      sizeIcon: 88,
    },
    {
      title: 'Indicadores de Políticas Publicas',
      icon: 'graduation-cap',
      sizeIcon: 88,
      to: '/indicadores_de_politicas_publicas',
    },
  ]

  const subCategories: PropToCardType[] = [
    {
      title: 'Desabastecimento',
      icon: 'pc-case',
      sizeIcon: 88,
    },
    {
      title: 'Meio Ambiente',
      icon: 'wheat',
      sizeIcon: 88,
    },
  ]

  return (
    <>
      <Header />
      <main className="relative flex min-h-screen flex-col items-center justify-center  bg-gray-200">
        <div className="flex w-3/4 items-center justify-center gap-6">
          {titles.map((t, i) =>
            t.to ? (
              <Link href={`/${pathName}${t.to}`} key={i}>
                <Card title={t.title} sizeIcon={t.sizeIcon} icon={t.icon} />
              </Link>
            ) : (
              <Card
                key={i}
                title={t.title}
                sizeIcon={t.sizeIcon}
                className={`${showCards ? '-translate-y-2  scale-105 bg-blue_warm-80' : ''} w-96`}
                icon={t.icon}
                onClick={() => setShowCards(!showCards)}
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
                className="w-72"
              />
            ))}
          </div>
        )}
      </main>
    </>
  )
}
