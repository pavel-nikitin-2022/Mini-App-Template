import { asUploadButton } from '@rpldy/upload-button'
import { Button } from '@vkontakte/vkui'
import React from 'react'

import './LoadButton.css'

let LoadButton = asUploadButton(
  React.forwardRef<HTMLButtonElement>(function сreateUploadButton(props, ref) {
    return (
      <Button {...props} className="UploadButton" getRootRef={ref}>
        Загрузить
      </Button>
    )
  })
)

LoadButton = React.memo(LoadButton)

export { LoadButton }
