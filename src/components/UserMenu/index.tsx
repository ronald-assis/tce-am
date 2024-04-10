'use client'

import { useState } from 'react'
import Link from 'next/link'

import { Button } from '../Button'
import { Icons } from '../Icons'

export function UserMenu() {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="relative w-fit rounded-full p-1">
      <Button
        onClick={() => setShowMenu(!showMenu)}
        className={`${showMenu ? 'border-2 border-gray-400' : ''} flex w-44 items-center gap-2 rounded-full bg-white p-1 hover:bg-blue_warm-20`}
      >
        <div className=" rounded-full bg-gray-500 text-white">
          <Icons name="user" />
        </div>
        <div className="flex items-center gap-1 text-center">
          <span className="text-gray-700">
            Olá, <b>RONALD</b>
          </span>
          <div className="text-blue_warm-80">
            <Icons
              name={`${showMenu ? 'ioArrowUp' : 'ioArrowDown'}`}
              color=""
            />
          </div>
        </div>
      </Button>

      <div
        className={`${showMenu ? 'flex' : 'hidden'} absolute right-0 top-[70px] w-72 cursor-default flex-col gap-4 rounded-lg bg-slate-100 p-4 text-start text-gray-600 shadow-lg`}
      >
        <p>
          Olá, <b>RONALD ASSIS</b>
        </p>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col justify-center gap-2 ">
            <p className="h-8 border-b-2 border-gray-500">Minha Conta</p>
            <ul className="flex flex-col justify-center gap-1 text-lg ">
              <li className="flex h-8 items-center text-blue_warm-70 hover:cursor-pointer  hover:bg-gray-300">
                <Link href="/perfil" className="w-full">
                  <span>Dados pessoais</span>
                </Link>
              </li>
              <li className="flex h-8 items-center text-blue_warm-70 hover:cursor-pointer  hover:bg-gray-300">
                <Link href="/controle_de_acesso" className="w-full">
                  <span>Controle de Acesso</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-center gap-2 ">
            <p className="h-8 border-b-2 border-gray-500">Dashboards</p>
            <ul className="flex flex-col justify-center gap-1 text-lg ">
              <li className="flex h-8 items-center text-blue_warm-70 hover:cursor-pointer  hover:bg-gray-300">
                <span>link para o dash</span>
              </li>
              <li className="flex h-8 items-center text-blue_warm-70 hover:cursor-pointer  hover:bg-gray-300">
                <span>link para o dash</span>
              </li>
            </ul>
          </div>
        </div>

        <Link href="/login" className="flex justify-end">
          <Button className="w-2/5 rounded-full border-2 border-blue_warm-50  text-blue_warm-70 hover:bg-gray-300">
            <span className="w-full px-2">sair da conta</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
