import React from 'react'
import { Button } from '@vkontakte/vkui'
import './RestartButton.css'

type ResultButtonsProps = {
  onRestart: () => void
}

const ResultButtons: React.FC<ResultButtonsProps> = ({ onRestart }) => {
  return (
    <div className="RestartButton">
      <Button stretched={true} onClick={onRestart}>
        Вернуться
      </Button>
    </div>
  )
}

export default React.memo(ResultButtons)
