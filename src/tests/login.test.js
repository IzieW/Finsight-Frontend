import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Login from '../components/Login'

describe('sign up form', () => {
  test('renders correct header', async () => {
    render(
      <Router>
        <Login />
      </Router>
    )

    const header = screen.getByText('Sign in')
    expect(header.tagName).toBe('H2')
  })

  test('when given valid inputs form updates parent state and calls submit', async () => {
    const mockHandler = jest.fn()
    const user = userEvent.setup()

    render(
      <Router>
        <Login handleLogin={mockHandler} />
      </Router>
    )

    const usernameInput = screen.getByPlaceholderText('username')
    const passwordInput = screen.getByPlaceholderText('password')
    const loginButton = screen.getByText('login', { selector: 'button' })

    await user.type(usernameInput, 'test Username')
    await user.type(passwordInput, 'test Password')

    await user.click(loginButton)

    const mockCalls = mockHandler.mock.calls[0]

    expect(mockCalls).toHaveLength(2)
    expect(Object.values(mockCalls)).toEqual([
      'test Username',
      'test Password',
    ])
  })

  test('Username and password are required', async () => {
    render(
      <Router>
        <Login />
      </Router>
    )

    const usernameInput = screen.getByPlaceholderText('username')
    const passwordInput = screen.getByPlaceholderText('password')

    expect(usernameInput).toBeRequired()
    expect(passwordInput).toBeRequired()
  })
})

describe('sign up option', () => {
  test('renders link to sign up', async () => {
    render(
      <Router>
        <Login />
      </Router>
    )

    screen.getByText('Don\'t have an account?')

    const signupLink = screen.getByText('Sign up')

    expect(signupLink).toHaveAttribute('href', '/signup')
  })
})
