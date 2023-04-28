import React from 'react'
import ReactDOM from 'react-dom'
import bridge from '@vkontakte/vk-bridge'
import Uploady from '@rpldy/uploady'
import { getMockSenderEnhancer } from '@rpldy/mock-sender'
import { ConfigProvider, AdaptivityProvider, AppRoot } from '@vkontakte/vkui'
import { fileFilter } from './utils'
import { App } from './App'

bridge.send('VKWebAppInit')
const mockSenderEnhancer = getMockSenderEnhancer({
  response: {
    multiobject_labels: [
      {
        status: 0,
        name: 'file',
        labels: [
          {
            eng: 'Person',
            rus: 'Человек',
            eng_categories: [],
            rus_categories: [],
            prob: 0.9586,
            coord: [100, 100, 300, 300],
          },
          {
            eng: 'Person',
            rus: 'Человек',
            eng_categories: [],
            rus_categories: [],
            prob: 0.9102,
            coord: [130, 325, 238, 428],
          },
          {
            eng: 'Person',
            rus: 'Человек',
            eng_categories: [],
            rus_categories: [],
            prob: 0.8765,
            coord: [208, 293, 258, 353],
          },
        ],
      },
    ],
  },
  delay: 3000,
})

ReactDOM.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <AppRoot>
        <Uploady
          accept=".png,.jpg,.jpeg"
          fileFilter={fileFilter}
          multiple={false}
          clearPendingOnAdd
          maxConcurrent={1}
          enhancer={mockSenderEnhancer}
          destination={{
            url: 'https://lunacom.com',
            filesParamName: 'file',
            headers: {
              mode: ['scene', 'multiobject', 'pedestrian'],
              images: [
                {
                  name: 'file',
                },
              ],
            },
          }}
        >
          <App />
        </Uploady>
      </AppRoot>
    </AdaptivityProvider>
  </ConfigProvider>,
  document.getElementById('root')
)
