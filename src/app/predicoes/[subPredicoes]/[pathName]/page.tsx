type Props = {
  params: { pathName: string }
}

export default function Predicoes({ params }: Props) {
  return <p>{params.pathName}</p>
}
