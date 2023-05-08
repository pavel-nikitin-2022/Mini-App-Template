import React from 'react'
import cx from 'classnames'
import UploadDropZone from '@rpldy/upload-drop-zone'
import { Placeholder } from '@vkontakte/vkui'
import { Icon56GalleryOutline } from '@vkontakte/icons'

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
      className={cx('DropPopup', {
        DropPopup_disable: !isDraging,
      })}
    >
      <UploadDropZone
        className="DropPopup__dropZone"
        onDragOverClassName="DropPopup__dropZone_select"
      >
        <svg className="DropPopup__border">
          <rect x="2" y="2" rx="20" />
        </svg>

        <Placeholder
          className="DropPopup__placeholder"
          icon={<Icon56GalleryOutline />}
        >
          Перетащите сюда свои файлы или закройте, проведя по экрану
        </Placeholder>
      </UploadDropZone>
    </div>
  )
}

DropPopup = React.memo(DropPopup)

export { DropPopup }
