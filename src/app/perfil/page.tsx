'use client'

import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { Icons } from '@/components/Icons'
import { Input } from '@/components/Input'
import { useState } from 'react'

export default function Perfil() {
  const [disabledEmailOrPass, setDisabledEmailOrPass] = useState({
    email: true,
    pass: true,
  })

  return (
    <>
      <Header title="Dados Pessoais" />
      <main className="mt-40 flex justify-center">
        <div className="mt-8 grid  w-2/3 grid-cols-2">
          <div className="flex justify-center">
            <div className="flex h-12 w-full flex-col gap-2">
              <p className="w-2/3 border-b-2 border-gray-300">
                <b>Dados Cadastrais</b>
              </p>
              <form className="mt-5 flex flex-col gap-3">
                <div className="flex items-center gap-5 text-blue_warm-70">
                  <Icons name="faRegAddressCard" />
                  <Input
                    className="flex"
                    classNameInput="focus:outline-0 text-gray-600"
                    label="CPF"
                    value="439.898.328-12"
                    disabled
                  />
                </div>
                <div className="flex items-center gap-5 text-blue_warm-70">
                  <Icons name="faUserLarge" />
                  <Input
                    className="flex"
                    classNameInput="focus:outline-0 text-gray-600"
                    label="NOME"
                    value="RONALD ASSIS SALES DA SILVA"
                    disabled
                  />
                </div>
                <div className="flex items-center gap-5 text-blue_warm-70">
                  <Icons name="faRegEnvelop" />
                  <Input
                    className="flex gap-2"
                    label="E-MAIL"
                    value="emailtotest@gmail.com"
                    classNameInput="border focus:outline-0 text-gray-600 disabled:bg-gray-200"
                    disabled={disabledEmailOrPass.email}
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      setDisabledEmailOrPass({
                        ...disabledEmailOrPass,
                        email: !disabledEmailOrPass.email,
                      })
                    }
                  >
                    <Icons name="faRegEdit" />
                  </Button>
                </div>
                <div className="flex items-center gap-5 text-blue_warm-70">
                  <Icons name="faLock" />
                  <Input
                    className="flex gap-2"
                    label="SENHA"
                    classNameInput="border focus:outline-0 text-gray-600 disabled:bg-gray-200"
                    type="password"
                    disabled={disabledEmailOrPass.pass}
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      setDisabledEmailOrPass({
                        ...disabledEmailOrPass,
                        pass: !disabledEmailOrPass.pass,
                      })
                    }
                  >
                    <Icons name="faRegEdit" />
                  </Button>
                </div>
                <div className="mt-4 flex">
                  <Button className="w-1/4 rounded-full bg-blue_warm-70 p-2 text-white hover:bg-blue_warm-50">
                    Salvar
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="mb-5 w-2/3 border-b-2 border-gray-300">
              <b>Permissões</b>
            </p>
            <div className="flex h-52 w-4/5 rounded-lg border border-gray-200 bg-gray-100 p-5 shadow-md">
              <p className="flex h-7 w-1/4 items-center justify-center rounded-full bg-blue_warm-50 text-center text-white">
                <span>
                  <b>ADMIN</b>
                </span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
