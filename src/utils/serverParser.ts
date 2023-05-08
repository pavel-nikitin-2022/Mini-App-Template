import { SERVER_ANSWER_FORMATTERS_MAP } from 'src/config'
import { BatchItem } from '@rpldy/shared-ui'
import { FetchMLAnswerResponse } from 'src/types'

type Label = {
  rus: string
  prob: number
  coord: [number, number, number, number]
}

/**
 * Парсит ответ в сервера в FetchMLAnswerResponse формат
 * @param response - ответ сервера
 * @returns FetchMLAnswerResponse
 */
export function serverParser(response: BatchItem): FetchMLAnswerResponse {
  const data = response.uploadResponse.data

  if (data.status !== 200) {
    console.error(data.body)
    return {
      status: false,
      error: data.body,
    }
  }

  const multiobjectLabels: Label[] = data.body.multiobject_labels[0].labels
  if (!multiobjectLabels)
    return {
      status: true,
      data: null,
    }

  const patternLabels = multiobjectLabels
    .filter((item) => {
      const formatter = SERVER_ANSWER_FORMATTERS_MAP.find((formatter_item) => {
        return formatter_item.pattern.test(item.rus)
      })
      return Boolean(formatter)
    })
    .sort((a, b) => a.prob - b.prob)

  if (!patternLabels.length) return { status: true, data: null }

  return {
    status: true,
    data: {
      coordinates: patternLabels[0]?.coord,
      probability: patternLabels[0]?.prob,
      animal: patternLabels[0]?.rus,
    },
  }
}
