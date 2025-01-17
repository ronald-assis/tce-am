import Image from 'next/image'
import Link from 'next/link'

import tceam from '../../../public/assets/logo.png'
import { UserMenu } from '../UserMenu'
import { Button } from '../Button'
import { Icons } from '../Icons'
import { getUser } from '@/lib/user'

type HeaderPropType = {
  title: string
  homePage?: boolean
}

export function Header({ title, homePage }: HeaderPropType) {
  const user = getUser()

  return (
    <div className="absolute left-0 right-0 top-0 z-50 flex flex-col ">
      <header className="flex w-full items-center justify-center bg-gradient-to-tl from-blue_warm-80 to-blue_warm-20 py-2 shadow-lg">
        <nav className="flex w-2/3 items-center justify-between">
          <a
            href="https://www2.tce.am.gov.br"
            target="_blank"
            className="cursor-pointer"
            rel="noreferrer"
          >
            <Image
              alt="Logo TCE-AM"
              height={70}
              src={tceam}
              className="rounded-lg"
              priority
              placeholder="empty"
            />
          </a>
          <UserMenu {...user} />
        </nav>
      </header>
      {!homePage && (
        <div className="mt-3 flex w-full items-center justify-center bg-white">
          <div className="flex h-12 w-2/3 items-center gap-2 border-b-2 border-gray-300">
            <Button className="text-blue_warm-70">
              <Link href="/">
                <Icons name="tiHome" />
              </Link>
            </Button>
            <Icons name="ioArrowRight" size={14} />
            <span className="font-bold text-blue_warm-70">{title}</span>
          </div>
        </div>
      )}
    </div>
  )
}
