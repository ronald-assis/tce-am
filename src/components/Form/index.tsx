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
      className="flex h-72 w-2/4 flex-col items-center justify-center gap-3 bg-blue_warm-5"
    >
      <span className="mb-10">Painel de Trabalho de Auditor</span>
      <Input
        id="user"
        name="user"
        value={form.user}
        label="Usuário"
        className="mb-2 flex flex-col gap-1"
        onChange={(e) => setForm({ ...form, user: e.target.value })}
      />

      <Input
        id="pass"
        name="pass"
        value={form.pass}
        type="password"
        label="Senha"
        className="flex flex-col gap-1"
        onChange={(e) => setForm({ ...form, pass: e.target.value })}
      />

      <Button type="submit" />
    </form>
  )
}
