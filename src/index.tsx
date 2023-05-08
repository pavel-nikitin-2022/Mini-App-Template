import React from 'react'
import ReactDOM from 'react-dom'
import bridge from '@vkontakte/vk-bridge'
import Uploady from '@rpldy/uploady'
import { ConfigProvider, AdaptivityProvider, AppRoot } from '@vkontakte/vkui'
import { App } from './App'
import { UPLOADY_SETTINGS } from './config'

import '@vkontakte/vkui/dist/vkui.css'

bridge.send('VKWebAppInit')

ReactDOM.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <AppRoot>
        <Uploady {...UPLOADY_SETTINGS}>
          <App />
        </Uploady>
      </AppRoot>
    </AdaptivityProvider>
  </ConfigProvider>,
  document.getElementById('root')
)
