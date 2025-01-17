'use client'

import React, { InputHTMLAttributes, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import InputMask from 'react-input-mask'

import { Icons, NameIcons } from '../Icons'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  label?: string
  errorMessage?: string
  icon?: NameIcons
  iconLabel?: NameIcons
  onIconClick?: boolean
  classNameInput?: string
  classNameInputDiv?: string
  classNameLabel?: string
  classNameError?: string
  mask?: boolean

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
  errorMessage,
  classNameError,
  classNameInputDiv,
  mask,
  ...rest
}) => {
  const [viewPass, setViewPass] = useState(false)
  const [view, setView] = useState<NameIcons>('bsEye')

  const handleIconClick = () => {
    if (onIconClick) {
      setViewPass(!viewPass)
      setView(viewPass ? 'bsEye' : 'bsEyeClose')
    }
  }

  return (
    <div className={className}>
      <label
        htmlFor={rest.id}
        className={`${classNameLabel} flex rounded-md px-1`}
      >
        {rest.label && (
          <span className="flex items-center">
            {iconLabel && <Icons name={iconLabel} className="mr-1 w-4" />}
            <span className="font-ald ">{rest.label}</span>
          </span>
        )}
      </label>
      <div className={`${classNameInputDiv} relative`}>
        {mask ? (
          <InputMask
            {...rest}
            {...(register && name ? { ...register(name) } : {})}
            className={`${classNameInput} h-12 px-3 py-2 `}
            mask="999.999.999-99"
          />
        ) : (
          <input
            {...rest}
            {...(register && name ? { ...register(name) } : {})}
            type={rest.icon === 'bsEye' && viewPass ? 'text' : rest.type}
            className={`${classNameInput} h-12 px-3 py-2 `}
          />
        )}
        {rest.icon && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
            disabled={rest.type !== 'password'}
            onClick={handleIconClick}
          >
            <Icons
              name={onIconClick && rest.type === 'password' ? view : rest.icon}
            />
          </button>
        )}
      </div>
      {errorMessage && (
        <span className={`${classNameError} flex items-center`}>
          <Icons name="circleX" className="mr-1 w-4" />
          <span className="font-ald ">{errorMessage}</span>
        </span>
      )}
    </div>
  )
}
