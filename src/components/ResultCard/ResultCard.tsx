import React from 'react'
import { Card } from '@vkontakte/vkui'
import { ServerAnswer } from '../../types'
import './ResultCard.css'

const ImagePreview: React.FC<ServerAnswer> = ({ animal, probability }) => {
  return (
    <Card className="ResultCard">
      <div className="ResultCard__subtitle">Алгоритм уверен что это</div>

      <div className="ResultCard__title">
        {animal} на {probability}%
      </div>
    </Card>
  )
}

export default React.memo(ImagePreview)
