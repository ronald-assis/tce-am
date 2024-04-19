import axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get('token')

export const api = axios.create({
  baseURL: 'https://reddata.com.br/tceam-api/api/v1/',
  withCredentials: false,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
})
