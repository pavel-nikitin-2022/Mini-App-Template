import React from 'react'
import { render } from '@testing-library/react'
import { LoadButton } from './LoadButton'
import Uploady from '@rpldy/uploady'

describe('LoadButton', () => {
  it('Проверка наличия верного пользовательского интерфейса', () => {
    const { getByText } = render(
      <Uploady>
        <LoadButton />
      </Uploady>
    )
    expect(getByText('Загрузить')).toBeInTheDocument()
  })
})
