import Image from 'next/image'
import reddata from '../../../public/assets/reddata.png'
import tceam from '../../../public/assets/logo.png'

export function Header() {
  return (
    <header className="flex items-center justify-between bg-gradient-to-tl from-blue_warm-80 to-blue_warm-20 px-5 py-2">
      <Image alt="Logo TCE-AM" height={70} src={tceam} className="rounded-lg" />
      <h1>Painel de Trabalho do Auditor</h1>
      <Image
        alt="Logo Redmaxx"
        height={70}
        src={reddata}
        className="rounded-lg"
      />
    </header>
  )
}
