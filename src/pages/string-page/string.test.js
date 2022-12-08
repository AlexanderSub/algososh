/* eslint-disable testing-library/prefer-screen-queries */
import { fireEvent, render, waitFor, getByTestId } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom"
import { StringPage } from "./string-page"

describe('Тестирование алгоритма разворота строки', () => {
  it('Корректно разворачивает строку с чётным количеством символов', async () => {
    const { container } = render(
      <Router>
        <StringPage />
      </Router>
    )

    const button = getByTestId(container, 'button')
    const input = getByTestId(container, 'input')
    expect(input.textContent).toBe('')
    
    fireEvent.change(input, {target: {value: 'test'}})
    fireEvent.click(button)

    await waitFor(() => expect(getByTestId(container, 'output').textContent).toBe('tset'), {
      timeout: 1000 * 4
    })
  })

  it('Корректно разворачивает строку с нечётным количеством символов', async () => {
    const { container } = render(
      <Router>
        <StringPage />
      </Router>
    )

    const button = getByTestId(container, 'button')
    const input = getByTestId(container, 'input')
    expect(input.textContent).toBe('')
    
    fireEvent.change(input, {target: {value: 'value'}})
    fireEvent.click(button)

    await waitFor(() => expect(getByTestId(container, 'output').textContent).toBe('eulav'), {
      timeout: 1000 * 5
    })
  })

  it('Корректно разворачивает строку с одним символом', async () => {
    const { container } = render(
      <Router>
        <StringPage />
      </Router>
    )
    
    const button = getByTestId(container, 'button')
    const input = getByTestId(container, 'input')
    expect(input.textContent).toBe('')
    
    fireEvent.change(input, {target: {value: '1'}})
    fireEvent.click(button)

    await waitFor(() => expect(getByTestId(container, 'output').textContent).toBe('1'), {
      timeout: 1000 * 1
    })
  })

  it('Корректно разворачивает пустую строку', async () => {
    const { container } = render(
      <Router>
        <StringPage />
      </Router>
    )
    
    const button = getByTestId(container, 'button')
    const input = getByTestId(container, 'input')
    expect(input.textContent).toBe('')
    
    fireEvent.change(input, {target: {value: ''}})
    fireEvent.click(button)

    await waitFor(() => expect(getByTestId(container, 'output').textContent).toBe(''), {
      timeout: 1000 * 1
    })
  })
})