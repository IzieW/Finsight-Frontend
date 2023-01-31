import { React } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router'

import AllowanceSetUp from '../components/AllowanceSetUp'

describe('Initial allowance set up', () => {
  test('renders pop up if user allowance is null', async () => {
    const container = render(
      <Router>
        <AllowanceSetUp user={{ allowance: null }} />
      </Router>
    ).container

    screen.getByText('Set your daily budget')

    container.querySelector('.guide')
    container.querySelector('.allowanceSetUp')
  })

  test('renders nothing if user allowance is set or user does not exist', async () => {})
})
