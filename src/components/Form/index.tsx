import { FormEvent, useState } from 'react'

import { Button } from '../Button'
import { Input } from '../Input'

interface LoginType {
  user: string
  pass: string | number
}

export function Form() {
  const loginForm = { user: '', pass: '' }

  const [form, setForm] = useState<LoginType>(loginForm)

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log(form)
  }

  return (
    <form
      onSubmit={handleLogin}
      className="flex h-72 w-full flex-col items-center justify-center gap-10"
    >
      <span className="mb-10 font-ald text-2xl text-gray-100">
        Painel de Trabalho de Auditor
      </span>
      <div className="m-auto flex w-full flex-col items-center">
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
          className="h-11 w-48 max-w-52 bg-blue_warm-50 font-ald text-base uppercase transition duration-300 hover:-translate-x-1 hover:scale-100 hover:bg-blue_warm-60"
          nameButton="entrar"
        />
        <Button
          type="button"
          nameButton="cancelar"
          className="h-11 w-48 max-w-52 bg-blue_warm-50 font-ald text-base uppercase transition duration-300 hover:-translate-x-1 hover:scale-100 hover:bg-blue_warm-60"
        />
      </div>
    </form>
  )
}
