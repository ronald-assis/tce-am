import React from 'react'
import { IconType } from 'react-icons'
import { AiOutlineUser, AiOutlinePicLeft } from 'react-icons/ai'
import { BiBook } from 'react-icons/bi'
import {
  FaPlateWheat,
  FaRegAddressCard,
  FaUserLarge,
  FaRegEnvelope,
  FaLock,
} from 'react-icons/fa6'
import { PiGraduationCapBold } from 'react-icons/pi'
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosArrowForward,
  IoIosCheckbox,
  IoMdCloseCircleOutline,
} from 'react-icons/io'
import { TiHome } from 'react-icons/ti'
import { LiaFileContractSolid } from 'react-icons/lia'
import {
  FaRegEdit,
  FaTrashAlt,
  FaWindowClose,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaEnvira,
} from 'react-icons/fa'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { SiSpond, SiApacheairflow } from 'react-icons/si'
import { GiBurningTree, GiMedicines, GiMeal } from 'react-icons/gi'

export type NameIcons =
  | 'siAirFlow'
  | 'giBurningTree'
  | 'giMedicines'
  | 'giMeal'
  | 'user'
  | 'picLeft'
  | 'book'
  | 'wheat'
  | 'graduationCap'
  | 'ioArrowDown'
  | 'ioArrowUp'
  | 'ioArrowRight'
  | 'tiHome'
  | 'faRegAddressCard'
  | 'faUserLarge'
  | 'faRegEnvelop'
  | 'liaFileContractSolid'
  | 'faLock'
  | 'faRegEdit'
  | 'checkbox'
  | 'trash'
  | 'faClose'
  | 'bsEye'
  | 'bsEyeClose'
  | 'circleX'
  | 'faLinkedin'
  | 'faInstagram'
  | 'faTwitter'
  | 'siSpond'
  | 'faEnvira'

interface DynamicIconProp {
  name: NameIcons
  size?: string | number
  color?: string
  className?: string
}

const icons: Record<NameIcons, IconType> = {
  user: AiOutlineUser,
  giMeal: GiMeal,
  giMedicines: GiMedicines,
  giBurningTree: GiBurningTree,
  siAirFlow: SiApacheairflow,
  siSpond: SiSpond,
  faEnvira: FaEnvira,
  faInstagram: FaInstagram,
  faLinkedin: FaLinkedin,
  faTwitter: FaTwitter,
  picLeft: AiOutlinePicLeft,
  book: BiBook,
  wheat: FaPlateWheat,
  graduationCap: PiGraduationCapBold,
  ioArrowDown: IoIosArrowDown,
  ioArrowUp: IoIosArrowUp,
  tiHome: TiHome,
  ioArrowRight: IoIosArrowForward,
  faRegAddressCard: FaRegAddressCard,
  faUserLarge: FaUserLarge,
  faRegEnvelop: FaRegEnvelope,
  liaFileContractSolid: LiaFileContractSolid,
  faLock: FaLock,
  faRegEdit: FaRegEdit,
  trash: FaTrashAlt,
  checkbox: IoIosCheckbox,
  faClose: FaWindowClose,
  bsEye: BsEye,
  bsEyeClose: BsEyeSlash,
  circleX: IoMdCloseCircleOutline,
}

export const Icons: React.FC<DynamicIconProp> = ({
  name,
  size = 24,
  color = 'currentColor',
  className,
}: DynamicIconProp) => {
  const IconComponent = icons[name]

  if (!IconComponent) {
    console.error(`Ícone '${name}' não encontrado`)
    return null
  }

  return <IconComponent className={className} size={size} color={color} />
}
