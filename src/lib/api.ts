import * as https from 'https'
import axios from 'axios'

const agent = new https.Agent({
  rejectUnauthorized: false,
})

export const api = axios.create({
  baseURL: 'https://reddata.com.br/tceam-api/api/v1/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

axios.defaults.httpsAgent = agent
// api
//   .post('/auth', {
//     cpf_usuario: '12345678900',
//     senha_usuario: 'redmaxx22',
//   })
//   .then((data) => console.log('teste =>', data))

// axios
//   .post(
//     'http://reddata.com.br/tceam-api/api/v1/auth',
//     {
//       cpf_usuario: '12345678900',
//       senha_usuario: 'redmaxx22',
//     },
//     {
//       httpAgent: new https.Agent({
//         rejectUnauthorized: false,
//       }),
//     },
//   )
//   .then((data) => console.log(data))
