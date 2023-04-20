import React from 'react'
import { View, SplitLayout, SplitCol, Panel } from '@vkontakte/vkui'

import '@vkontakte/vkui/dist/vkui.css'
import './global.css'
import { Loader } from './components'

const App = (): JSX.Element => {
  const [popout] = React.useState(<></>)

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View activePanel="main">
          <Panel id="main">
            <Loader />
          </Panel>
        </View>
      </SplitCol>
    </SplitLayout>
  )
}

export default App
