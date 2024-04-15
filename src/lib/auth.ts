import Cookies from 'js-cookie'
import { LoginResponse, ErrorLogin, FormData } from './schema'
import { api } from './api'

export async function signIn(
  data: FormData,
): Promise<ErrorLogin | LoginResponse> {
  try {
    const login: LoginResponse = await api.post('/auth', {
      cpf_usuario: data.user,
      senha_usuario: data.pass,
    })

    if (!login.data.token) {
      return {
        data: {
          error: true,
          message: 'Erro na credencial.',
        },
      }
    }

    Cookies.set('token', login.data.token)

    return login
  } catch (error) {
    console.error('Erro durante o login:', error)
    return {
      data: {
        error: true,
        message: 'Erro durante o login.',
      },
    }
  }
}
