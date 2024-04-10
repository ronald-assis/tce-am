import { Header } from '@/components/Header'

type Props = {
  params: { pathName: string }
}

export default function Predicoes({ params }: Props) {
  return (
    <>
      <Header title={params.pathName} />
    </>
  )
}
