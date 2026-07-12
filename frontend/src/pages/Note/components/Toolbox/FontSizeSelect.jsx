// FontSizeSelect.jsx — Sélecteur de taille de texte.
// Dropdown avec 5 tailles prédéfinies : S(12px), M(16px), L(20px), XL(24px), 2XL(32px).

import { setFontSize } from '../../utils/TextEdit'

const sizes = [
  { label: 'S', value: '12px' },
  { label: 'M', value: '16px' },
  { label: 'L', value: '20px' },
  { label: 'XL', value: '24px' },
  { label: '2XL', value: '32px' },
]

// Affiche un dropdown avec les tailles de texte disponibles.
export default function FontSizeSelect({ editor }) {
  if (!editor) return null

  const currentSize = editor.getAttributes('textStyle').fontSize || ''

  return (
    <select
      value={currentSize}
      onChange={(e) => setFontSize(editor, e.target.value)}
      className="text-xs px-2 py-1 rounded border border-gray-300 bg-white cursor-pointer outline-none"
    >
      <option value="">Size</option>
      {sizes.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  )
}
