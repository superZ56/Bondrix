// UndoRedoButtons.jsx — Boutons annuler/rétablir.
// Deux boutons pour défaire ou refaire la dernière action.
// Grisés quand il n'y a rien à annuler/rétablir.

import { undo, redo } from '../../utils/TextEdit'
import { Undo2, Redo2 } from 'lucide-react'

// Affiche les boutons Annuler et Rétablir.
export default function UndoRedoButtons({ editor }) {
  if (!editor) return null

  return (
    <>
      <button
        onClick={() => undo(editor)}
        disabled={!editor.can().undo()}
        className="p-1.5 rounded text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        title="Undo (Ctrl+Z)"
      >
        <Undo2 size={16} />
      </button>
      <button
        onClick={() => redo(editor)}
        disabled={!editor.can().redo()}
        className="p-1.5 rounded text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        title="Redo (Ctrl+Y)"
      >
        <Redo2 size={16} />
      </button>
    </>
  )
}
