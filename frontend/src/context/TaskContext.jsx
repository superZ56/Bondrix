import { createContext, useContext, useState } from 'react'

const TaskContext = createContext()

// Provider pour la gestion des tâches quotidiennes (ajout, suppression, cochage).
export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])

  // Ajoute une nouvelle tâche avec un ID unique et l'état coché par défaut.
  const addTask = (task) => {
    setTasks((prev) => [...prev, { ...task, id: crypto.randomUUID(), done: false }])
  }

  // Inverse l'état coché/décoché d'une tâche identifiée par son ID.
  const toggleTask = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  // Supprime une tâche de la liste par son ID.
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}

// Hook personnalisé pour accéder au contexte des tâches (tasks, addTask, toggleTask, deleteTask).
export const useTasks = () => useContext(TaskContext)
