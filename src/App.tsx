import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  useAbortAll,
  useItemFinishListener,
  useItemStartListener,
} from '@rpldy/uploady'
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
import { FetchMLAnswerResponse, ProcessStatus } from './types'
import { serverParser } from './utils'

import './App.css'

const App = (): JSX.Element => {
  const [isDragging, setIsDragging] = useState(false)
  const [processStatus, setProcessStatus] = useState(ProcessStatus.Start)
  const [imageWidth, setImageWidth] = React.useState(NaN)
  const serverAnswer = useRef<FetchMLAnswerResponse>({
    status: true,
    data: null,
  })
  const { upload } = useUploady()
  const abortAll = useAbortAll()

  const discardDrag = useCallback(() => setIsDragging(false), [])

  const abortConnection = useCallback(() => {
    abortAll()
    setProcessStatus(ProcessStatus.Start)
  }, [abortAll])

  const onRestart = useCallback(() => {
    setProcessStatus(ProcessStatus.Start)
    serverAnswer.current = { data: null, status: true }
  }, [])

  useItemFinishListener((item) => {
    serverAnswer.current = serverParser(item)
    setProcessStatus(ProcessStatus.Result)
  })

  useItemStartListener((event) => {
    const img = new Image()
    img.addEventListener('load', () => {
      window.URL.revokeObjectURL(img.src) // Очищение памяти
      setImageWidth(img.width)
    })
    img.src = window.URL.createObjectURL(event.file as unknown as Blob)
    setProcessStatus(ProcessStatus.Pending)
  })

  // Обработка события paste
  useEffect(() => {
    window.focus()
    function onPaste(e: ClipboardEvent) {
      const files = e.clipboardData?.files
      if (!files || processStatus !== ProcessStatus.Start) return
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
              imageWidth={imageWidth}
              coordinates={
                serverAnswer.current.status
                  ? serverAnswer.current.data?.coordinates
                  : undefined
              }
            />

            {processStatus === ProcessStatus.Result && (
              <ResultCard answer={serverAnswer.current} />
            )}

            {processStatus === ProcessStatus.Start && (
              <Placeholder
                icon={<Icon56TagOutline />}
                header="Определить питомца на фото"
                action={<LoadButton />}
              >
                Наши алгоритмы узнают, кто изображён на фотографии
              </Placeholder>
            )}

            {processStatus === ProcessStatus.Result && (
              <RestartButton onRestart={onRestart} />
            )}
          </div>

          {processStatus === ProcessStatus.Start && (
            <DropPopup {...{ discardDrag, isDraging: isDragging }} />
          )}
        </Panel>
      </SplitCol>
    </SplitLayout>
  )
}

export { App }
