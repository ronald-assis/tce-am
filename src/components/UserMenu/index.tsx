import { Button } from '../Button'
import { Icon } from '../Icon'

export function UserMenu() {
  return (
    <Button>
      <div className=" rounded-full bg-gray-500 text-white">
        <Icon name="user" />
      </div>
      <span>Olá, NOME</span>
      <Icon name="a-arrow-down" />
    </Button>
  )
}
