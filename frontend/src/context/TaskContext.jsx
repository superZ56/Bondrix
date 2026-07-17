import { createContext, useContext, useState, useEffect } from 'react'
import * as taskService from '../services/taskService'
import { useAuth } from './AuthContext'

const TaskContext = createContext()

export function TaskProvider({ children }) {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    if (!user) return
    const load = async () => {
      try {
        const data = await taskService.getTasks()
        setTasks(data.map((t) => ({
          id: t._id,
          title: t.title,
          date: t.date,
          done: t.status,
          importance: t.importance,
        })))
      } catch (err) {
        console.error('Erreur chargement tâches:', err)
      }
    }
    load()
  }, [user])

  const addTask = async (task) => {
    try {
      const created = await taskService.createTask({
        title: task.title,
        date: task.date,
        importance: task.importance || 'low',
      })
      setTasks((prev) => [...prev, {
        id: created._id,
        title: created.title,
        date: created.date,
        done: created.status,
        importance: created.importance,
      }])
    } catch (err) {
      console.error('Erreur création tâche:', err)
    }
  }

  const toggleTask = async (id) => {
    const task = tasks.find((t) => t.id === id)
    if (!task) return
    try {
      await taskService.updateTask(id, { status: !task.done })
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
    } catch (err) {
      console.error('Erreur toggle tâche:', err)
    }
  }

  const deleteTask = async (id) => {
    try {
      await taskService.deleteTask(id)
      setTasks((prev) => prev.filter((t) => t.id !== id))
    } catch (err) {
      console.error('Erreur suppression tâche:', err)
    }
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTasks = () => useContext(TaskContext)
