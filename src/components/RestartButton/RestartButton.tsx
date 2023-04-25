import React from 'react'
import { Button } from '@vkontakte/vkui'
import './RestartButton.css'

type ResultButtonsProps = {
  onRestart: () => void
}

let RestartButton: React.FC<ResultButtonsProps> = ({ onRestart }) => {
  return (
    <div className="RestartButton">
      <Button stretched={true} onClick={onRestart}>
        Вернуться
      </Button>
    </div>
  )
}

RestartButton = React.memo(RestartButton)

export { RestartButton }
