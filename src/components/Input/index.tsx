import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  label?: string
}

export const Input: React.FC<InputProps> = ({ className, ...rest }) => {
  return (
    <div className={className}>
      <label htmlFor={rest.id} className="ml-2">
        {rest.label && <span>{rest.label}</span>}
      </label>
      <input
        {...rest}
        className="h-10 w-full border border-zinc-200 px-3 shadow-sm"
      />
    </div>
  )
}
