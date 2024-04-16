import Cookies from 'js-cookie'
import { LoginResponse, FormData, ErrorLogin } from './schema'
import { api } from './api'
import { AxiosError } from 'axios'

export async function signIn(data: FormData): Promise<ErrorLogin | undefined> {
  try {
    const login: LoginResponse = await api.post('/auth', {
      cpf_usuario: data.user,
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
