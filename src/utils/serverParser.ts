import { BatchItem } from '@rpldy/shared-ui'
import { ServerAnswer } from '../types'

/**
 * Парсит ответ в сервера в ServerAnswer формат
 * @param response - ответ сервера
 * @returns ServerAnswer
 */
export function serverParser(response: BatchItem): ServerAnswer {
  const data = response.uploadResponse.data.multiobject_labels[0].labels[0]

  if (data)
    return {
      coordinates: data.coord,
      probability: data.prob,
      animal: data.rus,
    }

  return null
}
