import UploadDropZone from '@rpldy/upload-drop-zone'
import { Icon56GalleryOutline } from '@vkontakte/icons'
import cx from 'classnames'
import React from 'react'
import { Div } from '@vkontakte/vkui'

import './DropPopup.css'

type LoaderPopupProps = {
  isDraging: boolean
  discardDrag: () => void
}

const LoaderPopup: React.FC<LoaderPopupProps> = ({
  isDraging,
  discardDrag,
}) => {
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
        DropPopup__disable: !isDraging,
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

export default React.memo(LoaderPopup)
