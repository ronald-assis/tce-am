import { LoginResponse, FormData, ErrorLogin } from './schema'
import { api } from './api'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'

export async function signIn(data: FormData): Promise<ErrorLogin | undefined> {
  try {
    const user = data.user.replace(/\D/g, '')
    const login: LoginResponse = await api.post('/auth', {
      cpf_usuario: user,
      senha_usuario: data.pass,
    })

    Cookies.set('token', login.data.token)
  } catch (e) {
    const error = e as AxiosError | Error
    if (error instanceof AxiosError) {
      if (error.response) {
        return {
          data: {
            error: true,
            message: error.response.data.message || 'Unknown error',
          },
        }
      }
    }
  }
}
