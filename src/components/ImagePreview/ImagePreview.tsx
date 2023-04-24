import UploadPreview from '@rpldy/upload-preview'
import React, { useEffect, useRef } from 'react'
import cx from 'classnames'
import { Button, Spinner } from '@vkontakte/vkui'
import { ProcessStatus } from '../../types'
import './ImagePreview.css'

type ImagePreviewProps = {
  status: ProcessStatus
  abortConnection: () => void
}

type PreviewMethods = {
  clear: () => void
  removePreview: (id: string) => void
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  status,
  abortConnection,
}) => {
  const previewMethodsRef = useRef<PreviewMethods>(null)
  const isLoading = status === ProcessStatus.Pending
  const isResult = status === ProcessStatus.Result

  useEffect(() => {
    if (status === ProcessStatus.Start && previewMethodsRef.current)
      previewMethodsRef.current.clear()
  }, [status])

  return (
    <>
      <div
        className={cx('Preview', {
          Preview_unload: isLoading,
          Preview_result: isResult,
        })}
      >
        {isLoading && <Spinner className="Preview__spinner" size="large" />}

        <UploadPreview previewMethodsRef={previewMethodsRef} />
      </div>

      {isLoading && (
        <Button
          size="l"
          mode="link"
          onClick={() => {
            abortConnection()
            if (!previewMethodsRef.current) return
            previewMethodsRef.current.clear()
          }}
        >
          Отмена
        </Button>
      )}
    </>
  )
}

export default React.memo(ImagePreview)
