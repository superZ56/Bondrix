// TextColorPicker.jsx — Sélecteur de couleur de texte.
// Bouton qui ouvre un panneau avec 16 couleurs prédéfinies.
// Affiche la couleur actuelle sous le bouton.

import { setTextColor } from '../../utils/TextEdit'
import { Palette } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const colors = [
  '#000000', '#434343', '#666666', '#999999',
  '#B72136', '#D93025', '#E37400', '#F4B400',
  '#188038', '#1A73E8', '#A142F4', '#FA903E',
  '#16A766', '#1967D2', '#8430CE', '#E8710A',
]

// Affiche le bouton de couleur + panneau de couleurs.
export default function TextColorPicker({ editor }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Ferme le panneau quand on clique à l'extérieur.
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!editor) return null

  const currentColor = editor.getAttributes('textStyle').color || '#000000'

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-200 transition-colors cursor-pointer"
        title="Text color"
      >
        <Palette size={16} />
        <div
          className="w-4 h-1 rounded-full"
          style={{ backgroundColor: currentColor }}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2 grid grid-cols-4 gap-1 z-50">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => {
                setTextColor(editor, color)
                setOpen(false)
              }}
              className="w-6 h-6 rounded cursor-pointer border border-gray-200 hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
