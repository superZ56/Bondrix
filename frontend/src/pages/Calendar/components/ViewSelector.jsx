
import { useState, useRef, useEffect } from 'react'
import { ChevronDown, CalendarDays } from 'lucide-react'
import { useTheme } from '../../../context/ThemeContext'

const views = [
  { id: 'dayGridMonth', label: 'Mois' },
  { id: 'timeGridWeek', label: 'Semaine' },
  { id: 'timeGrid4Days', label: '4 Jours' },
  { id: 'timeGridDay', label: 'Jour' },
]

// Sélecteur de vue déroulant (Mois, Semaine, 4 Jours, Jour) pour le calendrier.
export default function ViewSelector({ currentView, onViewChange }) {
  const { colors } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Ferme le dropdown si l'utilisateur clique en dehors du composant.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const activeLabel = views.find((v) => v.id === currentView)?.label || 'Mois'

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg cursor-pointer transition-all hover:opacity-90"
        style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff' }}
      >
        <CalendarDays size={16} />
        <span>{activeLabel}</span>
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-1 rounded-lg shadow-lg z-50 min-w-[150px] overflow-hidden"
          style={{ backgroundColor: colors.third, border: `1px solid ${colors.primary}20` }}
        >
          {views.map((view) => (
            <button
              key={view.id}
              onClick={() => { onViewChange(view.id); setOpen(false) }}
              className="w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer"
              style={{
                color: currentView === view.id ? colors.primary : '#374151',
                backgroundColor: currentView === view.id ? `${colors.primary}15` : 'transparent',
                fontWeight: currentView === view.id ? '600' : '400',
              }}
              onMouseEnter={(e) => {
                if (currentView !== view.id)
                  e.currentTarget.style.backgroundColor = `${colors.primary}10`
              }}
              onMouseLeave={(e) => {
                if (currentView !== view.id)
                  e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              {view.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}