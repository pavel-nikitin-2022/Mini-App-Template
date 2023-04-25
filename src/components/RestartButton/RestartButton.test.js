import React from 'react'
import { RestartButton } from './RestartButton'
import { shallow } from 'enzyme'

const setUp = (props) => shallow(<RestartButton {...props} />)

describe('RestartButton', () => {
  it('Компонент должен содержать класс RestartButton', () => {
    const component = setUp({ onRestart: () => null })
    const wrapper = component.find('.RestartButton')
    expect(wrapper.length).toBe(1)
  })

  it('Соответствие снимку', () => {
    const component = setUp({ onRestart: () => null })
    expect(component).toMatchSnapshot()
  })
})
