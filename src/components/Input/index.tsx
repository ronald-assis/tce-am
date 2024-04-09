'use client'

import React, { InputHTMLAttributes, useState } from 'react'
import { Icon } from '../Icon'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { UseFormRegister } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  label?: string
  icon?: keyof typeof dynamicIconImports
  iconLabel?: keyof typeof dynamicIconImports
  onIconClick?: boolean
  classNameInput?: string
  classNameLabel?: string

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
}

export const Input: React.FC<InputProps> = ({
  className,
  onIconClick,
  register,
  classNameInput,
  name,
  classNameLabel,
  iconLabel,
  ...rest
}) => {
  const [viewPass, setViewPass] = useState(false)
  const [view, setView] = useState<keyof typeof dynamicIconImports>('eye')

  const handleIconClick = () => {
    if (onIconClick) {
      setViewPass(!viewPass)
      setView(viewPass ? 'eye' : 'eye-off')
    }
  }

  return (
    <div className={className}>
      <label
        htmlFor={rest.id}
        className={`${classNameLabel} flex justify-center rounded-md px-1 text-center `}
      >
        {rest.label && (
          <span className="flex items-center">
            {iconLabel && (
              <Icon name={iconLabel} className="mr-1 w-4" strokeWidth={3} />
            )}
            <span className="font-ald ">{rest.label}</span>
          </span>
        )}
      </label>
      <div className="relative">
        <input
          {...rest}
          {...(register && name ? { ...register(name) } : {})}
          type={rest.icon === 'eye' && viewPass ? 'text' : rest.type}
          className={`${classNameInput} h-12 w-full rounded-lg px-3 py-2 `}
        />
        {rest.icon && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
            disabled={rest.type !== 'password'}
            onClick={handleIconClick}
          >
            <Icon
              name={onIconClick && rest.type === 'password' ? view : rest.icon}
            />
          </button>
        )}
      </div>
    </div>
  )
}
