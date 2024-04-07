import React from 'react'
import { IconType } from 'react-icons'
import { AiOutlineUser, AiOutlinePicLeft } from 'react-icons/ai'
import { BiBook } from 'react-icons/bi'
import { FaPlateWheat } from 'react-icons/fa6'
import { PiGraduationCapBold } from 'react-icons/pi'
import { IoIosArrowDown, IoIosArrowUp, IoIosArrowForward } from 'react-icons/io'
import { TiHome } from 'react-icons/ti'

export type NameIcons =
  | 'user'
  | 'picLeft'
  | 'book'
  | 'wheat'
  | 'graduationCap'
  | 'ioArrowDown'
  | 'ioArrowUp'
  | 'ioArrowRight'
  | 'tiHome'

interface DynamicIconProp {
  name: NameIcons
  size?: string | number
  color?: string
}

const icons: Record<NameIcons, IconType> = {
  user: AiOutlineUser,
  picLeft: AiOutlinePicLeft,
  book: BiBook,
  wheat: FaPlateWheat,
  graduationCap: PiGraduationCapBold,
  ioArrowDown: IoIosArrowDown,
  ioArrowUp: IoIosArrowUp,
  tiHome: TiHome,
  ioArrowRight: IoIosArrowForward,
}

export const Icons: React.FC<DynamicIconProp> = ({
  name,
  size = 24,
  color = 'currentColor',
}: DynamicIconProp) => {
  const IconComponent = icons[name]

  if (!IconComponent) {
    console.error(`Ícone '${name}' não encontrado`)
    return null
  }

  return <IconComponent size={size} color={color} />
}
