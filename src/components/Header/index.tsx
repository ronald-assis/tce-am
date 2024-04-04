import Image from 'next/image'
import reddata from '../../../public/assets/reddata.png'
import tceam from '../../../public/assets/logo.png'

export function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-gradient-to-tl from-blue_warm-80 to-blue_warm-20 px-5 py-2 shadow-lg">
      <Image alt="Logo TCE-AM" height={70} src={tceam} className="rounded-lg" />
      <h1>Painel de Trabalho do Auditor</h1>
      <Image
        alt="Logo Redmaxx"
        height={60}
        src={reddata}
        className="rounded-lg"
      />
    </header>
  )
}
