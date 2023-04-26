import React from 'react'
import { Card } from '@vkontakte/vkui'
import { ServerAnswer } from '../../types'
import './ResultCard.css'

type ResultCardProps = {
  answer: ServerAnswer
}

let ResultCard: React.FC<ResultCardProps> = ({ answer }) => {
  return (
    <Card className="ResultCard">
      <div className="ResultCard__subtitle">Алгоритм уверен что это</div>

      <div className="ResultCard__title">
        {answer?.animal} на {answer?.probability}%
      </div>
    </Card>
  )
}

ResultCard = React.memo(ResultCard)

export { ResultCard }
