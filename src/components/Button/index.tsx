import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  nameButton?: string
}

export const Button: React.FC<ButtonProp> = ({
  className,
  nameButton = 'button',
  ...rest
}) => {
  const buttonBase =
    'bg-blue_warm-60 w-[121px] h-7 text-white rounded rounded-3xl text-center text-lg'

  return (
    <button className={`${buttonBase} ${className}`} {...rest}>
      {nameButton}
    </button>
  )
}
