import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

export interface User {
  id_usuario: string
  nome_usuario: string
  admin: number
}

export function getUser(): User {
  const token = Cookies.get('token')

  if (!token) {
    throw new Error('Unauthenticated')
  }

  const user: User = jwtDecode(token)

  return user
}
