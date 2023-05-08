import React from 'react'
import cx from 'classnames'
import { Card } from '@vkontakte/vkui'
import { FetchMLAnswerData, FetchMLAnswerResponse } from 'src/types'
import { SERVER_ANSWER_FORMATTERS_MAP } from 'src/config'

import './ResultCard.css'

const formatResultTitleAnswer = (serverAnswer: FetchMLAnswerData): string => {
  if (!serverAnswer) return 'Не кошечка, не собачка'
  const formatter = SERVER_ANSWER_FORMATTERS_MAP.find((item) => {
    return serverAnswer.animal.match(item.pattern)
  })

  if (!formatter) return 'Не кошечка, не собачка'

  return formatter.message
    .replaceAll('{animal}', serverAnswer.animal)
    .replaceAll(
      '{percent}',
      (serverAnswer.probability * 100).toFixed().toString()
    )
}

type ResultCardProps = {
  answer: FetchMLAnswerResponse
}

let ResultCard: React.FC<ResultCardProps> = ({ answer }) => {
  const title = answer.status
    ? formatResultTitleAnswer(answer.data)
    : 'Попробуйте загрузить другое фото'

  const subtitle = answer.status
    ? 'Алгоритм уверен, что это'
    : 'Произошла ошибка'

  return (
    <Card className="ResultCard">
      <div className="ResultCard__subtitle">{subtitle}</div>

      <div
        className={cx('ResultCard__title', {
          ResultCard__title_error: !answer.status,
        })}
      >
        {title}
      </div>
    </Card>
  )
}

ResultCard = React.memo(ResultCard)

export { ResultCard }
