'use client'
import { useState } from 'react'

import { Button } from '@/components/Button'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Icons } from '@/components/Icons'

type UsersType = {
  id_usuario: string
  nome_usuario: string
  cpf_usuario: string
  email: string
  ativo: number
  admin: number
  created_at: string
  updated_at: string
}

export default function AccessControl() {
  const [selectedUser, setSelectedUser] = useState<UsersType>()

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
                        <Button onClick={() => setSelectedUser(u)}>
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
        </div>
      </main>
      <Footer />
    </>
  )
}
