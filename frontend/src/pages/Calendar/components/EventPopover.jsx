import { useEffect, useRef } from 'react'
import { Trash2, Pencil } from 'lucide-react'
import { useTheme } from '../../../context/ThemeContext'

// Popover avec boutons modifier et supprimer, affiché au-dessus d'un événement au clic.
export default function EventPopover({ anchorEl, onEdit, onDelete, onClose }) {
  const { colors } = useTheme()
  const ref = useRef(null)

  // Ferme le popover si l'utilisateur clique en dehors de celui-ci ou de l'élément anchor.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target) && !anchorEl?.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [anchorEl, onClose])

  const rect = anchorEl?.getBoundingClientRect()

  if (!rect) return null

  const popoverStyle = {
    position: 'fixed',
    top: rect.top - 48,
    left: rect.left + rect.width / 2,
    transform: 'translateX(-50%)',
    zIndex: 100,
  }

  return (
    <div ref={ref} style={popoverStyle}>
      <div
        className="flex items-center gap-1 px-2 py-1.5 rounded-lg shadow-lg"
        style={{ backgroundColor: colors.third, border: `1px solid ${colors.primary}20` }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation()
            onEdit()
          }}
          className="p-1.5 rounded-md cursor-pointer transition-all hover:opacity-80"
          style={{ color: colors.primary, backgroundColor: `${colors.primary}15` }}
          title="Modifier"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="p-1.5 rounded-md cursor-pointer transition-all hover:opacity-80"
          style={{ color: '#DC2626', backgroundColor: '#FEE2E2' }}
          title="Supprimer"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}
