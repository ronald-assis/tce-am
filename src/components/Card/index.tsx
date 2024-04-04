import { Icon } from '../Icon'

type CardType = {
  title: string
  sizeIcon: number
}

export function Card({ title, sizeIcon }: CardType) {
  return (
    <div className="flex h-72 w-96 flex-col items-center justify-center rounded-lg bg-blue_warm-70 text-white shadow-2xl transition duration-300 hover:-translate-y-2 hover:scale-105 hover:bg-blue_warm-80">
      <div className="flex flex-col items-center justify-between py-5 text-center text-3xl">
        <Icon
          name="graduation-cap"
          className="mb-5"
          strokeWidth={2}
          size={sizeIcon}
        />
        <p>{title}</p>
      </div>
    </div>
  )
}
