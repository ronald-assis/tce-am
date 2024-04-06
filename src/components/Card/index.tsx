import { MouseEventHandler } from 'react'

import { Button } from '../Button'
import { Icons, NameIcons } from '../Icons'

type CardType = {
  title: string
  sizeIcon: number
  className?: string
  icon: NameIcons
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export function Card({ title, sizeIcon, icon, className, onClick }: CardType) {
  return (
    <Button
      className={`${className} flex h-72  cursor-pointer flex-col items-center justify-center rounded-lg bg-blue_warm-70 text-white shadow-2xl transition duration-300 hover:-translate-y-2 hover:scale-105 hover:bg-blue_warm-80`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-between py-5 text-center text-3xl">
        <Icons name={icon} size={sizeIcon} />
        <p>{title}</p>
      </div>
    </Button>
  )
}
