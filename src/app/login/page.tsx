'use client'

import Image from 'next/image'
import { Form } from '@/components/Form'
import reddata from '../../../public/assets/reddata.png'
import tceam from '../../../public/assets/logo.png'
import bgImage from '../../../public/assets/bg.png'

export default function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue_warm-80 to-blue_warm-30">
      <div className="flex h-[644px] w-4/5 max-w-[960px] items-center justify-between rounded-lg bg-white shadow-2xl">
        <div className="h-full rounded-l-lg shadow-2xl">
          <Image
            alt="Imagem de fundo"
            src={bgImage}
            className="h-full w-full rounded-l-lg"
          />
        </div>
        <div className="flex h-full w-2/4 max-w-[450px] flex-col items-center rounded-r-lg bg-gradient-to-tl from-blue_warm-80 to-blue_warm-30 shadow-2xl">
          <div className="mb-24 flex w-full justify-between">
            <Image
              alt="TCE-AM logo"
              src={tceam}
              width={300}
              height={50}
              priority
              className="ml-2 mt-2 rounded-lg"
            />
            <Image
              alt="RedData logo"
              src={reddata}
              width={100}
              height={50}
              priority
              className="mr-2 mt-2 rounded-lg"
            />
          </div>
          <Form />
        </div>
      </div>
    </main>
  )
}
