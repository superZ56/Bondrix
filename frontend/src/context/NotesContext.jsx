import { createContext, useContext, useState } from 'react'

const NotesContext = createContext()

const initialDirectories = [
  {
    id: '1',
    name: 'Project Ideas',
    type: 'directory',
    children: [
      { id: '1-1', name: 'Brainstorm', type: 'directory', children: [] },
      { id: '1-2', name: 'My first note', type: 'note', content: '' },
    ],
  },
  {
    id: '2',
    name: 'Meeting Notes',
    type: 'directory',
    children: [],
  },
]

let nextId = 10

export function NotesProvider({ children }) {
  const [directories, setDirectories] = useState(initialDirectories)
  const [selectedItem, setSelectedItem] = useState(null)

  const addSubdirectory = (parentId) => {
    const name = prompt('Directory name:')
    if (!name) return
    const newDir = { id: String(nextId++), name, type: 'directory', children: [] }
    if (parentId === null) {
      setDirectories([...directories, newDir])
      return
    }
    const addRecursive = (items) =>
      items.map((item) => {
        if (item.id === parentId) return { ...item, children: [...(item.children || []), newDir] }
        if (item.children) return { ...item, children: addRecursive(item.children) }
        return item
      })
    setDirectories(addRecursive(directories))
  }

  const addNote = (parentId) => {
    const name = prompt('Note name:')
    if (!name) return
    const newNote = { id: String(nextId++), name, type: 'note', content: '' }
    if (parentId === null) {
      setDirectories([...directories, newNote])
      return
    }
    const addRecursive = (items) =>
      items.map((item) => {
        if (item.id === parentId) return { ...item, children: [...(item.children || []), newNote] }
        if (item.children) return { ...item, children: addRecursive(item.children) }
        return item
      })
    setDirectories(addRecursive(directories))
  }

  const updateNote = (updatedNote) => {
    const updateRecursive = (items) =>
      items.map((item) => {
        if (item.id === updatedNote.id) return updatedNote
        if (item.children) return { ...item, children: updateRecursive(item.children) }
        return item
      })
    setDirectories(updateRecursive(directories))
  }

  return (
    <NotesContext.Provider value={{ directories, selectedItem, setSelectedItem, addSubdirectory, addNote, updateNote }}>
      {children}
    </NotesContext.Provider>
  )
}

export const useNotes = () => useContext(NotesContext)
