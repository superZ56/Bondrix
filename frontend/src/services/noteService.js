import api from './api'

export const getNotes = async () => {
  const { data } = await api.get('/notes')
  return data
}

export const createNote = async ({ type, title, content, parentId }) => {
  const { data } = await api.post('/notes', { type, title, content, parentId })
  return data
}

export const updateNote = async (id, updates) => {
  const { data } = await api.put(`/notes/${id}`, updates)
  return data
}

export const deleteNote = async (id) => {
  const { data } = await api.delete(`/notes/${id}`)
  return data
}
