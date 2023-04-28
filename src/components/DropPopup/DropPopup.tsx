import UploadDropZone from '@rpldy/upload-drop-zone'
import { Icon56GalleryOutline } from '@vkontakte/icons'
import cx from 'classnames'
import React from 'react'
import { Div } from '@vkontakte/vkui'

import './DropPopup.css'

export type DropPopupProps = {
  isDraging: boolean
  discardDrag: () => void
}

let DropPopup: React.FC<DropPopupProps> = ({ isDraging, discardDrag }) => {
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={(e) => !e.relatedTarget && discardDrag()}
      onDrop={(e) => {
        e.preventDefault()
        discardDrag()
      }}
      className={cx({
        DropPopup: isDraging,
        DropPopup_disable: !isDraging,
      })}
    >
      <UploadDropZone
        className="DropPopup__dropZone"
        onDragOverClassName="DropPopup__dropZone_select"
      >
        <Icon56GalleryOutline className="DropPopup__icon" />
        <Div className="DropPopup__text">
          Перетащите сюда свои файлы или закройте, проведя по экрану
        </Div>
      </UploadDropZone>
    </div>
  )
}

DropPopup = React.memo(DropPopup)

export { DropPopup }
