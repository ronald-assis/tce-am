import { FormEvent, useState } from 'react'

import { Button } from '../Button'
import { Input } from '../Input'
import { ZodError, z } from 'zod'

type FormType = {
  user: string
  pass: string
}

const loginSchema = z.object({
  user: z.string({ required_error: 'Este campo é obrigatório' }).min(3),
  pass: z.string({ required_error: 'Este campo é obrigatório' }).min(3),
})

export function Form() {
  const [form, setForm] = useState<FormType>({ user: '', pass: '' })
  const [errors, setErrors] = useState<ZodError | null>(null)

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      loginSchema.safeParse(form)
      console.log(form)
    } catch (error) {
      if (error instanceof ZodError) {
        setErrors(error)
        console.log(errors, 'error')
      }
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="flex h-72 w-full flex-col items-center justify-center gap-10"
    >
      <span className="mb-10 font-ald text-2xl text-gray-100">
        Painel de Trabalho de Auditor
      </span>
      <div className="m-auto flex w-full flex-col items-center gap-3">
        <Input
          id="user"
          name="user"
          value={form.user}
          className="mb-2 flex w-4/5 flex-col gap-1 text-2xl text-gray-500"
          icon="user"
          placeholder="Usuário"
          onChange={(e) => setForm({ ...form, user: e.target.value })}
        />

        <Input
          id="pass"
          name="pass"
          value={form.pass}
          type="password"
          icon="eye"
          placeholder="Senha"
          className="mb-2 flex w-4/5 flex-col gap-1 text-2xl text-gray-500"
          onChange={(e) => setForm({ ...form, pass: e.target.value })}
          onIconClick
        />
      </div>

      <div className="flex w-full items-center justify-around px-10">
        <Button
          type="submit"
          className="h-11 w-52 max-w-52 bg-blue_warm-50 font-ald text-base uppercase transition duration-300 hover:-translate-x-1 hover:scale-100 hover:bg-blue_warm-60"
          nameButton="entrar"
        />

        <Button
          type="button"
          nameButton="limpar"
          onClick={() => setForm({ user: '', pass: '' })}
          className="h-11 w-48 max-w-52 bg-blue_warm-50 font-ald text-base uppercase transition duration-300 hover:-translate-x-1 hover:scale-100 hover:bg-blue_warm-60"
        />
      </div>
    </form>
  )
}
