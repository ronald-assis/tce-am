import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { redirect } from 'next/navigation'
import Cookies from 'js-cookie'

export interface User {
  id_usuario: string
  nome_usuario: string
  admin: number
}

export function getUser(): User {
  const token = Cookies.get('token')

  axios.defaults.headers.common.Authorization = token ? `Bearer ${token}` : ''

  if (!token) {
    return redirect('/login')
  }

  const user: User = jwtDecode(token)

  return user
}
