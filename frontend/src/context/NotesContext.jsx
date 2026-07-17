import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import * as noteService from '../services/noteService'
import { useAuth } from './AuthContext'

const NotesContext = createContext()

function buildTree(flatNotes, parentId = null) {
  return flatNotes
    .filter((n) => String(n.parentId) === String(parentId))
    .map((n) => ({
      id: n._id,
      name: n.title,
      type: n.type === 'folder' ? 'directory' : 'note',
      content: n.content || '',
      children: buildTree(flatNotes, n._id),
    }))
}

export function NotesProvider({ children }) {
  const { user } = useAuth()
  const [directories, setDirectories] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [flatNotes, setFlatNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const dirtyRef = useRef({})

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }
    const load = async () => {
      try {
        const notes = await noteService.getNotes()
        setFlatNotes(notes)
        setDirectories(buildTree(notes))
      } catch (err) {
        console.error('Erreur chargement notes:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [user])

  const refreshTree = useCallback((newFlat) => {
    setFlatNotes(newFlat)
    setDirectories(buildTree(newFlat))
  }, [])

  const addSubdirectory = async (parentId) => {
    const name = prompt('Directory name:')
    if (!name) return
    try {
      const created = await noteService.createNote({
        type: 'folder',
        title: name,
        content: null,
        parentId: parentId || null,
      })
      refreshTree([...flatNotes, created])
    } catch (err) {
      console.error('Erreur création dossier:', err)
    }
  }

  const addNote = async (parentId) => {
    const name = prompt('Note name:')
    if (!name) return
    try {
      const created = await noteService.createNote({
        type: 'note',
        title: name,
        content: '',
        parentId: parentId || null,
      })
      refreshTree([...flatNotes, created])
    } catch (err) {
      console.error('Erreur création note:', err)
    }
  }

  const updateNote = useCallback((updatedNote) => {
    dirtyRef.current[updatedNote.id] = updatedNote
  }, [])

  const flushDirty = useCallback(async () => {
    const ids = Object.keys(dirtyRef.current)
    if (ids.length === 0) return
    const promises = ids.map((id) => {
      const note = dirtyRef.current[id]
      return noteService.updateNote(id, { title: note.name, content: note.content })
    })
    try {
      await Promise.all(promises)
      const newFlat = flatNotes.map((n) => {
        const dirty = dirtyRef.current[n._id]
        if (dirty) return { ...n, title: dirty.name, content: dirty.content }
        return n
      })
      setFlatNotes(newFlat)
      dirtyRef.current = {}
    } catch (err) {
      console.error('Erreur sauvegarde notes:', err)
    }
  }, [flatNotes])

  const saveAndFlush = useCallback(async () => {
    const ids = Object.keys(dirtyRef.current)
    if (ids.length === 0) return
    const toSave = Object.values(dirtyRef.current)
    dirtyRef.current = {}
    try {
      await Promise.all(
        toSave.map((note) =>
          noteService.updateNote(note.id, { title: note.name, content: note.content })
        )
      )
    } catch (err) {
      console.error('Erreur sauvegarde notes:', err)
    }
  }, [])

  useEffect(() => {
    const handleBeforeUnload = () => {
      const ids = Object.keys(dirtyRef.current)
      if (ids.length === 0) return
      const toSave = Object.values(dirtyRef.current)
      for (const note of toSave) {
        fetch(`http://localhost:3000/api/notes/${note.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          keepalive: true,
          body: JSON.stringify({ title: note.name, content: note.content }),
        })
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  const deleteItem = async (id) => {
    try {
      await noteService.deleteNote(id)
      const newFlat = flatNotes.filter((n) => n._id !== id && String(n.parentId) !== id)
      refreshTree(newFlat)
      if (selectedItem?.id === id) setSelectedItem(null)
    } catch (err) {
      console.error('Erreur suppression:', err)
    }
  }

  return (
    <NotesContext.Provider value={{
      directories, selectedItem, setSelectedItem, loading,
      addSubdirectory, addNote, updateNote, deleteItem,
      flushDirty, saveAndFlush,
    }}>
      {children}
    </NotesContext.Provider>
  )
}

export const useNotes = () => useContext(NotesContext)
