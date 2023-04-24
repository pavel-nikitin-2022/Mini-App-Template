import React, { useCallback, useEffect, useState } from 'react'
import { useUploady } from '@rpldy/shared-ui'
import {
  DropPopup,
  ImagePreview,
  LoadButton,
  RestartButton,
  ResultCard,
} from './components'
import { SplitLayout, SplitCol, Panel, Placeholder } from '@vkontakte/vkui'
import { Icon56TagOutline } from '@vkontakte/icons'
import {
  useAbortAll,
  useItemFinishListener,
  useItemStartListener,
} from '@rpldy/uploady'
import { ProcessStatus, ServerAnswer } from './types'
import '@vkontakte/vkui/dist/vkui.css'
import './App.css'

const App = (): JSX.Element => {
  const [isDragging, setIsDragging] = useState(false)
  const [processStatus, setProcessStatus] = useState(ProcessStatus.Start)
  const [serverAnswer, setServerAnswer] = useState<ServerAnswer>(null)

  const { upload } = useUploady()
  const abortAll = useAbortAll()

  const discardDrag = useCallback(() => setIsDragging(false), [])

  const abortConnection = useCallback(() => {
    abortAll()
    setProcessStatus(ProcessStatus.Start)
  }, [abortAll])

  const onRestart = useCallback(() => {
    setProcessStatus(ProcessStatus.Start)
    setServerAnswer(null)
  }, [])

  useItemFinishListener((item) => {
    setServerAnswer(item.uploadResponse.data)
    setProcessStatus(ProcessStatus.Result)
  })

  useItemStartListener(() => {
    setProcessStatus(ProcessStatus.Pending)
  })

  // Обработка события paste
  useEffect(() => {
    // При входе в мини-апп фокус находится не в iframe, нужно явно его поставить
    window.focus()
    function onPaste(e: ClipboardEvent) {
      const files = e.clipboardData?.files
      if (!files || processStatus === ProcessStatus.Start) return
      upload(files as unknown as string[], { params: { test: 'paste' } })
    }
    window.addEventListener('paste', onPaste)

    return () => window.removeEventListener('paste', onPaste)
  }, [upload, processStatus])

  return (
    <SplitLayout>
      <SplitCol>
        <Panel
          onDragEnter={() => setIsDragging(true)}
          onMouseEnter={() => setIsDragging(false)}
        >
          <div className="App">
            <ImagePreview
              abortConnection={abortConnection}
              status={processStatus}
            />

            {serverAnswer && <ResultCard {...serverAnswer} />}

            {processStatus === ProcessStatus.Start && (
              <Placeholder
                icon={<Icon56TagOutline />}
                header="Определить питомца на фото"
                action={<LoadButton />}
              >
                Наши алгоритмы узнают, кто изображён на фотографии
              </Placeholder>
            )}

            {serverAnswer && <RestartButton onRestart={onRestart} />}
          </div>

          {processStatus === ProcessStatus.Start && (
            <DropPopup {...{ discardDrag, isDraging: isDragging }} />
          )}
        </Panel>
      </SplitCol>
    </SplitLayout>
  )
}

export default App
