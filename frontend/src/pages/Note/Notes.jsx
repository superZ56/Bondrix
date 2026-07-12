// Notes.jsx — Page principale de la section Notes.
// Affiche l'éditeur de notes. Récupère la note sélectionnée
// depuis le contexte NotesContext et la passe à NoteEditor.

import { useNotes } from '../../context/NotesContext'
import NoteEditor from './components/NoteEditor'

export default function Notes() {
  const { selectedItem, updateNote } = useNotes()

  return (
    <NoteEditor
      note={selectedItem?.type === 'note' ? selectedItem : null}
      onUpdate={updateNote}
    />
  )
}
