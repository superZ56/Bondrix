import api from './api'

export const getTasks = async () => {
  const { data } = await api.get('/tasks')
  return data
}

export const createTask = async ({ title, date, importance }) => {
  const { data } = await api.post('/tasks', { title, date, importance })
  return data
}

export const updateTask = async (id, updates) => {
  const { data } = await api.put(`/tasks/${id}`, updates)
  return data
}

export const deleteTask = async (id) => {
  const { data } = await api.delete(`/tasks/${id}`)
  return data
}
