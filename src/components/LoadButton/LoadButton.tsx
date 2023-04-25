import { asUploadButton } from '@rpldy/upload-button'
import { Button } from '@vkontakte/vkui'
import React from 'react'

import './LoadButton.css'

let LoadButton = asUploadButton(
  React.forwardRef<HTMLDivElement>(function сreateUploadButton(props, ref) {
    return (
      <div ref={ref} {...props} className="UploadButton">
        <Button>Загрузить</Button>
      </div>
    )
  })
)

LoadButton = React.memo(LoadButton)

export { LoadButton }
