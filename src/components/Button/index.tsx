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
  const buttonBase = 'text-white rounded rounded-3xl text-center text-lg'

  return (
    <button className={`${className} ${buttonBase}`} {...rest}>
      {nameButton}
    </button>
  )
}
