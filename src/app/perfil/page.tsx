'use client'

import { useEffect, useState } from 'react'
import Modal from 'react-modal'

import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { Icons } from '@/components/Icons'
import { Input } from '@/components/Input'

import { api } from '@/lib/api'
import { getUser } from '@/lib/user'
import { Toaster, toast } from 'sonner'
import { AxiosError } from 'axios'
import { Footer } from '@/components/Footer'

Modal.setAppElement('body')

type UserType = {
  id_usuario: string
  nome_usuario: string
  cpf_usuario: string
  email: string
  admin: number
  ativo: number
  senha?: string
}

interface UserResponse {
  data: UserType
}

const userState: UserType = {
  id_usuario: '',
  nome_usuario: '',
  admin: 0,
  ativo: 1,
  email: '',
  cpf_usuario: '',
}

type CategoriesType = {
  nome_categoria: string
  desc_categoria: string
  itens_categoria: string
  url_simples: string
  url_completa: string
}

interface PermissionTitle {
  nome_categoria: string[]
}

interface PermissionSubTitle {
  desc_categoria: string[]
}

interface PermissionItenSubTitle {
  itens_categoria: string[]
}

interface UserPermissionResponseType {
  data: [
    {
      id_categoria: string
      categoria: CategoriesType
    },
  ]
}

