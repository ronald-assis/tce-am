import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://reddata.com.br/tceam-api/api/v1/',
  withCredentials: false,
})
