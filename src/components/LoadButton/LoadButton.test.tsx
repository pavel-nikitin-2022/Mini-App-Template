import React from 'react'
import Uploady from '@rpldy/uploady'
import { render } from '@testing-library/react'
import { LoadButton } from './LoadButton'

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
