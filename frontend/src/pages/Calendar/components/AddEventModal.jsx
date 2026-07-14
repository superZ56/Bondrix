import { useState } from 'react'
import { X } from 'lucide-react'
import MiniCalendar from './MiniCalendar'
import { useTheme } from '../../../context/ThemeContext'
import { useEvents } from '../../../context/EventContext'

const COLORS = [
  '#4F46E5',
  '#10B981',
  '#F97316',
  '#EC4899',
  '#DC2626',
  '#06B6D4',
]

// Extrait l'heure (HH:MM) d'une chaîne ISO pour pré-remplir les champs heure.
function parseEventDate(isoStr) {
  const d = new Date(isoStr)
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

// formulaire de création/édition d'événement avec mini calendrier, formulaire et sélection de couleur.
export default function AddEventModal({ onClose, editingEvent }) {
  const { colors } = useTheme()
  const { addEvent, updateEvent } = useEvents()
  const isEditing = !!editingEvent

  const [selectedDate, setSelectedDate] = useState(() => {
    if (editingEvent) return new Date(editingEvent.start)
    return new Date()
  })
  const [title, setTitle] = useState(editingEvent?.title || '')
  const [startTime, setStartTime] = useState(() => {
    if (editingEvent) return parseEventDate(editingEvent.start)
    return '09:00'
  })
  const [endTime, setEndTime] = useState(() => {
    if (editingEvent) return parseEventDate(editingEvent.end)
    return '10:00'
  })
  const [selectedColor, setSelectedColor] = useState(editingEvent?.color || COLORS[0])

  // Valide le formulaire et ajoute ou met à jour l'événement dans le contexte.
  const handleSubmit = () => {
    if (!title.trim()) return

    const year = selectedDate.getFullYear()
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
    const day = String(selectedDate.getDate()).padStart(2, '0')

    const eventData = {
      title: title.trim(),
      start: `${year}-${month}-${day}T${startTime}:00`,
      end: `${year}-${month}-${day}T${endTime}:00`,
      color: selectedColor,
    }

    if (isEditing) {
      updateEvent(editingEvent.id, eventData)
    } else {
      addEvent(eventData)
    }

    onClose()
  }

  const inputStyle = {
    backgroundColor: '#ffffff',
    border: `1px solid ${colors.primary}30`,
    color: '#1F2937',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div
        className="rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto mx-4"
        style={{ backgroundColor: colors.third, width: '100%', maxWidth: '640px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: `${colors.primary}20` }}>
          <h3 className="text-lg font-semibold" style={{ color: '#1F2937' }}>
            {isEditing ? 'Modifier l\'événement' : 'Nouvel événement'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg cursor-pointer transition-all hover:opacity-70"
            style={{ color: '#6B7280' }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 flex gap-6">
          <div className="shrink-0">
            <MiniCalendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#374151' }}>
                Titre
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Réunion d'équipe"
                className="w-full px-3 py-2 rounded-lg text-sm outline-none transition-all"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = colors.primary)}
                onBlur={(e) => (e.target.style.borderColor = `${colors.primary}30`)}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#374151' }}>
                Date
              </label>
              <div
                className="w-full px-3 py-2 rounded-lg text-sm"
                style={{ backgroundColor: '#ffffff', border: `1px solid ${colors.primary}30`, color: '#1F2937' }}
              >
                {selectedDate.toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-medium mb-1" style={{ color: '#374151' }}>
                  Début
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none transition-all"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = colors.primary)}
                  onBlur={(e) => (e.target.style.borderColor = `${colors.primary}30`)}
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium mb-1" style={{ color: '#374151' }}>
                  Fin
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none transition-all"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = colors.primary)}
                  onBlur={(e) => (e.target.style.borderColor = `${colors.primary}30`)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: '#374151' }}>
                Couleur
              </label>
              <div className="flex gap-2">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className="w-7 h-7 rounded-full cursor-pointer transition-all"
                    style={{
                      backgroundColor: color,
                      boxShadow: selectedColor === color ? `0 0 0 2px ${colors.third}, 0 0 0 4px ${color}` : 'none',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t flex justify-end" style={{ borderColor: `${colors.primary}20` }}>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all hover:opacity-90"
            style={{ backgroundColor: colors.primary, color: '#ffffff' }}
          >
            {isEditing ? 'Enregistrer' : 'Ajouter'}
          </button>
        </div>
      </div>
    </div>
  )
}
