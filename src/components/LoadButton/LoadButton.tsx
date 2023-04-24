import { asUploadButton } from '@rpldy/upload-button'
import { Button } from '@vkontakte/vkui'
import React from 'react'

import './LoadButton.css'

const UploadButton = asUploadButton(
  React.forwardRef<HTMLDivElement>(function сreateUploadButton(props, ref) {
    return (
      <div ref={ref} {...props} className="UploadButton">
        <Button>Загрузить</Button>
      </div>
    )
  })
)

export default React.memo(UploadButton)
