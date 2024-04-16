'use client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Modal from 'react-modal'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/Button'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Icons, NameIcons } from '@/components/Icons'
import { Input } from '@/components/Input'
import { api } from '@/lib/api'
import { AxiosError } from 'axios'

Modal.setAppElement('body')

const dataSchema = z.object({
  nome_usuario: z.string().min(3, { message: 'Este campo é obrigatório!' }),
  cpf_usuario: z.string().min(3, { message: 'Este campo é obrigatório!' }),
  email: z.string().min(1, { message: 'Este campo é obrigatório!' }).email(),
  senha: z.string().optional(),
  ativo: z.boolean().optional(),
  admin: z.boolean().optional(),
})

type FormData = z.infer<typeof dataSchema>

type UserInfoType<T> = {
  nome_usuario: string
  cpf_usuario: string
  email: string
  ativo: T
  admin: T
  id_usuario?: string
  senha?: string
}

type CategoryType = {
  id_categoria: string
  nome_categoria: string
  desc_categoria: string
  itens_categoria: string
  url_dashboard_simples: string
  url_dashboard_completa: string
}

interface ResponseType<T> {
  data: {
    conteudo: T[]
    paginaAtual: number
    registrosPorPagina: number
  }
}

const selectedUserState: UserInfoType<boolean> = {
  admin: false,
  ativo: true,
  cpf_usuario: '',
  email: '',
  nome_usuario: '',
  senha: '',
}

