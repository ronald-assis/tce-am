import Cookies from 'js-cookie'
import axios from 'axios'

const token = Cookies.get('token')

export const api = axios.create({
  baseURL: 'https://reddata.com.br/tceam-api/api/v1/',
  withCredentials: false,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
})
