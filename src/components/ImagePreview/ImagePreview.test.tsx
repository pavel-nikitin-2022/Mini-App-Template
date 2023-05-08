import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { ImagePreview, ImagePreviewProps } from './ImagePreview'
import Uploady from '@rpldy/uploady'
import { ProcessStatus } from 'src/types'

function setUp(props: Partial<ImagePreviewProps>) {
  return render(
    <Uploady>
      <ImagePreview
        abortConnection={() =>
          props.abortConnection ? props.abortConnection() : null
        }
        imageWidth={props.imageWidth ?? 1}
        status={props.status ?? ProcessStatus.Start}
        coordinates={props.coordinates ?? [1, 2, 3, 4]}
      />
    </Uploady>
  )
}

describe('ImagePreview', () => {
  it('Проверка интерфейса при status start', () => {
    const { asFragment } = setUp({ status: ProcessStatus.Start })
    expect(asFragment).toMatchSnapshot()
  })

  it('Проверка интерфейса при status pending', () => {
    const { asFragment } = setUp({ status: ProcessStatus.Pending })
    expect(asFragment).toMatchSnapshot()
  })

  it('Проверка интерфейса при status result', () => {
    const { asFragment } = setUp({ status: ProcessStatus.Result })
    expect(asFragment).toMatchSnapshot()
  })

  it('Проверка кнопки отмены при загрузке ответа', () => {
    const abortConnection = jest.fn()
    setUp({
      status: ProcessStatus.Pending,
      abortConnection: abortConnection,
    })
    const element = screen.getByRole('button')
    fireEvent.click(element)
    expect(abortConnection).toHaveBeenCalledTimes(1)
  })
})
