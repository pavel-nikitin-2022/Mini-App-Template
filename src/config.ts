import { ServerAnswerFormatters } from './types'
import { fileFilter } from './utils'

export const SERVER_ANSWER_FORMATTERS_MAP: ServerAnswerFormatters = [
  {
    pattern: /(жаба|лягушка)/gi,
    message: '{animal} на {percent}%, мои чуваки',
  },
  {
    pattern: /(кот|кошечка|кошка)/gi,
    message: '{animal}, на {percent}%, мяу-мяу',
  },
  {
    pattern: /(собака)/gi,
    message: '{animal}, на {percent}%, гав-гав',
  },
]

export const UPLOADY_SETTINGS = {
  accept: '.png,.jpg,.jpeg',
  fileFilter: fileFilter,
  multiple: false,
  clearPendingOnAdd: true,
  maxConcurrent: 1,
  params: {
    meta: JSON.stringify({
      mode: ['multiobject'],
      images: [{ name: 'file' }],
    }),
  },
  headers: {
    accept: 'application/json',
  },
  destination: {
    url: `https://smarty.mail.ru/api/v1/objects/detect?oauth_token=${process.env.REACT_APP_VK_CLOUD_TOKEN}&oauth_provider=mcs`,
  },
}
