import React, { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children?: ReactNode
}

export const Button: React.FC<ButtonProp> = ({
  className,
  children = 'button',
  ...rest
}) => {
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  )
}
