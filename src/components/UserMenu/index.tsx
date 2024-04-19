'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AxiosError } from 'axios'

import { api } from '@/lib/api'

import { Button } from '../Button'
import { Icons } from '../Icons'

type UserProp = {
  id_usuario: string
  nome_usuario: string
  admin: number
}

type CategoryType = {
  nome_categoria: string
  desc_categoria: string
  itens_categoria: string
  url_dashboard_simples: string
  url_dashboard_completa: string
}

interface ResponseCategoryType {
  id_categoria: string
  categoria: CategoryType
}

export function UserMenu(props: UserProp) {
  const [showMenu, setShowMenu] = useState(false)
  const [permissions, setPermissions] = useState<ResponseCategoryType[] | []>(
    [],
  )

  useEffect(() => {
    api
      .get(`usuarios-permissao/${props.id_usuario}`)
      .then((response) => {
        setPermissions(response.data)
      })
      .catch((e) => {
        const error = e as AxiosError | Error
        if (error instanceof AxiosError) {
          console.error(error.response?.data)
        }
      })
  }, [props.id_usuario])

  const permitted = (
    type: 'title' | 'desc' | 'item',
    name: string,
  ): boolean => {
    if (type === 'title') {
      if (props.admin !== 1) {
        return permissions.some((t) =>
          t.categoria.nome_categoria.includes(name),
        )
      }
    }

    if (type === 'desc') {
      if (props.admin !== 1) {
        return permissions.some((t) =>
          t.categoria.desc_categoria.includes(name),
        )
      }
    }

    if (type === 'item') {
      if (props.admin !== 1) {
        return permissions.some((t) =>
          t.categoria.itens_categoria.includes(name),
        )
      }
    }

    return true
  }

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
            Olá, <b>{props.nome_usuario && props.nome_usuario.split(' ')[0]}</b>
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
        <p className="uppercase">
          Olá, <b>{props.nome_usuario}</b>
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
              {props.admin === 1 && (
                <li className="flex h-8 items-center text-blue_warm-70 hover:cursor-pointer  hover:bg-gray-300">
                  <Link href="/controle_de_acesso" className="w-full">
                    <span>Controle de Acesso</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="flex flex-col justify-center gap-2 ">
            <p className="h-8 border-b-2 border-gray-500">Dashboards</p>
            <ul className="flex flex-col justify-center gap-1 text-lg ">
              {permitted(
                'title',
                'Tipologia de Fraudes em Licitações e Contratos',
              ) && (
                <li className="flex h-8 items-center text-blue_warm-70 hover:cursor-pointer  hover:bg-gray-300">
                  <Link href="/categoria/tipologia_de_fraudes_em_licitacoes_e_contrato">
                    <span>T.F.L.C</span>
                  </Link>
                </li>
              )}

              {permitted('title', 'Indicadores de Políticas Publicas') && (
                <li className="flex h-8 items-center text-blue_warm-70 hover:cursor-pointer  hover:bg-gray-300">
                  <Link href={'/categoria/indicadores_de_politicas_publicas'}>
                    <span>Indicadores de Políticas Publicas</span>
                  </Link>
                </li>
              )}

              {permitted('desc', 'Desabastecimento') && (
                <li className="h-8 border-b-2 border-gray-500">
                  <span>{'previsões > Desabastecimento'}</span>
                </li>
              )}

              {permitted('item', 'Medicação') && (
                <li className="flex h-8 items-center text-blue_warm-70 hover:cursor-pointer  hover:bg-gray-300">
                  <Link href={'/previsoes/desabastecimento/medicacao'}>
                    <span>Medicação</span>
                  </Link>
                </li>
              )}

              {permitted('item', 'Merenda escolar') && (
                <li className="flex h-8 items-center text-blue_warm-70 hover:cursor-pointer  hover:bg-gray-300">
                  <Link href={'/previsoes/desabastecimento/merenda_escolar'}>
                    <span>Merenda Escolar</span>
                  </Link>
                </li>
              )}

              {permitted('desc', 'Meio ambiente') && (
                <li className="h-8 border-b-2 border-gray-500">
                  <span>{'previsões > Meio Ambiente'}</span>
                </li>
              )}

              {permitted('item', 'Qualidade do ar') && (
                <li className="flex h-8 items-center text-blue_warm-70 hover:cursor-pointer  hover:bg-gray-300">
                  <Link href={'/previsoes/meio_ambiente/qualidade_do_ar'}>
                    <span>Qualidade do Ar</span>
                  </Link>
                </li>
              )}

              {permitted('item', 'Desmatamento') && (
                <li className="flex h-8 items-center text-blue_warm-70 hover:cursor-pointer  hover:bg-gray-300">
                  <Link href={'/previsoes/meio_ambiente/desmatamento'}>
                    <span>Desmatamento</span>
                  </Link>
                </li>
              )}
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
