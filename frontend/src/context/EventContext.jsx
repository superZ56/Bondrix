import { createContext, useContext, useState } from 'react'

const EventContext = createContext()

// Provider pour la gestion des événements du calendrier (ajout, mise à jour, suppression).
export function EventProvider({ children }) {
  const [events, setEvents] = useState([])

  // Ajoute un nouvel événement avec un ID généré automatiquement.
  const addEvent = (event) => {
    setEvents((prev) => [...prev, { ...event, id: crypto.randomUUID() }])
  }

  // Met à jour les champs d'un événement existant par son ID.
  const updateEvent = (id, updates) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)))
  }

  // Supprime un événement de la liste par son ID.
  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }

  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  )
}

// Hook personnalisé pour accéder au contexte des événements (events, addEvent, updateEvent, deleteEvent).
export const useEvents = () => useContext(EventContext)
