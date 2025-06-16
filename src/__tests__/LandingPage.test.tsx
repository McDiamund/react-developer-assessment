// src/__tests__/LandingPage.test.tsx
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import LandingPage from '../pages/LandingPage'
import { UserContext } from '../contexts/user-context'
import { vi } from 'vitest'

const mockUsers = [
  {
    name: 'Ms. Alice Smith',
    address: {
      street: '123 Main St',
      suite: 'Apt 1',
      city: 'New York',
      zipcode: '10001',
    },
  },
]

describe('LandingPage', () => {
  it('calls fetchUsers and displays autocomplete options', async () => {
    const fetchUsersMock = vi.fn().mockResolvedValue(mockUsers)

    render(
      <UserContext.Provider value={{ fetchUsers: fetchUsersMock }}>
        <LandingPage />
      </UserContext.Provider>
    )

    // Wait for loading to finish
    await waitFor(() => {
      expect(fetchUsersMock).toHaveBeenCalled()
    })

    // Open autocomplete dropdown
    const input = screen.getByLabelText(/User/i)
    fireEvent.mouseDown(input)

    // Wait for all options to appear
    await waitFor(() => {
      expect(screen.getByText(/Smith, Alice \(Ms\.\)/)).toBeInTheDocument()
    })

    // Select "Alice Smith"
    fireEvent.click(screen.getByText(/Smith, Alice \(Ms\.\)/))

    // Check that card displays selected user info
    expect(screen.getByText(/123 Main St/)).toBeInTheDocument()
    expect(screen.getByText(/Apt 1/)).toBeInTheDocument()
    expect(screen.getByText(/New York/)).toBeInTheDocument()
    expect(screen.getByText(/10001/)).toBeInTheDocument()
  })
})
