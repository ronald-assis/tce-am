import { Card } from '@/components/Card'
import { Header } from '@/components/Header'
import dynamicIconImports from 'lucide-react/dynamicIconImports'

type PropToCardType = {
  title: string
  icon: keyof typeof dynamicIconImports
  sizeIcon: number
}

export default function Home() {
  const titles: PropToCardType[] = [
    {
      title: 'Tipologia de Fraudes em Licitações e Contratos',
      icon: 'graduation-cap',
      sizeIcon: 88,
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
    },
  ]

  return (
    <main className="relative flex min-h-screen items-center justify-center gap-6 bg-gray-200">
      <Header />
      {titles.map((t, i) => (
        <Card key={i} title={t.title} sizeIcon={t.sizeIcon} icon={t.icon} />
      ))}
    </main>
  )
}
