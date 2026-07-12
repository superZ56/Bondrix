// HighlightPicker.jsx — Sélecteur de surlignage coloré.
// Bouton qui ouvre un panneau avec 8 couleurs de surlignage.
// "None" retire le surlignage existant.

import { setHighlight, unsetHighlight } from '../../utils/TextEdit'
import { Highlighter } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const highlights = [
  { label: 'Yellow', color: '#FEF9C3' },
  { label: 'Green', color: '#D1FAE5' },
  { label: 'Blue', color: '#DBEAFE' },
  { label: 'Pink', color: '#FCE7F3' },
  { label: 'Orange', color: '#FFEDD5' },
  { label: 'Purple', color: '#F3E8FF' },
  { label: 'Red', color: '#FEE2E2' },
  { label: 'None', color: null },
]

// Affiche le bouton de surlignage + panneau de couleurs.
export default function HighlightPicker({ editor }) {
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

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-200 transition-colors cursor-pointer ${
          editor.isActive('highlight') ? 'bg-gray-200' : ''
        }`}
        title="Highlight"
      >
        <Highlighter size={16} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2 grid grid-cols-4 gap-1 z-50">
          {highlights.map((h) => (
            <button
              key={h.label}
              onClick={() => {
                if (h.color) {
                  setHighlight(editor, h.color)
                } else {
                  unsetHighlight(editor)
                }
                setOpen(false)
              }}
              className="w-6 h-6 rounded cursor-pointer border border-gray-200 hover:scale-110 transition-transform"
              style={{ backgroundColor: h.color || '#ffffff' }}
              title={h.label}
            />
          ))}
        </div>
      )}
    </div>
  )
}
