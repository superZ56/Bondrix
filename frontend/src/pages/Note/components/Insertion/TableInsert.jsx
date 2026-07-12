// TableInsert.jsx — Grille de sélection de taille de tableau.
// Affiche une grille 5×5 pour choisir le nombre de lignes et colonnes.
// Chaque case représente une combinaison rows×cols visuellement.

import { insertTable } from '../../utils/Insertion'

// Affiche la grille interactive pour choisir la taille du tableau.
// editor = instance TipTap, onClose = ferme le menu après insertion.
export default function TableInsert({ editor, onClose }) {
  if (!editor) return null

  return (
    <div className="p-3">
      <p className="text-xs font-semibold text-gray-500 mb-2">Table size</p>
      <div className="grid grid-cols-5 gap-1">
        {Array.from({ length: 5 }, (_, row) =>
          Array.from({ length: 5 }, (_, col) => (
            <button
              key={`${row}-${col}`}
              onClick={() => {
                insertTable(editor, row + 1, col + 1)
                onClose()
              }}
              className="w-7 h-7 rounded border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer"
              title={`${row + 1} × ${col + 1}`}
            >
              <div className="grid gap-px p-0.5" style={{ gridTemplateColumns: `repeat(${col + 1}, 1fr)` }}>
                {Array.from({ length: (row + 1) * (col + 1) }, (_, i) => (
                  <div key={i} className="w-full h-1 bg-gray-400 rounded-sm" />
                ))}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
