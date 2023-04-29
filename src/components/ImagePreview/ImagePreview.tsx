import React, { useEffect, useRef } from 'react'
import UploadPreview, { PreviewMethods } from '@rpldy/upload-preview'
import cx from 'classnames'
import { Button, Spinner } from '@vkontakte/vkui'
import { ProcessStatus } from 'types'
import { updateCoords } from 'utils'

import './ImagePreview.css'

export type ImagePreviewProps = {
  status: ProcessStatus
  abortConnection: () => void
  coordinates?: [number, number, number, number]
  imageWidth?: number
}

let ImagePreview: React.FC<ImagePreviewProps> = ({
  status,
  coordinates,
  imageWidth,
  abortConnection,
}) => {
  const previewMethodsRef = useRef<PreviewMethods>(null)
  const $foundObject = React.useRef<HTMLDivElement>(null)
  const $preview = React.useRef<HTMLDivElement>(null)

  const isLoading = status === ProcessStatus.Pending
  const isResult = status === ProcessStatus.Result

  const onHandleClick = React.useCallback(() => {
    abortConnection()
    if (!previewMethodsRef.current) return
    previewMethodsRef.current.clear()
  }, [abortConnection])

  useEffect(() => {
    if (status === ProcessStatus.Start && previewMethodsRef.current)
      previewMethodsRef.current.clear()

    if (coordinates && $foundObject.current && imageWidth && $preview.current) {
      const newCoords = updateCoords(
        $preview.current.scrollWidth,
        imageWidth,
        coordinates
      )

      Object.assign($foundObject.current.style, {
        top: `${newCoords[0]}px`,
        left: `${newCoords[1]}px`,
        width: `${newCoords[2] - newCoords[0]}px`,
        height: `${newCoords[3] - newCoords[1]}px`,
      })
    }
  }, [status, coordinates, imageWidth])

  return (
    <>
      <div
        ref={$preview}
        className={cx('Preview', {
          Preview_unload: isLoading,
          Preview_result: isResult,
        })}
      >
        {isLoading && <Spinner className="Preview__spinner" size="large" />}

        {isResult && (
          <div ref={$foundObject} className="Preview__FoundObject" />
        )}

        <UploadPreview previewMethodsRef={previewMethodsRef} />
      </div>

      {isLoading && (
        <Button size="l" mode="link" onClick={onHandleClick}>
          Отмена
        </Button>
      )}
    </>
  )
}

ImagePreview = React.memo(ImagePreview)

export { ImagePreview }
