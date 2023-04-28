import React from 'react'
import { Card } from '@vkontakte/vkui'
import { ServerAnswer } from '../../types'
import './ResultCard.css'

type ResultCardProps = {
  answer: ServerAnswer
}

let ResultCard: React.FC<ResultCardProps> = ({ answer }) => {
  const title = answer
    ? `${answer?.animal} на ${Math.floor(answer?.probability * 100)}%`
    : 'Неизвестный индивид'

  return (
    <Card className="ResultCard">
      <div className="ResultCard__subtitle">Алгоритм уверен, что это</div>

      <div className="ResultCard__title">{title}</div>
    </Card>
  )
}

ResultCard = React.memo(ResultCard)

export { ResultCard }
