import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuthentication()
  }, [])

  const checkAuthentication = () => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true'
      const loginTime = localStorage.getItem('adminLoginTime')
      
      // Check if login is still valid (24 hours)
      const isLoginValid = loginTime && (Date.now() - parseInt(loginTime)) < 24 * 60 * 60 * 1000
      
      if (isLoggedIn && isLoginValid) {
        setIsAuthenticated(true)
      } else {
        // Clear invalid login data
        localStorage.removeItem('adminLoggedIn')
        localStorage.removeItem('adminLoginTime')
        setIsAuthenticated(false)
      }
    }
    setIsLoading(false)
  }

  const login = (username, password) => {
    if (username === 'kevin123' && password === 'Kevin@1234') {
      localStorage.setItem('adminLoggedIn', 'true')
      localStorage.setItem('adminLoginTime', Date.now().toString())
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('adminLoggedIn')
    localStorage.removeItem('adminLoginTime')
    setIsAuthenticated(false)
  }

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuthentication
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
