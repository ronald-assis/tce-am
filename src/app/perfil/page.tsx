import Link from 'next/link'

import { Button } from '@/components/Button'
import { Icons } from '@/components/Icons'
import { Header } from '@/components/Header'

export default function Perfil() {
  return (
    <>
      <Header title="Dados Pessoais" />
      <main className="mt-40 grid min-h-screen grid-cols-2">
        <div className="flex justify-center bg-red-500">
          <div className="border-gray-300j flex h-12 w-full items-center gap-2 border-b-2">
            <Button className="text-blue_warm-70">
              <Link href="/">
                <Icons name="tiHome" />
              </Link>
            </Button>
            <Icons name="ioArrowRight" size={14} />
            <span>Dados pessoais</span>
          </div>
        </div>
        <div className="bg-yellow-600">permissões</div>
      </main>
    </>
  )
}