export default function AccessControl() {
  const [modalIsOpenOrClose, setModalIsOpenOrClose] = useState(false)
  const [viewPass, setViewPass] = useState(false)
  const [view, setView] = useState<NameIcons>('bsEye')
  const [perfis, setPerfis] = useState<UserInfoType<number>[] | []>([])
  const [categories, setCategories] = useState<CategoryType[] | []>([])
  const [selectedCategories, setSelectedCategories] = useState<
    CategoryType[] | []
  >([])
  const [modalIsOpenOrCloseExclude, setModalIsOpenOrCloseExclude] =
    useState(false)
  const [modalTitle, setModalTitle] = useState<
    'Cadastrar' | 'Editar' | 'Excluir'
  >('Cadastrar')
  const [selectedUser, setSelectedUser] = useState(selectedUserState)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(dataSchema),
    defaultValues: selectedUser,
  })

  useEffect(() => {
    reset(selectedUser)
    api
      .get('/usuarios')
      .then(({ data }: ResponseType<UserInfoType<number>>) => {
        console.log(data)
        setPerfis(data.conteudo)
      })
      .catch((e) => {
        console.error(e)
      })

    api
      .get('/categorias')
      .then(({ data }: ResponseType<CategoryType>) => {
        console.log(data)

        const set = new Set()
        const filterToCategory = data.conteudo.filter((c) => {
          const duplicated = set.has(c.nome_categoria)
          set.add(c.nome_categoria)
          return !duplicated
        })

        setCategories(filterToCategory)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [reset, selectedUser])

  const handleRegiterOrUpdate = async (data: FormData) => {
    console.log(data, modalIsOpenOrClose, categories, selectedUser)
    const bodyRequest: UserInfoType<number> = Object.assign(data, {
      ativo: data.ativo ? 1 : 0,
      admin: data.admin ? 1 : 0,
    })

    if (bodyRequest.senha === '') {
      delete bodyRequest.senha
    }

    if (modalTitle === 'Cadastrar') {
      try {
        const response = await api.post('/usuarios', bodyRequest)
        console.log(response)
        if (response.statusText === 'OK') {
          const users = await api.get('/usuarios')

          reset()
          setPerfis(users.data?.conteudo)
          setModalIsOpenOrClose(false)
        }
      } catch (e) {
        const error = e as AxiosError | Error
        if (error instanceof AxiosError) {
          console.error(error.response)
        }
      }
    }

    if (modalTitle === 'Editar') {
      try {
        const response = await api.patch(
          `/usuarios/update/${selectedUser.id_usuario}`,
          bodyRequest,
        )

        if (response.statusText === 'OK') {
          const users = await api.get('/usuarios')

          reset()
          setPerfis(users.data?.conteudo)
          setModalIsOpenOrClose(false)
        }
        console.log(response)
      } catch (e) {
        const error = e as AxiosError | Error
        if (error instanceof AxiosError) {
          console.error(error.response)
        }
      }
    }
  }

  const closeModal = () => {
    setModalIsOpenOrClose(false)
    reset()
  }

  const openModalExclude = (profile: UserInfoType<number>) => {
    setModalIsOpenOrCloseExclude(true)
    setModalTitle('Excluir')
    console.log(profile)
  }

  const closeModalExclude = () => {
    setModalIsOpenOrCloseExclude(false)
  }

  const openModalNewProfile = () => {
    setModalIsOpenOrClose(true)
    setSelectedUser(selectedUserState)
    setModalTitle('Cadastrar')
  }

  const openModal = (info: UserInfoType<number>) => {
    const infoToSelected: UserInfoType<boolean> = Object.assign(info, {
      ativo: info.ativo === 1,
      admin: info.admin === 1,
    })
    setModalIsOpenOrClose(true)
    setSelectedUser(infoToSelected)
    setModalTitle('Editar')
  }

  const handleIconClick = () => {
    setViewPass(!viewPass)
    setView(viewPass ? 'bsEye' : 'bsEyeClose')
  }

  return (
    <>
      <Header title="Controle de acesso" />

      <main className="relative flex min-h-screen items-center justify-center">
        <div className="flex h-[500px] w-2/3 flex-col justify-between rounded-lg border-2 border-gray-300">
          <div className="overflow-y-auto">
            <table className=" max-h-screen w-full rounded-e-lg  rounded-s-lg">
              <thead className="border-b-2 border-b-gray-200">
                <tr className="rounded-s-lg text-blue_warm-80">
                  <th className="text-md border-r-2 border-r-gray-200 px-6 py-3 text-start">
                    NOME
                  </th>
                  <th className="text-md  border-r-2 border-r-gray-200  px-6 py-3 text-start">
                    CPF
                  </th>
                  <th className="text-md border-r-2 border-r-gray-200  px-6 py-3 text-start">
                    E-MAIL
                  </th>
                  <th className="text-md border-r-2 border-r-gray-200 px-6 py-3 text-center">
                    ATIVO
                  </th>
                  <th className="text-md border-r-2 border-r-gray-200 px-6 py-3  text-center">
                    ADMIN
                  </th>
                  <th className="text-md flex justify-center px-6 py-3 text-center">
                    <Button
                      onClick={openModalNewProfile}
                      className="flex items-center gap-1 rounded-full bg-blue_warm-60 px-3 text-white hover:bg-blue_warm-70"
                    >
                      <Icons name="user" size={18} />
                      <span>Novo</span>
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody className="mt-5">
                {perfis.map((u, i) => (
                  <tr
                    key={u.cpf_usuario}
                    className={
                      i % 2 === 1 ? 'bg-blue_warm-5' : 'bg-blue_warm-10'
                    }
                  >
                    <td className="text-md border border-solid border-gray-300 px-6 py-3 uppercase">
                      <span>{u.nome_usuario}</span>
                    </td>

                    <td className="text-md border border-solid border-gray-300 px-6 py-3">
                      <span>{u.cpf_usuario}</span>
                    </td>

                    <td className="text-md border border-solid border-gray-300 px-6 py-3">
                      <span>{u.email}</span>
                    </td>

                    <td className="text-md border border-solid border-gray-300 px-6 py-3">
                      <span className="flex justify-center">
                        {u.ativo ? (
                          <Icons name="checkbox" />
                        ) : (
                          <Icons name="faClose" />
                        )}
                      </span>
                    </td>

                    <td className="text-md border border-solid border-gray-300 px-6 py-3">
                      <span className="flex justify-center">
                        {u.admin ? (
                          <Icons name="checkbox" />
                        ) : (
                          <Icons name="faClose" size={20} />
                        )}
                      </span>
                    </td>

                    <td className="text-md border border-solid border-gray-300 px-6 py-3">
                      <span className="flex justify-around">
                        <Button onClick={() => openModal(u)}>
                          <Icons name="faRegEdit" size={20} />
                        </Button>
                        <Button onClick={() => openModalExclude(u)}>
                          <Icons name="trash" size={20} />
                        </Button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center">
            <span>paginação</span>
          </div>

          <Modal
            isOpen={modalIsOpenOrCloseExclude}
            onRequestClose={() => setModalIsOpenOrCloseExclude(false)}
            className="fixed bottom-0 left-0 right-0 top-28 flex flex-col items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm"
          >
            <div className="relative flex h-[28rem] w-2/3 max-w-[720px] flex-col overflow-auto rounded-lg bg-gray-100 p-4">
              <span className="mb-5 border-b-2 border-gray-300 font-serif text-lg text-blue_warm-70">
                {`${modalTitle} Perfil`}
              </span>
              <h1 className="text-center text-xl uppercase text-blue_warm-70">
                Certeza que deseja excluir este perfil?
              </h1>

              <ul
                className={`verflow-auto mt-2 flex h-60 w-full flex-col justify-center gap-3 rounded-lg border bg-blue_warm-5 p-2`}
              >
                <li className="flex w-full justify-between gap-2">
                  <Input
                    className="flex h-20 w-2/3  flex-col items-start"
                    classNameInput="disabled:bg-gray-200 rounded-lg w-full text-lg h-10 uppercase"
                    classNameInputDiv="w-full"
                    classNameLabel="text-blue_warm-70"
                    classNameError="bg-red-600 px-2 text-white rounded-lg ml-3 mt-1"
                    errorMessage={
                      errors.nome_usuario && errors.nome_usuario?.message
                    }
                    label="NOME:"
                    disabled
                    defaultValue={selectedUser.nome_usuario}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        nome_usuario: e.target.value,
                      })
                    }
                  />
                  <Input
                    className="flex h-20 w-1/3 flex-col items-start"
                    classNameInput="rounded-lg disabled:bg-gray-200 rounded-lg w-full text-lg h-10 uppercase"
                    classNameInputDiv="w-full"
                    classNameLabel="text-blue_warm-70"
                    classNameError="bg-red-600 px-2 text-xs flex text-white rounded-lg ml-3 mt-1"
                    errorMessage={
                      errors.cpf_usuario && errors.cpf_usuario?.message
                    }
                    label="CPF:"
                    disabled
                    defaultValue={selectedUser.cpf_usuario}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        cpf_usuario: e.target.value,
                      })
                    }
                  />
                </li>

                <li className="flex w-full justify-between gap-2">
                  <Input
                    className="flex h-20 w-2/3 flex-col items-start"
                    classNameInput="rounded-lg disabled:bg-gray-200 w-full text-lg h-10"
                    classNameInputDiv="w-full"
                    classNameLabel="text-blue_warm-70"
                    classNameError="bg-red-600 px-2 text-white rounded-lg ml-3 mt-1"
                    label="E-MAIL:"
                    disabled
                    defaultValue={selectedUser.email}
                    errorMessage={errors.email && errors.email?.message}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        email: e.target.value,
                      })
                    }
                  />

                  <div className="flex h-16 w-1/3 gap-2">
                    <Input
                      className="flex w-2/4 flex-col items-start"
                      classNameInput="rounded-sm disabled:bg-gray-200 w-full text-lg"
                      classNameInputDiv="w-8 pl-2"
                      classNameLabel="text-blue_warm-70"
                      classNameError="bg-red-600 px-2 text-white rounded-lg ml-3 mt-1"
                      errorMessage={errors.ativo && errors.ativo?.message}
                      id="ativo"
                      type="checkbox"
                      label="ATIVO:"
                      register={register}
                      disabled
                      defaultValue={selectedUser.email}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          ativo: e.target.checked,
                        })
                      }
                    />

                    <div></div>
                    <Input
                      className="flex w-2/4 flex-col items-start"
                      classNameInput="rounded-sm disabled:bg-gray-200 text-lg"
                      classNameInputDiv="w-8 pl-2"
                      classNameLabel="text-blue_warm-70"
                      errorMessage={errors.admin && errors.admin?.message}
                      id="admin"
                      type="checkbox"
                      label="ADMIN:"
                      disabled
                      register={register}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          admin: e.target.checked,
                        })
                      }
                    />
                  </div>
                </li>
              </ul>
              <div className="absolute bottom-4 flex w-4/5 items-center justify-around gap-3 px-2">
                <Button
                  type="submit"
                  className="h-11 w-48 max-w-52 rounded-3xl border-2 border-blue_warm-60 bg-red-400 text-center font-ald text-base uppercase text-white transition duration-300 hover:-translate-y-1 hover:scale-100 hover:bg-red-500"
                >
                  excluir
                </Button>

                <Button
                  type="button"
                  onClick={() => closeModalExclude()}
                  className="h-11 w-48 max-w-52 rounded-3xl border-2 border-blue_warm-60 bg-blue_warm-40 text-center font-ald text-base uppercase text-white transition duration-300 hover:-translate-y-1 hover:scale-100 hover:bg-blue_warm-60"
                >
                  cancelar
                </Button>
              </div>
            </div>
          </Modal>

          <Modal
            isOpen={modalIsOpenOrClose}
            onRequestClose={() => setModalIsOpenOrClose(false)}
            className="fixed bottom-0 left-0 right-0 top-28 flex flex-col items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm"
          >
            <div className="relative flex h-[28rem] w-2/3 max-w-[760px] flex-col overflow-auto rounded-lg bg-gray-100 p-4">
              <span className="mb-5 border-b-2 border-gray-300 font-serif text-lg text-blue_warm-70">
                {`${modalTitle} Perfil`}
              </span>
              <form
                onSubmit={handleSubmit(handleRegiterOrUpdate)}
                className={`verflow-auto mb-10 flex max-h-screen w-full flex-col gap-3 overflow-auto rounded-lg border bg-blue_warm-5 p-2`}
              >
                <div className="flex w-full justify-between gap-2">
                  <div className="flex h-20 w-2/3  flex-col items-start">
                    <label
                      htmlFor="nome_usuario"
                      className={`flex rounded-md px-1 text-blue_warm-70`}
                    >
                      <span className="flex items-center">
                        <span className="font-ald ">NOME:</span>
                      </span>
                    </label>
                    <input
                      id="nome_usuario"
                      {...register('nome_usuario')}
                      disabled
                      className={`h-10 w-full rounded-lg px-3 py-2 text-lg uppercase disabled:bg-gray-200 `}
                    />

                    {errors.nome_usuario && (
                      <span
                        className={`ml-3 mt-1 flex items-center rounded-lg bg-red-600 px-2 text-white`}
                      >
                        <Icons name="circleX" className="mr-1 w-4" />
                        <span className="font-ald ">
                          {errors.nome_usuario?.message}
                        </span>
                      </span>
                    )}
                  </div>

                  <div className="flex h-20 w-2/3  flex-col items-start">
                    <label
                      htmlFor="cpf_usuario"
                      className={`flex rounded-md px-1 text-blue_warm-70`}
                    >
                      <span className="flex items-center">
                        <span className="font-ald ">CPF:</span>
                      </span>
                    </label>
                    <input
                      id="cpf_usuario"
                      disabled
                      {...register('cpf_usuario')}
                      className={`h-10 w-full rounded-lg px-3 py-2 text-lg uppercase disabled:bg-gray-200 `}
                    />

                    {errors.cpf_usuario && (
                      <span
                        className={`ml-3 mt-1 flex items-center rounded-lg bg-red-600 px-2 text-white`}
                      >
                        <Icons name="circleX" className="mr-1 w-4" />
                        <span className="font-ald ">
                          {errors.cpf_usuario?.message}
                        </span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex w-full justify-between gap-2">
                  <div className="flex h-20 w-2/3  flex-col items-start">
                    <label
                      htmlFor="email"
                      className={`flex rounded-md px-1 text-blue_warm-70`}
                    >
                      <span className="flex items-center">
                        <span className="font-ald ">E-MAIL:</span>
                      </span>
                    </label>
                    <input
                      {...register('email')}
                      id="email"
                      className={`h-10 w-full rounded-lg px-3 py-2 text-lg disabled:bg-gray-200 `}
                    />

                    {errors.email && (
                      <span
                        className={`ml-3 mt-1 flex items-center rounded-lg bg-red-600 px-2 text-white`}
                      >
                        <Icons name="circleX" className="mr-1 w-4" />
                        <span className="font-ald ">
                          {errors.email?.message}
                        </span>
                      </span>
                    )}
                  </div>

                  <div className="flex h-16 w-1/3 gap-2">
                    <div className="flex w-full justify-between gap-2">
                      <div className="flex h-20 w-2/3  flex-col items-start">
                        <label
                          htmlFor="ativo"
                          className={`flex rounded-md px-1 text-blue_warm-70`}
                        >
                          <span className="flex items-center">
                            <span className="font-ald ">ATIVO:</span>
                          </span>
                        </label>
                        <input
                          {...register('ativo')}
                          type="checkbox"
                          id="ativo"
                          className={`h-10 w-full rounded-sm px-3 py-2 text-lg uppercase `}
                        />

                        {errors.ativo && (
                          <span
                            className={`ml-3 mt-1 flex items-center rounded-lg bg-red-600 px-2 text-white`}
                          >
                            <Icons name="circleX" className="mr-1 w-4" />
                            <span className="font-ald ">
                              {errors.ativo?.message}
                            </span>
                          </span>
                        )}
                      </div>
                      <div className="flex h-20 w-2/3  flex-col items-start">
                        <label
                          htmlFor="admin"
                          className={`flex rounded-md px-1 text-blue_warm-70`}
                        >
                          <span className="flex items-center">
                            <span className="font-ald ">ADMIN:</span>
                          </span>
                        </label>
                        <input
                          {...register('admin')}
                          id="admin"
                          type="checkbox"
                          className={`h-10 w-full rounded-sm px-3 py-2 text-lg uppercase `}
                        />

                        {errors.admin && (
                          <span
                            className={`ml-3 mt-1 flex items-center rounded-lg bg-red-600 px-2 text-white`}
                          >
                            <Icons name="circleX" className="mr-1 w-4" />
                            <span className="font-ald ">
                              {errors.admin?.message}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex w-2/4 justify-between gap-2">
                  <div className="flex h-20 w-2/3  flex-col items-start">
                    <label
                      htmlFor="senha"
                      className={`flex rounded-md px-1 text-blue_warm-70`}
                    >
                      <span className="flex items-center">
                        <span className="font-ald ">SENHA:</span>
                      </span>
                    </label>
                    <div className="relative w-full">
                      <input
                        {...register('senha')}
                        id="senha"
                        type={
                          view === 'bsEye' && !viewPass ? 'password' : 'text'
                        }
                        className={`h-10 w-full rounded-lg px-3 py-2 text-lg disabled:bg-gray-200 `}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                        onClick={handleIconClick}
                      >
                        <Icons name={view} />
                      </button>
                    </div>

                    {errors.senha && (
                      <span
                        className={`ml-3 mt-1 flex items-center rounded-lg bg-red-600 px-2 text-white`}
                      >
                        <Icons name="circleX" className="mr-1 w-4" />
                        <span className="font-ald ">
                          {errors.senha?.message}
                        </span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex w-full flex-col">
                  <span className="mb-5 w-full border-b-2 border-gray-300 font-serif text-blue_warm-70">
                    Dashboards!
                  </span>
                  <ul>
                    {categories.map((c, i) => (
                      <li key={i}>
                        <span>
                          <Input
                            className="flex w-2/4 flex-col items-start"
                            classNameInput="rounded-sm w-full text-lg"
                            classNameInputDiv="w-8 pl-2"
                            classNameLabel="text-blue_warm-70"
                            classNameError="bg-red-600 px-2 text-white rounded-lg ml-3 mt-1"
                            id={`${i}_category`}
                            type="checkbox"
                            label={c.nome_categoria}
                            register={register}
                            onChange={(e) => {
                              if (e.target.checked) {
                                const newCategory = [...selectedCategories, c]
                                setSelectedCategories(newCategory)
                              } else {
                                const removeCategory =
                                  selectedCategories.filter(
                                    (sc) => sc.id_categoria !== c.id_categoria,
                                  )
                                setSelectedCategories(removeCategory)
                              }
                            }}
                          />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute bottom-1 flex w-2/4 items-center justify-center gap-3 bg-gray-100 px-2">
                  <Button
                    type="submit"
                    className="h-11 w-48 max-w-52 rounded-3xl border-2 border-blue_warm-60 bg-blue_warm-40 text-center font-ald text-base uppercase text-white transition duration-300 hover:-translate-y-1 hover:scale-100 hover:bg-blue_warm-60"
                  >
                    editar
                  </Button>

                  <Button
                    type="button"
                    onClick={() => closeModal()}
                    className="h-11 w-48 max-w-52 rounded-3xl border-2 border-blue_warm-60 bg-red-400 text-center font-ald text-base uppercase text-white transition duration-300 hover:-translate-y-1 hover:scale-100 hover:bg-red-500"
                  >
                    cancelar
                  </Button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </main>
      <Footer />
    </>
  )
}
