type classNamePropType = {
  className?: string
}

export const Button = ({ className }: classNamePropType) => {
  const buttonBase =
    'bg-blue_warm-60 w-[121px] h-7 text-white rounded rounded-3xl text-center text-lg'

  return <button className={`${buttonBase} ${className}`}>button</button>
}
