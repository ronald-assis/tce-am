'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Modal from 'react-modal'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/Button'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Icons } from '@/components/Icons'
import { Input } from '@/components/Input'

const dataSchema = z.object({
  nome_usuario: z.string().min(3, { message: 'Este campo é obrigatório!' }),
  cpf_usuario: z.string().min(3, { message: 'Este campo é obrigatório!' }),
  email: z.string().min(1, { message: 'Este campo é obrigatório!' }),
  ativo: z.boolean({ description: 'Este campo é obrigatorio' }),
  admin: z.boolean({ description: 'Este campo é obrigatorio' }),
})

type FormData = z.infer<typeof dataSchema>

type UsersType = {
  id_usuario: string
  nome_usuario: string
  cpf_usuario: string
  email: string
  ativo: number
  admin: number
  created_at: string
  updated_at: string
  senha?: string
  id_categorias?: string[]
}

type UserToRegister = Omit<
  UsersType,
  'created_at' | 'updated_at' | 'id_usuario'
>

export default function AccessControl() {
  const [modalIsOpenOrClose, setModalIsOpenOrClose] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserToRegister>({
    admin: 0,
    ativo: 1,
    cpf_usuario: '38238938938',
    email: 'ronaldassis02@gmia.com',
    nome_usuario: 'ronald assis sales da silva',
  })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(dataSchema),
  })

  const users: UsersType[] = [
    {
      id_usuario: 'd7d0ce69-3e80-4d70-9582-d8d3cf13ece9',
      nome_usuario: 'Maria da Paz',
      cpf_usuario: '73891309272',
      email: 'mariapaz@gmail.com',
      ativo: 1,
      admin: 0,
      created_at: '2024-04-04T19:52:00.572Z',
      updated_at: '2024-04-05T15:49:20.945Z',
    },
    {
      id_usuario: 'd7d0ce69-3e80-4d70-9582-d8d3cf13ece9',
      nome_usuario: 'Maria da Paz',
      cpf_usuario: '77391309272',
      email: 'mariapaz@gmail.com',
      ativo: 1,
      admin: 1,
      created_at: '2024-04-04T19:52:00.572Z',
      updated_at: '2024-04-05T15:49:20.945Z',
    },
  ]

  const handleRegiterOrUpdate = async (data: FormData) => {
    console.log(data, modalIsOpenOrClose)
  }

  const closeModal = () => {
    setModalIsOpenOrClose(false)
    reset()
  }

  const openModal = (info: UsersType) => {
    console.log('click')
    setModalIsOpenOrClose(true)
    setSelectedUser(info)
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
                  <th className="text-md px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="mt-5">
                {users.map((u, i) => (
                  <tr
                    key={u.cpf_usuario}
                    className={
                      i % 2 === 1 ? 'bg-blue_warm-5' : 'bg-blue_warm-10'
                    }
                  >
                    <td className="text-md border border-solid border-gray-300 px-6 py-3">
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
                        {u.ativo === 1 ? (
                          <Icons name="checkbox" />
                        ) : (
                          <Icons name="faClose" />
                        )}
                      </span>
                    </td>

                    <td className="text-md border border-solid border-gray-300 px-6 py-3">
                      <span className="flex justify-center">
                        {u.admin === 1 ? (
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
                        <Button onClick={() => console.log(selectedUser)}>
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
            isOpen={modalIsOpenOrClose}
            onRequestClose={() => setModalIsOpenOrClose(false)}
            className="fixed bottom-0 left-0 right-0 top-28 flex flex-col items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm"
          >
            <div className="relative flex h-[28rem] w-2/3 max-w-[720px] flex-col overflow-auto rounded-lg bg-gray-100 p-4">
              <span className="mb-5 border-b-2 border-gray-300 font-serif text-blue_warm-70">
                Cadastrar ou Editar
              </span>
              <form
                onSubmit={handleSubmit(handleRegiterOrUpdate)}
                className="flex h-80 w-full flex-col gap-2 overflow-auto rounded-lg border bg-blue_warm-5 p-2"
              >
                <div className="flex w-full justify-between gap-2">
                  <Input
                    className="flex h-20 w-2/3 flex-col items-start"
                    classNameInput="rounded-lg disabled:bg-gray-200 rounded-lg w-full text-lg h-10 uppercase"
                    classNameInputDiv="w-full"
                    classNameLabel="text-blue_warm-70"
                    errorMessage={
                      errors.nome_usuario && errors.nome_usuario?.message
                    }
                    label="NOME:"
                    disabled
                    register={register}
                    value={selectedUser.nome_usuario}
                  />
                  <Input
                    className="flex h-20 w-1/3 flex-col items-start"
                    classNameInput="rounded-lg disabled:bg-gray-200 rounded-lg w-full text-lg h-10 uppercase"
                    classNameInputDiv="w-full"
                    classNameLabel="text-blue_warm-70"
                    errorMessage={
                      errors.cpf_usuario && errors.cpf_usuario?.message
                    }
                    label="CPF:"
                    disabled
                    register={register}
                    value={selectedUser.cpf_usuario}
                  />
                </div>

                <div className="flex w-full justify-between gap-2">
                  <Input
                    className="flex h-20 w-2/3 flex-col items-start"
                    classNameInput="rounded-lg w-full text-lg h-10 uppercase"
                    classNameInputDiv="w-full"
                    classNameLabel="text-blue_warm-70"
                    label="E-MAIL:"
                    value={selectedUser.email}
                    errorMessage={errors.email && errors.email?.message}
                  />

                  <div className="flex h-16 w-1/3 gap-2">
                    <Input
                      className="flex w-2/4 flex-col items-start"
                      classNameInput="rounded-sm w-full text-lg"
                      classNameInputDiv="w-8 pl-2"
                      classNameLabel="text-blue_warm-70"
                      errorMessage={errors.ativo && errors.ativo?.message}
                      id="ativo"
                      type="checkbox"
                      label="ATIVO:"
                      register={register}
                      checked={selectedUser.ativo === 1}
                    />
                    <Input
                      className="flex w-2/4 flex-col items-start"
                      classNameInput="rounded-sm text-lg"
                      classNameInputDiv="w-8 pl-2"
                      classNameLabel="text-blue_warm-70"
                      errorMessage={errors.admin && errors.admin?.message}
                      id="admin"
                      type="checkbox"
                      label="ADMIN:"
                      register={register}
                      checked={selectedUser.admin === 1}
                    />
                  </div>
                </div>

                <div className="w-full">
                  <span className="mb-5 w-full border-b-2 border-gray-300 font-serif text-blue_warm-70">
                    Dashboards
                  </span>
                </div>

                <div className="absolute bottom-4 flex w-4/5 items-center justify-around gap-3 px-2">
                  <Button
                    type="submit"
                    className="h-11 w-48 max-w-52 rounded-3xl border-2 border-blue_warm-60 bg-blue_warm-50 text-center font-ald text-base uppercase text-white transition duration-300 hover:-translate-y-1 hover:scale-100 hover:bg-blue_warm-60"
                  >
                    entrar
                  </Button>

                  <Button
                    type="button"
                    onClick={() => closeModal()}
                    className="h-11 w-48 max-w-52 rounded-3xl border-2 border-blue_warm-60 bg-blue_warm-50 text-center font-ald text-base uppercase text-white transition duration-300 hover:-translate-y-1 hover:scale-100 hover:bg-blue_warm-60"
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
