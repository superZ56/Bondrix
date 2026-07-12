// HeadingSelect.jsx — Sélecteur de titre (P, H1, H2, H3).
// Affiche 4 boutons pour passer entre paragraphe et titres.
// Le bouton actif est mis en surbrillance.

import { setHeading, setParagraph } from '../../utils/TextEdit'

const levels = [
  { label: 'P', value: 0, title: 'Paragraph' },
  { label: 'H1', value: 1, title: 'Heading 1' },
  { label: 'H2', value: 2, title: 'Heading 2' },
  { label: 'H3', value: 3, title: 'Heading 3' },
]

// Affiche les boutons P/H1/H2/H3 pour changer le niveau de titre.
export default function HeadingSelect({ editor }) {
  if (!editor) return null

  return (
    <div className="flex gap-0.5">
      {levels.map((level) => {
        const isActive = level.value === 0
          ? !editor.isActive('heading')
          : editor.isActive('heading', { level: level.value })

        return (
          <button
            key={level.value}
            onClick={() => {
              if (level.value === 0) {
                setParagraph(editor)
              } else {
                setHeading(editor, level.value)
              }
            }}
            className={`px-2 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
              isActive ? 'bg-gray-300 text-gray-900' : 'text-gray-600 hover:bg-gray-200'
            }`}
            title={level.title}
          >
            {level.label}
          </button>
        )
      })}
    </div>
  )
}
