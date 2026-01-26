// Simple authentication using localStorage (for demo purposes)
// In production, use proper backend authentication with database and NextAuth.js

export interface User {
  id: string
  email: string
  name: string
  phone: string
  createdAt: string
}

export interface AuthData {
  email: string
  password: string
  name?: string
  phone?: string
}

const USERS_KEY = 'electronicsHub_users'
const CURRENT_USER_KEY = 'electronicsHub_currentUser'

// Get all users from localStorage
const getUsers = (): Record<string, User & { password: string }> => {
  if (typeof window === 'undefined') return {}
  const users = localStorage.getItem(USERS_KEY)
  return users ? JSON.parse(users) : {}
}

// Save users to localStorage
const saveUsers = (users: Record<string, User & { password: string }>) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

// Hash password (simple for demo - in production use bcrypt on backend)
const hashPassword = (password: string): string => {
  return btoa(password) // Base64 encoding for demo only
}

// Verify password
const verifyPassword = (password: string, hashedPassword: string): boolean => {
  return btoa(password) === hashedPassword
}

// Register new user
export const register = (data: AuthData): { success: boolean; message: string; user?: User } => {
  try {
    const { email, password, name, phone } = data

    // Validate input
    if (!email || !password || !name || !phone) {
      return { success: false, message: 'All fields are required' }
    }

    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' }
    }

    if (!email.includes('@')) {
      return { success: false, message: 'Invalid email address' }
    }

    // Check if user already exists
    const users = getUsers()
    if (users[email]) {
      return { success: false, message: 'Email already registered' }
    }

    // Create new user
    const user: User = {
      id: Date.now().toString(),
      email,
      name,
      phone,
      createdAt: new Date().toISOString(),
    }

    users[email] = {
      ...user,
      password: hashPassword(password),
    }

    saveUsers(users)

    return {
      success: true,
      message: 'Account created successfully!',
      user,
    }
  } catch (error) {
    return { success: false, message: 'Registration failed. Please try again.' }
  }
}

// Login user
export const login = (email: string, password: string, remember: boolean = false): { success: boolean; message: string; user?: User } => {
  try {
    // Validate input
    if (!email || !password) {
      return { success: false, message: 'Email and password are required' }
    }

    // Get users
    const users = getUsers()
    const user = users[email]

    if (!user) {
      return { success: false, message: 'Invalid email or password' }
    }

    // Verify password
    if (!verifyPassword(password, user.password)) {
      return { success: false, message: 'Invalid email or password' }
    }

    // Set current user
    const { password: _, ...userWithoutPassword } = user
    
    if (remember) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword))
    } else {
      sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword))
    }

    return {
      success: true,
      message: 'Login successful!',
      user: userWithoutPassword,
    }
  } catch (error) {
    return { success: false, message: 'Login failed. Please try again.' }
  }
}

// Logout user
export const logout = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(CURRENT_USER_KEY)
  sessionStorage.removeItem(CURRENT_USER_KEY)
}

// Get current user
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null
  
  const localUser = localStorage.getItem(CURRENT_USER_KEY)
  const sessionUser = sessionStorage.getItem(CURRENT_USER_KEY)
  
  const userStr = localUser || sessionUser
  return userStr ? JSON.parse(userStr) : null
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null
}
