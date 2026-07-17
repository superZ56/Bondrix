import api from './api'

export const getEvents = async () => {
  const { data } = await api.get('/calendar')
  return data
}

export const createEvent = async ({ title, date, startTime, endTime, color }) => {
  const { data } = await api.post('/calendar', { title, date, startTime, endTime, color })
  return data
}

export const updateEvent = async (id, updates) => {
  const { data } = await api.put(`/calendar/${id}`, updates)
  return data
}

export const deleteEvent = async (id) => {
  const { data } = await api.delete(`/calendar/${id}`)
  return data
}
