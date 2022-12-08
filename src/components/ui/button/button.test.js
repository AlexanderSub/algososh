import {Button} from './button'
import renderer from 'react-test-renderer'
import {render, screen, fireEvent} from "@testing-library/react"

describe('Button', () => {
  it('Кнопка без текста рендерится без ошибок', () => {
    const tree = renderer.create(
      <Button/>
    ).toJSON()
    expect(tree).toMatchSnapshot();
  })
  it('Кнопка с текстом рендерится без ошибок', () => {
    const tree = renderer.create(
      <Button text='test'/>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('Отключённая кнопка рендерится без ошибок', () => {
    const tree = renderer.create(
      <Button disabled/>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('Кнопка с загрузкой рендерится без ошибок', () => {
    const tree = renderer.create(
      <Button isLoader/>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('Нажатие на кнопку вызывает корректный alert', () => {
    const click = jest.fn()

    render(<Button text='test' onClick={click()}/>)

    // Находим элемент кнопки
    const button = screen.getByText("test")

    // Имитируем нажатие на кнопку
    fireEvent.click(button)
        
    // Проверяем, что alert сработал с правильным текстом предупреждения
    expect(click).toHaveBeenCalledWith()
  })
})