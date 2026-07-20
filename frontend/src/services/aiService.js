import api from './api'

export async function summarizeNote(content) {
  const response = await api.post('/ai/summarize', { content })
  return response.data.summary
}