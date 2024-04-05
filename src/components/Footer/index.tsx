import Image from 'next/image'

import reddata from '../../../public/assets/reddata.png'
import redmaxx from '../../../public/assets/redmaxx_logo.jpg'

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between bg-gray-100 px-5 py-2 shadow-lg">
      <div className="flex gap-2">
        <Image
          alt="Logo RedData"
          height={60}
          src={reddata}
          className="rounded-lg"
        />

        <Image
          alt="Logo Redmaxx"
          height={60}
          src={redmaxx}
          className="rounded-lg"
        />
      </div>
      <h1>Painel de Trabalho do Auditor</h1>
    </footer>
  )
}
