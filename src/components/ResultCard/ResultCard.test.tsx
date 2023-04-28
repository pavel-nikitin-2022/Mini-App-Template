import React from 'react'
import { render, screen } from '@testing-library/react'
import { ResultCard } from './ResultCard'
import { ServerAnswer } from '../../types'

const intServerAnswer: ServerAnswer = {
  animal: 'Кошка',
  probability: 50,
  coordinates: [1, 2, 3, 4],
}

const floatServerAnswer: ServerAnswer = {
  animal: 'Кошка',
  probability: 12.223,
  coordinates: [1, 2, 3, 4],
}

describe('ResultCard', () => {
  it('Проверка интерфейса, при корректном ответе сервера с целочисленным значением', () => {
    render(<ResultCard answer={intServerAnswer} />)
    const title = screen.getByText(/.* на [0-9]?[0-9]%/)
    const subtitle = screen.getByText('Алгоритм уверен, что это')
    expect(title).toBeInTheDocument()
    expect(subtitle).toBeInTheDocument()
  })

  it('Проверка интерфейса, при корректном ответе сервера с дробным значением', () => {
    render(<ResultCard answer={floatServerAnswer} />)
    const title = screen.getByText(/.* на [0-9]?[0-9]%/)
    const subtitle = screen.getByText('Алгоритм уверен, что это')
    expect(title).toBeInTheDocument()
    expect(subtitle).toBeInTheDocument()
  })

  it('Проверка интерфейса, когда сервер не определил животное', () => {
    render(<ResultCard answer={null} />)
    const title = screen.getByText('Неизвестный индивид')
    const subtitle = screen.getByText('Алгоритм уверен, что это')
    expect(title).toBeInTheDocument()
    expect(subtitle).toBeInTheDocument()
  })
})
