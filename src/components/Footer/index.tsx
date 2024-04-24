import Image from 'next/image'

import reddata from '../../../public/assets/reddata.png'
import redmaxx from '../../../public/assets/redmaxx_logo.jpg'
import { Icons } from '../Icons'

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-gray-100 px-5 py-2 shadow-lg">
      <nav className="flex items-center justify-around">
        <a
          href="https://www.redmaxx.com.br/"
          target="_blank"
          className="flex cursor-pointer gap-2"
          rel="noreferrer"
        >
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
        </a>
        <ul className="flex gap-3 text-blue_warm-80">
          <li>
            <a
              href="https://www.linkedin.com/company/redmaxx/mycompany/"
              target="_blank"
              rel="noreferrer"
            >
              <Icons name="faLinkedin" />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/redmaxxbr"
              target="_blank"
              rel="noreferrer"
            >
              <Icons name="faXTwitter" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/redmaxxbr/"
              target="_blank"
              rel="noreferrer"
            >
              <Icons name="faInstagram" />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  )
}
