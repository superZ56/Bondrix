// CalloutInsert.jsx — Menu de sélection de type d'encadré.
// Affiche 5 types de callouts (info, success, warning, danger, tip).
// Chaque bouton insère un callout avec l'icône correspondante.
// La couleur du callout vient du thème (gérée par CalloutNode.jsx).

import { insertCallout } from '../../utils/Insertion'
import { useTheme } from '../../../../context/ThemeContext'

const callouts = [
  { type: 'info',    icon: '💡', label: 'Info' },
  { type: 'success', icon: '✅', label: 'Success' },
  { type: 'warning', icon: '⚠️', label: 'Warning' },
  { type: 'danger',  icon: '🚨', label: 'Danger' },
  { type: 'tip',     icon: '💡', label: 'Tip' },
]

// Affiche la liste des types de callout à insérer.
// editor = instance TipTap, onClose = ferme le menu déroulant.
export default function CalloutInsert({ editor, onClose }) {
  const { colors } = useTheme()

  if (!editor) return null

  return (
    <div className="p-3">
      <p className="text-xs font-semibold text-gray-500 mb-2">Callout type</p>
      <div className="flex flex-col gap-1">
        {callouts.map((c) => (
          <button
            key={c.type}
            onClick={() => {
              insertCallout(editor, c.type, c.icon)
              onClose()
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer text-left"
          >
            <span className="text-base">{c.icon}</span>
            <span className="text-sm text-gray-700">{c.label}</span>
            <div
              className="ml-auto w-4 h-4 rounded border border-gray-200"
              style={{ backgroundColor: colors.third }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
