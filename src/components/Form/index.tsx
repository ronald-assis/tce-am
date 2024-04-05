import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '../Button'
import { Input } from '../Input'

const loginSchema = z.object({
  user: z.string().min(3, { message: 'Este campo é obrigatório!' }),
  pass: z.string().min(1, { message: 'Este campo é obrigatório!' }),
})

type FormData = z.infer<typeof loginSchema>

export function Form() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  })

  const handleLogin = async (data: FormData) => {
    console.log(data, 'novo login')
    if (data) {
      router.push('/')
    }
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
        <Input
          id="user"
          className="mb-2 flex w-4/5 flex-col-reverse gap-1 text-2xl text-gray-500"
          classNameInput={errors.user && 'border-2 border-red-600'}
          icon="user"
          name="user"
          label={errors.user && errors.user?.message}
          classNameLabel="bg-red-600 text-[11px]  text-white w-44"
          iconLabel="circle-x"
          placeholder="Usuário"
          register={register}
        />

        <Input
          id="pass"
          type="password"
          icon="eye"
          placeholder="Senha"
          className="mb-2 flex w-4/5 flex-col-reverse gap-1 text-2xl text-gray-500"
          onIconClick
          classNameInput={errors.pass && 'border-2 border-red-600'}
          label={errors.pass && errors.pass?.message}
          iconLabel="circle-x"
          classNameLabel="bg-red-600 text-[11px]  text-white w-44"
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
