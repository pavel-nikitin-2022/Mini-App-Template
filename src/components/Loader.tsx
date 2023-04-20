import React from 'react'
import { Button } from '@vkontakte/vkui'
import Uploady from '@rpldy/uploady'
import { getMockSenderEnhancer } from '@rpldy/mock-sender'
import UploadDropZone from '@rpldy/upload-drop-zone'
import withPasteUpload from '@rpldy/upload-paste'
import UploadPreview from '@rpldy/upload-preview'
import { asUploadButton } from '@rpldy/upload-button'

import './loader.css'

const mockSenderEnhancer = getMockSenderEnhancer({})
const PasteUploadDropZone = withPasteUpload(UploadDropZone)

const UploadButton = asUploadButton(
  React.forwardRef(function сreateUploadButton(props) {
    return <Button {...props}>Загрузить</Button>
  })
)

function Loader(): JSX.Element {
  const filter = React.useCallback((file: File | string, index: number) => {
    if (typeof file === 'string') return false
    const type = file.type.replace(/\/.+/, '')
    return type === 'image' && index === 0
  }, [])

  return (
    <Uploady
      fileFilter={filter}
      multiple={false}
      debug
      enhancer={mockSenderEnhancer}
    >
      <div className="loaderPrewiew">
        <UploadPreview />
      </div>
      <PasteUploadDropZone
        className="pasteUploadDropZone"
        params={{ test: 'paste' }}
      />
      <UploadButton />
    </Uploady>
  )
}

export default React.memo(Loader)
