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

// Provider pour la gestion des notes et de l'arborescence de dossiers.
export function NotesProvider({ children }) {
  const [directories, setDirectories] = useState(initialDirectories)
  const [selectedItem, setSelectedItem] = useState(null)

  // Ajoute un sous-dossier dans le dossier parent spécifié (ou à la racine si null).
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

  // Ajoute une note dans le dossier parent spécifié (ou à la racine si null).
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

  // Met à jour le contenu ou les propriétés d'une note existante dans l'arborescence.
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

// Hook personnalisé pour accéder au contexte des notes (directories, selectedItem, opérations CRUD).
export const useNotes = () => useContext(NotesContext)
