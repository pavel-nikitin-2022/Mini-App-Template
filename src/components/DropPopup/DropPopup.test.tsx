import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { DropPopup } from './DropPopup'
import Uploady from '@rpldy/uploady'

function setUp(isDraging: boolean, discardDrag: () => null) {
  return render(
    <Uploady>
      <DropPopup isDraging={isDraging} discardDrag={discardDrag} />
    </Uploady>
  )
}

describe('DropPopup', () => {
  it('Тестирование события Drop', () => {
    const handleDrop = jest.fn()
    const { container } = setUp(false, handleDrop)
    fireEvent.drop(container.firstChild ?? container)
    expect(handleDrop).toHaveBeenCalledTimes(1)
  })

  it('Тестирование события DragLeave', () => {
    const handleDrop = jest.fn()
    const { container } = setUp(false, handleDrop)
    fireEvent.dragLeave(container.firstChild ?? container)
    expect(handleDrop).toHaveBeenCalledTimes(1)
  })

  it('Проверка класса на неактивном компоненте', () => {
    const { container } = setUp(false, () => null)
    expect(container.getElementsByClassName('DropPopup_disable').length).toBe(1)
  })

  it('Проверка класса на активном компоненте', () => {
    const { container } = setUp(true, () => null)
    expect(container.getElementsByClassName('DropPopup_disable').length).toBe(0)
  })
})
