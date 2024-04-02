'use client'

import React, { InputHTMLAttributes, useState } from 'react'
import { Icon } from '../Icon'
import dynamicIconImports from 'lucide-react/dynamicIconImports'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  label?: string
  icon?: keyof typeof dynamicIconImports
  onIconClick?: boolean
}

export const Input: React.FC<InputProps> = ({
  className,
  onIconClick,
  ...rest
}) => {
  const [viewPass, setViewPass] = useState(false)
  const [view, setView] = useState<keyof typeof dynamicIconImports>('eye')

  const handleIconClick = () => {
    if (onIconClick) {
      setViewPass(!viewPass) // Inverta o estado viewPass ao clicar no ícone
      setView(viewPass ? 'eye' : 'eye-off')
    }
  }

  return (
    <div className={className}>
      <label htmlFor={rest.id} className="ml-2">
        {rest.label && <span>{rest.label}</span>}
      </label>
      <div className="relative">
        <input
          {...rest}
          type={rest.icon === 'eye' && viewPass ? 'text' : rest.type}
          className="h-12 w-full rounded-lg border border-gray-300 px-3 py-2"
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
