import api from './api'

export const register = async (username, email, password) => {
  const { data } = await api.post('/auth/register', { username, email, password })
  return data
}

export const login = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password })
  return data
}

export const googleLogin = async (credential) => {
  const { data } = await api.post('/auth/google', { credential })
  return data
}

export const getMe = async () => {
  const { data } = await api.get('/auth/me')
  return data
}

export const logout = async () => {
  await api.post('/auth/logout')
}
