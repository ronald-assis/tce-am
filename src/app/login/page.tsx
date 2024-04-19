'use client'

import Image from 'next/image'
import Cookies from 'js-cookie'
import { Form } from '@/components/Form'
import reddata from '../../../public/assets/reddata.png'
import tceam from '../../../public/assets/logo.png'
import bgImage from '../../../public/assets/bg.png'

export default function Login() {
  Cookies.remove('token')
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue_warm-80 to-blue_warm-30">
      <div className="flex h-[560px] w-2/3 max-w-[960px] items-center justify-between rounded-lg bg-white shadow-2xl min-[1240px]:h-[644px] min-[1240px]:w-3/4 min-[1240px]:max-w-[960px]">
        <div className="h-full rounded-l-lg shadow-2xl">
          <Image
            alt="Imagem de fundo"
            src={bgImage}
            className="h-full w-full rounded-l-lg"
          />
        </div>
        <div className="flex h-full w-2/4 max-w-[450px] flex-col items-center rounded-r-lg bg-gradient-to-tl from-blue_warm-80 to-blue_warm-30 shadow-2xl">
          <div className="mb-24 flex w-full items-center justify-between p-3">
            <div className="w-3/4">
              <Image
                alt="TCE-AM logo"
                src={tceam}
                priority
                className="h-14 w-full rounded-lg"
              />
            </div>
            <div className="w-1/5 max-w-[75px]">
              <Image
                alt="RedData logo"
                src={reddata}
                priority
                className="h-14 w-full rounded-lg"
              />
            </div>
          </div>
          <Form />
        </div>
      </div>
    </main>
  )
}
