import { createContext, useContext, useState, useEffect } from 'react'
import * as calendarService from '../services/calendarService'
import { useAuth } from './AuthContext'

const EventContext = createContext()

export function EventProvider({ children }) {
  const { user } = useAuth()
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (!user) return
    const load = async () => {
      try {
        const data = await calendarService.getEvents()
        setEvents(data.map((e) => ({
          id: e._id,
          title: e.title,
          start: `${e.date.split('T')[0]}T${e.startTime}`,
          end: `${e.date.split('T')[0]}T${e.endTime}`,
          backgroundColor: e.color,
        })))
      } catch (err) {
        console.error('Erreur chargement événements:', err)
      }
    }
    load()
  }, [user])

  const addEvent = async (event) => {
    try {
      const date = event.start.split('T')[0]
      const startTime = event.start.split('T')[1].slice(0, 5)
      const endTime = event.end.split('T')[1].slice(0, 5)
      const created = await calendarService.createEvent({
        title: event.title,
        date,
        startTime,
        endTime,
        color: event.backgroundColor || '#3B82F6',
      })
      setEvents((prev) => [...prev, {
        id: created._id,
        title: created.title,
        start: `${date}T${created.startTime}`,
        end: `${date}T${created.endTime}`,
        backgroundColor: created.color,
      }])
    } catch (err) {
      console.error('Erreur création événement:', err)
    }
  }

  const updateEvent = async (id, updates) => {
    try {
      const payload = {}
      if (updates.start) {
        payload.date = updates.start.split('T')[0]
        payload.startTime = updates.start.split('T')[1].slice(0, 5)
      }
      if (updates.end) {
        payload.endTime = updates.end.split('T')[1].slice(0, 5)
      }
      if (updates.backgroundColor) {
        payload.color = updates.backgroundColor
      }
      if (updates.title) {
        payload.title = updates.title
      }
      await calendarService.updateEvent(id, payload)
      setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)))
    } catch (err) {
      console.error('Erreur mise à jour événement:', err)
    }
  }

  const deleteEvent = async (id) => {
    try {
      await calendarService.deleteEvent(id)
      setEvents((prev) => prev.filter((e) => e.id !== id))
    } catch (err) {
      console.error('Erreur suppression événement:', err)
    }
  }

  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  )
}

export const useEvents = () => useContext(EventContext)
