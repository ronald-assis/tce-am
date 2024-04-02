type classNamePropType = {
  className?: string
  type: 'button' | 'reset' | 'submit'
}

export const Button = ({ className, type }: classNamePropType) => {
  const buttonBase =
    'bg-blue_warm-60 w-[121px] h-7 text-white rounded rounded-3xl text-center text-lg'

  return (
    <button type={type} className={`${buttonBase} ${className}`}>
      button
    </button>
  )
}
