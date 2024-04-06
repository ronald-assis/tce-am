import Image from 'next/image'

import tceam from '../../../public/assets/logo.png'
import { UserMenu } from '../UserMenu'

type HeaderPropType = {
  title: string
}

export function Header({ title }: HeaderPropType) {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-gradient-to-tl from-blue_warm-80 to-blue_warm-20 px-5 py-2 shadow-lg">
      <Image alt="Logo TCE-AM" height={70} src={tceam} className="rounded-lg" />
      <h1>{title}</h1>
      <UserMenu />
    </header>
  )
}
