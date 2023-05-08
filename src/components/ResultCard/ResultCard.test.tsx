import React from 'react'
import { render, screen } from '@testing-library/react'
import { ResultCard } from './ResultCard'
import { FetchMLAnswerResponse } from 'src/types'

const emptyServerAnswer: FetchMLAnswerResponse = {
  status: true,
  data: null,
}

const unEmptyServerAnswer: FetchMLAnswerResponse = {
  status: true,
  data: {
    animal: 'Кошка',
    probability: 0.223,
    coordinates: [1, 2, 3, 4],
  },
}

const errorServerAnswer: FetchMLAnswerResponse = {
  status: false,
  error: 'error'
}

describe('ResultCard', () => {
  it('Проверка интерфейса, при корректном ответе сервера с целочисленным значением', () => {
    render(<ResultCard answer={emptyServerAnswer} />)
    const title = screen.getByText('Не кошечка, не собачка')
    const subtitle = screen.getByText('Алгоритм уверен, что это')
    expect(title).toBeInTheDocument()
    expect(subtitle).toBeInTheDocument()
  })

  it('Проверка интерфейса, при корректном ответе сервера с дробным значением', () => {
    render(<ResultCard answer={unEmptyServerAnswer} />)
    const title = screen.getByText(/.*, на [0-9]?[0-9]%/)
    const subtitle = screen.getByText('Алгоритм уверен, что это')
    expect(title).toBeInTheDocument()
    expect(subtitle).toBeInTheDocument()
  })

  it('Проверка интерфейса, когда сервер не определил животное', () => {
    render(<ResultCard answer={errorServerAnswer} />)
    const subtitle = screen.getByText('Произошла ошибка')
    expect(subtitle).toBeInTheDocument()
  })
})
