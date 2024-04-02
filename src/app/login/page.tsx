'use client'

import Image from 'next/image'
import { Form } from '@/components/Form'
import reddata from '@/assets/reddata.png'
import tceam from '@/assets/tceam-logo.jpg'

export default function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue_warm-30 to-blue_warm-80">
      <div className="flex h-[544px] w-2/4 max-w-[600px] flex-col items-center rounded-lg bg-blue_warm-10">
        <div className="mb-28 flex w-full justify-between">
          <Image
            alt="TCE-AM logo"
            src={tceam}
            width={300}
            height={50}
            className="ml-2 mt-2 rounded-lg"
          />
          <Image
            alt="RedData logo"
            src={reddata}
            width={100}
            height={50}
            className="mr-2 mt-2 rounded-lg"
          />
        </div>
        <Form />
      </div>
    </main>
  )
}
