import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { Icon } from '../Icon'
import { Button } from '../Button'

type CardType = {
  title: string
  sizeIcon: number
  className?: string
  icon: keyof typeof dynamicIconImports
  onClick?: () => void
}

export function Card({ title, sizeIcon, icon, className, onClick }: CardType) {
  return (
    <Button
      className={`${className} flex h-72  cursor-pointer flex-col items-center justify-center rounded-lg bg-blue_warm-70 text-white shadow-2xl transition duration-300 hover:-translate-y-2 hover:scale-105 hover:bg-blue_warm-80`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-between py-5 text-center text-3xl">
        <Icon name={icon} className="mb-5" strokeWidth={2} size={sizeIcon} />
        <p>{title}</p>
      </div>
    </Button>
  )
}