export default function Perfil() {
  const [infoUser, setInfoUser] = useState(userState)
  const [disabledPass, setDisabledPass] = useState(true)
  const [changePassModal, setChangePassModal] = useState(false)
  const [title, setTitle] = useState<PermissionTitle>({ nome_categoria: [] })
  const [subTitle, setSubTitle] = useState<PermissionSubTitle>({
    desc_categoria: [],
  })
  const [itenSubTitle, setItenSubTitle] = useState<PermissionItenSubTitle>({
    itens_categoria: [],
  })

  useEffect(() => {
    const user = getUser().id_usuario
    api.get(`/usuarios/${user}`).then(({ data }: UserResponse) => {
      setInfoUser(data)
    })

    api
      .get(`/usuarios-permissao/${user}`)
      .then(({ data }: UserPermissionResponseType) => {
        console.log(data)
        const set = new Set()
        const responseTitle = data.filter((c) => {
          const duplicated = set.has(c.categoria.nome_categoria)
          set.add(c.categoria.nome_categoria)
          return !duplicated
        })

        const setPredictions = new Set()
        const responsePredictions = data.filter((p) => {
          const duplicated = setPredictions.has(p.categoria.desc_categoria)
          setPredictions.add(p.categoria.desc_categoria)
          return !duplicated
        })

        const setPredictionDeforestation = new Set()
        const responsePredictionsDeforestation = data.filter((p) => {
          const duplicated = setPredictionDeforestation.has(
            p.categoria.itens_categoria,
          )
          setPredictionDeforestation.add(p.categoria.itens_categoria)
          return !duplicated
        })
        const nameCategories: string[] = []
        const descCategories: string[] = []
        const itemCategories: string[] = []

        responseTitle.forEach((category) => {
          nameCategories.push(category.categoria.nome_categoria)
          itemCategories.push(category.categoria.itens_categoria)
        })

        responsePredictions.forEach((prediction) => {
          descCategories.push(prediction.categoria.desc_categoria)
        })
        responsePredictionsDeforestation.forEach((items) => {
          itemCategories.push(items.categoria.itens_categoria)
        })

        setTitle({ nome_categoria: nameCategories })
        setSubTitle({ desc_categoria: descCategories })
        setItenSubTitle({ itens_categoria: itemCategories })
      })
  }, [])

  const openModal = () => {
    if (infoUser.senha && infoUser.senha !== '') {
      setChangePassModal(true)
    }
  }

  const cancelPass = () => {
    setInfoUser({ ...infoUser, senha: '' })
    setChangePassModal(false)
    setDisabledPass(true)
  }

  const sendNewPass = async () => {
    try {
      const request = await api.patch(`/auth/update/${getUser().id_usuario}`, {
        senha: infoUser.senha,
      })

      const response = await request.statusText

      if (response === 'OK') {
        setInfoUser({ ...infoUser, senha: '' })
        setChangePassModal(false)
        setDisabledPass(true)
        toast.success('Senha alterada com sucesso!')
      }
    } catch (e) {
      const error = e as AxiosError | Error
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    }
  }

  const handlePermission = (
    type: 'title' | 'desc' | 'item',
    name: string,
  ): boolean => {
    if (type === 'title') {
      if (getUser().admin !== 1) {
        return title.nome_categoria.some((t) => t.includes(name))
      }
    }

    if (type === 'desc') {
      if (getUser().admin !== 1) {
        return subTitle.desc_categoria.some((t) => t.includes(name))
      }
    }

    if (type === 'item') {
      if (getUser().admin !== 1) {
        return itenSubTitle.itens_categoria.some((t) => t.includes(name))
      }
    }

    return true
  }

  return (
    <>
      <Toaster richColors position="top-right" />
      <Header title="Dados Pessoais" />
      <Footer />
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
                    mask
                    value={infoUser.cpf_usuario}
                    disabled
                  />
                </div>
                <div className="flex items-center gap-5 text-blue_warm-70">
                  <Icons name="faUserLarge" />
                  <Input
                    className="flex w-2/3"
                    classNameInput="focus:outline-0 w-full text-gray-600"
                    classNameInputDiv="w-full"
                    label="NOME"
                    value={infoUser.nome_usuario}
                    disabled
                  />
                </div>
                <div className="flex items-center gap-5 text-blue_warm-70">
                  <Icons name="faRegEnvelop" />
                  <Input
                    className="flex gap-2"
                    label="E-MAIL"
                    value={infoUser.email}
                    classNameInput="focus:outline-0 text-gray-600"
                    disabled
                  />
                </div>
                <div className="flex items-center gap-5 text-blue_warm-70">
                  <Icons name="faLock" />
                  <Input
                    className="flex gap-2"
                    label="SENHA"
                    classNameInput="border focus:outline-0 text-gray-600 disabled:bg-gray-200"
                    type="password"
                    defaultValue={infoUser.senha}
                    onChange={(e) =>
                      setInfoUser({ ...infoUser, senha: e.target.value })
                    }
                    disabled={disabledPass}
                  />
                  <Button
                    type="button"
                    onClick={() => setDisabledPass(!disabledPass)}
                  >
                    <Icons name="faRegEdit" />
                  </Button>
                </div>
                <div className="mt-4 flex">
                  <Button
                    type="button"
                    onClick={openModal}
                    className="w-1/4 rounded-full bg-blue_warm-70 p-2 text-white hover:bg-blue_warm-50"
                  >
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
            <div className="flex h-auto w-11/12 flex-col gap-3 overflow-auto rounded-lg border border-gray-200 bg-gray-100 p-5 shadow-md">
              {getUser().admin === 1 && (
                <p className="flex h-7 w-1/4 items-center justify-center rounded-full bg-blue_warm-50 text-center uppercase text-white">
                  <span>
                    <b>ADMIN</b>
                  </span>
                </p>
              )}
              <h3 className="mb-2 mt-5 w-2/3 border-b-2 border-gray-300 font-ald text-lg text-blue_warm-70">
                Categorias
              </h3>

              <div className="flex h-96 flex-col gap-3 overflow-y-auto">
                <div className="flex flex-col gap-3">
                  {handlePermission(
                    'title',
                    'Tipologia de Fraudes em Licitações e Contratos',
                  ) && (
                    <p className="flex h-auto w-2/4 items-center justify-center rounded-full bg-blue_warm-50 text-center uppercase text-white">
                      <span>
                        <b>Tipologia de Fraudes</b>
                      </span>
                    </p>
                  )}

                  {handlePermission(
                    'title',
                    'Indicadores de Políticas Publicas',
                  ) && (
                    <p className="flex h-auto w-2/4 items-center justify-center rounded-2xl bg-blue_warm-50 text-center uppercase text-white">
                      <span>
                        <b>Indicadores de Políticas Publicas</b>
                      </span>
                    </p>
                  )}

                  {handlePermission('title', 'Previsões') && (
                    <p className="flex h-auto w-2/4 items-center justify-center rounded-full bg-blue_warm-50 text-center uppercase text-white">
                      <span>
                        <b>Previsões</b>
                      </span>
                    </p>
                  )}
                </div>

                <h3 className="mb-2 mt-5 w-4/5 border-b-2 border-gray-300 font-ald text-lg text-blue_warm-70">
                  {'Categorias > Previsões > Desabastecimento'}
                </h3>

                <div className="flex gap-3">
                  {handlePermission('item', 'Medicação') && (
                    <p className="flex h-auto w-2/6 items-center justify-center rounded-full bg-blue_warm-50 text-center uppercase text-white">
                      <span>
                        <b>Medicação</b>
                      </span>
                    </p>
                  )}

                  {handlePermission('item', 'Merenda escolar') && (
                    <p className="flex h-auto w-2/4 items-center justify-center rounded-full bg-blue_warm-50 text-center uppercase text-white">
                      <span>
                        <b>Merenda Escolar</b>
                      </span>
                    </p>
                  )}
                </div>

                <h3 className="mb-2 mt-5 w-4/5 border-b-2 border-gray-300 font-ald text-lg text-blue_warm-70">
                  {'Categorias > Previsões > Meio Ambiente'}
                </h3>

                <div className="flex gap-3">
                  {handlePermission('item', 'Qualidade do ar') && (
                    <p className="flex h-auto w-2/4 items-center justify-center rounded-full bg-blue_warm-50 text-center uppercase text-white">
                      <span>
                        <b>Qualidade do Ar</b>
                      </span>
                    </p>
                  )}

                  {handlePermission('item', 'Desmatamento') && (
                    <p className="flex h-auto w-2/4 items-center justify-center rounded-full bg-blue_warm-50 text-center uppercase text-white">
                      <span>
                        <b>Desmatamento</b>
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={changePassModal}
          onRequestClose={() => setChangePassModal(false)}
          className="fixed bottom-0 left-0 right-0 top-28 flex flex-col items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm"
        >
          <div className="relative flex h-60 w-2/3 max-w-[720px] flex-col items-center justify-around overflow-auto rounded-lg bg-gray-100 p-4">
            <h1 className="text-center font-ald text-xl uppercase  text-blue_warm-70">
              Certeza que Gostaria de alterar sua senha?
            </h1>
            <div className="flex gap-4">
              <Button
                type="button"
                className="h-11 w-48 max-w-52 rounded-3xl border-2 border-blue_warm-60 bg-red-400 text-center font-ald text-base uppercase text-white transition duration-300 hover:-translate-y-1 hover:scale-100 hover:bg-red-500"
                onClick={sendNewPass}
              >
                sim
              </Button>
              <Button
                type="button"
                className="h-11 w-48 max-w-52 rounded-3xl border-2 border-blue_warm-60 bg-blue_warm-40 text-center font-ald text-base uppercase text-white transition duration-300 hover:-translate-y-1 hover:scale-100 hover:bg-blue_warm-60"
                onClick={cancelPass}
              >
                cancelar
              </Button>
            </div>
          </div>
        </Modal>
      </main>
    </>
  )
}
