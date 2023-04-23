import React from 'react'
import { useUploady } from '@rpldy/shared-ui'
import { SplitLayout, SplitCol, Panel } from '@vkontakte/vkui'
import { DropPopup, ImagePreview, LoadButton } from './components'

import '@vkontakte/vkui/dist/vkui.css'
import './App.css'

const App = (): JSX.Element => {
  const [popout] = React.useState(<></>)
  const [isDraging, setIsDraging] = React.useState(false)
  const { upload } = useUploady()

  const discardDrag = React.useCallback(() => setIsDraging(false), [])

  React.useEffect(() => {
    window.focus()
    window.addEventListener('paste', (e) => {
      const files = e.clipboardData?.files
      if (!files) return
      upload(files as unknown as string[], { params: { test: 'paste' } })
    })
  }, [upload])

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <Panel
          onDragEnter={() => setIsDraging(true)}
          onMouseEnter={() => setIsDraging(false)}
        >
          <div className="App">
            <ImagePreview />
            <DropPopup {...{ discardDrag, isDraging }} />
            <LoadButton />
          </div>
        </Panel>
      </SplitCol>
    </SplitLayout>
  )
}

export default App
