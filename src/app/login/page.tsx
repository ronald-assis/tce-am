'use client'

import Image from 'next/image'
import { Form } from '@/components/Form'
import reddata from '../../../public/assets/reddata.png'
import tceam from '../../../public/assets/logo.png'

export default function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue_warm-80 to-blue_warm-30">
      <div className="flex h-[644px] w-2/4 max-w-[500px] flex-col items-center rounded-lg bg-[#87aae7] shadow-2xl">
        <div className="mb-20 flex w-full justify-between">
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
    </main>
  )
}
