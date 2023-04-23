import React from 'react'
import ReactDOM from 'react-dom'
import bridge from '@vkontakte/vk-bridge'
import { ConfigProvider, AdaptivityProvider, AppRoot } from '@vkontakte/vkui'
import App from './App'
import Uploady from '@rpldy/uploady'
import { getMockSenderEnhancer } from '@rpldy/mock-sender'

bridge.send('VKWebAppInit')
const mockSenderEnhancer = getMockSenderEnhancer({})

// Фильтр на файлы
const filter = (file: File | string, index: number) => {
  if (typeof file === 'string') return false
  const type = file.type.replace(/\/.+/, '')
  return type === 'image' && index === 0
}

ReactDOM.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <AppRoot>
        <Uploady
          fileFilter={filter}
          multiple={false}
          enhancer={mockSenderEnhancer}
        >
          <App />
        </Uploady>
      </AppRoot>
    </AdaptivityProvider>
  </ConfigProvider>,
  document.getElementById('root')
)
