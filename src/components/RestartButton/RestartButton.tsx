import React from 'react'
import { Button } from '@vkontakte/vkui'
import './RestartButton.css'

type ResultButtonsProps = {
  onRestart: () => void
}

let RestartButton: React.FC<ResultButtonsProps> = ({ onRestart }) => {
  return (
    <Button className="RestartButton" stretched={true} onClick={onRestart}>
      Вернуться
    </Button>
  )
}

RestartButton = React.memo(RestartButton)

export { RestartButton }
