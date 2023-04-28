import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { RestartButton } from './RestartButton'

describe('RestartButton', () => {
  it('Проверка наличия обработчика нажатия на кнопку', () => {
    const handleClick = jest.fn()
    const { container } = render(
      <RestartButton onRestart={() => handleClick()} />
    )
    const button = container.firstChild
    if (button) fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
