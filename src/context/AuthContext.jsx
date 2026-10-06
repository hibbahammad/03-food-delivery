import { createContext, useContext, useEffect, useState } from 'react'
import { readStorage, removeStorage, writeStorage } from '../utils/formatters'

const AuthContext = createContext(null)

const AUTH_STORAGE_KEY = 'food-delivery-auth-user-v1'
const USERS_STORAGE_KEY = 'food-delivery-users-v1'

const demoUsers = [
  {
    id: 'demo-user-1',
    name: 'Demo User',
    email: 'demo@foodie.com',
    password: 'demo123',
    savedAddresses: [
      { id: 'home-address', label: 'Home', line: '21 Maple Street', city: 'Downtown', zip: '10001' },
    ],
  },
]

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => readStorage(AUTH_STORAGE_KEY, null))
  const [users, setUsers] = useState(() => readStorage(USERS_STORAGE_KEY, demoUsers))

  useEffect(() => {
    if (user) {
      writeStorage(AUTH_STORAGE_KEY, user)
    } else {
      removeStorage(AUTH_STORAGE_KEY)
    }
  }, [user])

  useEffect(() => {
    writeStorage(USERS_STORAGE_KEY, users)
  }, [users])

  const login = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase()
    const foundUser = users.find(
      (entry) =>
        entry.email.trim().toLowerCase() === normalizedEmail &&
        entry.password === password,
    )

    if (!foundUser) {
      return { success: false, message: 'Invalid email or password.' }
    }

    setUser({
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      savedAddresses: foundUser.savedAddresses || [],
    })

    return { success: true }
  }

  const register = ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase()
    const exists = users.some(
      (entry) => entry.email.trim().toLowerCase() === normalizedEmail,
    )

    if (exists) {
      return { success: false, message: 'An account with this email already exists.' }
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      password,
      savedAddresses: [
        {
          id: 'new-home',
          label: 'Home',
          line: '45 Harbor Lane',
          city: 'Downtown',
          zip: '10005',
        },
      ],
    }

    setUsers((currentUsers) => [newUser, ...currentUsers])
    setUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      savedAddresses: newUser.savedAddresses,
    })

    return { success: true }
  }

  const logout = () => setUser(null)

  const updateProfile = (updates) => {
    setUser((currentUser) => {
      const nextUser = { ...(currentUser || {}), ...updates }
      setUsers((currentUsers) =>
        currentUsers.map((entry) =>
          entry.id === currentUser?.id ? { ...entry, ...updates } : entry,
        ),
      )
      return nextUser
    })
  }

  const addAddress = (address) => {
    setUser((currentUser) => {
      const nextAddresses = [...(currentUser?.savedAddresses || []), address]
      setUsers((currentUsers) =>
        currentUsers.map((entry) =>
          entry.id === currentUser?.id
            ? { ...entry, savedAddresses: nextAddresses }
            : entry,
        ),
      )
      return { ...(currentUser || {}), savedAddresses: nextAddresses }
    })
  }

  const value = {
    user,
    isLoggedIn: Boolean(user),
    login,
    register,
    logout,
    updateProfile,
    addAddress,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
