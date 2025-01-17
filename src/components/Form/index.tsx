import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '../Button'
import { Input } from '../Input'
import { signIn } from '@/lib/auth'
import { useState } from 'react'

const loginSchema = z.object({
  user: z.string({ required_error: 'CPF é obrigatório.' }).refine((doc) => {
    const replacedDoc = doc.replace(/\D/g, '')
    return !!Number(replacedDoc)
  }, 'CPF deve conter apenas números.'),
  pass: z.string().min(1, { message: 'Este campo é obrigatório!' }),
})

interface ErrorServerType {
  error: boolean
  message: string | undefined
}

type FormData = z.infer<typeof loginSchema>

const errorState: ErrorServerType = {
  error: false,
  message: '',
}

export function Form() {
  const router = useRouter()
  const [errorServer, setErrorServer] = useState(errorState)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  })

  const handleLogin = async (data: FormData) => {
    const result = await signIn(data)

    if (!result?.data?.error) {
      setErrorServer({ error: false, message: '' })
      return router.push('/')
    }

    setErrorServer({ error: true, message: result?.data?.message })
  }

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="flex h-72 w-full flex-col items-center justify-center gap-10"
    >
      <span className="mb-6 font-ald text-2xl text-gray-100">
        Painel de Trabalho de Auditor
      </span>

      <div className="m-auto flex w-full flex-col items-center gap-3">
        {errorServer.error && (
          <span className="w-4/5 rounded-md bg-red-600 px-2 text-lg text-white opacity-75">
            {errorServer.message}
          </span>
        )}
        <Input
          id="user"
          className="mb-2 flex w-4/5 flex-col-reverse gap-1 text-2xl text-gray-500"
          classNameInput={`${errors.user ? 'border-2 border-red-600' : ''} w-full focus:outline-0`}
          icon="user"
          name="user"
          mask
          label={errors.user && errors.user?.message}
          classNameLabel="bg-red-600 w-56 flex justify-start pl-2 text-start text-[11px]  text-white"
          iconLabel="circleX"
          placeholder="CPF:"
          register={register}
        />

        <Input
          id="pass"
          type="password"
          icon="bsEye"
          placeholder="Senha"
          className="mb-2 flex w-4/5 flex-col-reverse gap-1 text-2xl text-gray-500"
          onIconClick
          classNameInput={`${errors.pass ? 'border-2 border-red-600' : ''} w-full focus:outline-0`}
          label={errors.pass && errors.pass?.message}
          iconLabel="circleX"
          classNameLabel="bg-red-600 text-[11px] justify-center text-white w-44"
          name="pass"
          register={register}
        />
      </div>

      <div className="flex w-full items-center justify-around gap-3 px-10">
        <Button
          type="submit"
          className="h-11 w-48 max-w-52 rounded-3xl border-2 border-blue_warm-60 bg-blue_warm-50 text-center font-ald text-base uppercase text-white transition duration-300 hover:-translate-y-1 hover:scale-100 hover:bg-blue_warm-60"
        >
          entrar
        </Button>

        <Button
          type="button"
          onClick={() => reset()}
          className="h-11 w-48 max-w-52 rounded-3xl border-2 border-blue_warm-60 bg-blue_warm-50 text-center font-ald text-base uppercase text-white transition duration-300 hover:-translate-y-1 hover:scale-100 hover:bg-blue_warm-60"
        >
          limpar
        </Button>
      </div>
    </form>
  )
}
