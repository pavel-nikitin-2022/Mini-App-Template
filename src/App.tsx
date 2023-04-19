import React, { useState } from 'react'
import {
  View,
  ScreenSpinner,
  SplitLayout,
  SplitCol,
  Panel,
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'

const App = (): JSX.Element => {
  const [popout] = useState(<ScreenSpinner size="large" />)

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View activePanel="main">
          <Panel id="main"></Panel>
        </View>
      </SplitCol>
    </SplitLayout>
  )
}

export default App
