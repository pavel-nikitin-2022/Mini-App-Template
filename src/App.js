import React, { useState } from 'react'
import {
  View,
  ScreenSpinner,
  SplitLayout,
  SplitCol,
  Panel,
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'

function App() {
  const [popout] = useState(<ScreenSpinner size="large" />)

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View>
          <Panel id="main" />
        </View>
      </SplitCol>
    </SplitLayout>
  )
}

export default App
