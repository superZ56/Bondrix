// TableToolbar.jsx — Barre d'outils flottante pour les tableaux.
// S'affiche automatiquement quand le curseur est dans un tableau.
// Permet d'ajouter/supprimer des lignes, colonnes, ou supprimer le tableau.
// Utilise les couleurs du thème actif.

import { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { useTheme } from '../../../../context/ThemeContext'
import {
  addRowAfter,
  addColumnAfter,
  deleteRow,
  deleteColumn,
  deleteTable,
} from '../../utils/Insertion'

// Affiche la barre d'outils tableau si le curseur est dedans.
// editor = instance TipTap.
export default function TableToolbar({ editor }) {
  const { colors } = useTheme()
  const [visible, setVisible] = useState(false)

  // Écoute les changements de sélection pour afficher/masquer la barre.
  useEffect(() => {
    if (!editor) return

    // Vérifie si le curseur est dans un tableau pour afficher ou masquer la barre d'outils.
    const checkTable = () => {
      setVisible(editor.isActive('table'))
    }

    editor.on('selectionUpdate', checkTable)
    editor.on('transaction', checkTable)

    return () => {
      editor.off('selectionUpdate', checkTable)
      editor.off('transaction', checkTable)
    }
  }, [editor])

  if (!editor || !visible) return null

  return (
    <div
      className="flex items-center gap-1 px-3 py-1.5 rounded-lg shadow-lg"
      style={{ backgroundColor: colors.secondary }}
    >
      <button
        onClick={() => addRowAfter(editor)}
        className="flex items-center gap-1 px-2 py-1 text-xs rounded transition-colors cursor-pointer"
        style={{ color: '#e5e7eb' }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.primary + '60' }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
        title="Ajouter une ligne en dessous"
      >
        <Plus size={14} />
        <span>Row</span>
      </button>

      <button
        onClick={() => addColumnAfter(editor)}
        className="flex items-center gap-1 px-2 py-1 text-xs rounded transition-colors cursor-pointer"
        style={{ color: '#e5e7eb' }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.primary + '60' }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
        title="Ajouter une colonne à droite"
      >
        <Plus size={14} />
        <span>Col</span>
      </button>

      <div className="w-px h-4 mx-1" style={{ backgroundColor: colors.primary + '40' }} />

      <button
        onClick={() => deleteRow(editor)}
        className="flex items-center gap-1 px-2 py-1 text-xs rounded transition-colors cursor-pointer"
        style={{ color: '#fca5a5' }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.primary + '60' }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
        title="Supprimer la ligne actuelle"
      >
        <Trash2 size={14} />
        <span>Row</span>
      </button>

      <button
        onClick={() => deleteColumn(editor)}
        className="flex items-center gap-1 px-2 py-1 text-xs rounded transition-colors cursor-pointer"
        style={{ color: '#fca5a5' }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.primary + '60' }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
        title="Supprimer la colonne actuelle"
      >
        <Trash2 size={14} />
        <span>Col</span>
      </button>

      <div className="w-px h-4 mx-1" style={{ backgroundColor: colors.primary + '40' }} />

      <button
        onClick={() => deleteTable(editor)}
        className="flex items-center gap-1 px-2 py-1 text-xs rounded transition-colors cursor-pointer"
        style={{ color: '#f87171' }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.primary + '60' }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
        title="Supprimer tout le tableau"
      >
        <Trash2 size={14} />
        <span>Table</span>
      </button>
    </div>
  )
}
