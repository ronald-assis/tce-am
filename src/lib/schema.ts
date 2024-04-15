import { z } from 'zod'

export const LoginSchema = z.object({
  user: z.string({ required_error: 'CPF é obrigatório.' }).refine((doc) => {
    const replacedDoc = doc.replace(/\D/g, '')
    return !!Number(replacedDoc)
  }, 'CPF deve conter apenas números.'),
  pass: z.string().min(1, { message: 'Este campo é obrigatório!' }),
})

export interface LoginResponse {
  data: {
    acknowledge: boolean
    token: string
    user_id: string
    error?: string
  }
}

export interface ErrorLogin {
  data: {
    error: boolean
    message: string
  }
}

export type FormData = z.infer<typeof LoginSchema>
