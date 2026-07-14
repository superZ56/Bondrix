import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import MiniCalendar from './MiniCalendar'
import DayTaskList from './DayTaskList'
import { useTheme } from '../../../context/ThemeContext'
import { useTasks } from '../../../context/TaskContext'

const IMPORTANCE_OPTIONS = [
  { value: 'high', label: 'Haute', color: '#DC2626', bg: '#FEE2E2' },
  { value: 'medium', label: 'Moyenne', color: '#D97706', bg: '#FEF3C7' },
  { value: 'low', label: 'Basse', color: '#16A34A', bg: '#DCFCE7' },
]

// Modal des tâches du jour avec mini calendrier, liste de tâches et formulaire d'ajout.
export default function DayTasksModal({ onClose }) {
  const { colors } = useTheme()
  const { addTask } = useTasks()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showForm, setShowForm] = useState(false)
  const [taskTitle, setTaskTitle] = useState('')
  const [taskImportance, setTaskImportance] = useState('low')

  // Crée une nouvelle tâche avec la date sélectionnée et l'importance choisie, puis réinitialise le formulaire.
  const handleAddTask = () => {
    if (!taskTitle.trim()) return

    const year = selectedDate.getFullYear()
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
    const day = String(selectedDate.getDate()).padStart(2, '0')

    addTask({
      title: taskTitle.trim(),
      importance: taskImportance,
      date: `${year}-${month}-${day}`,
    })

    setTaskTitle('')
    setTaskImportance('low')
    setShowForm(false)
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
            Tâches du jour
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

          <div className="flex-1 flex flex-col gap-3">
            <DayTaskList selectedDate={selectedDate} />

            {showForm ? (
              <div className="bg-white rounded-xl p-4 flex flex-col gap-3">
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="Titre de la tâche..."
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none transition-all"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = colors.primary)}
                  onBlur={(e) => (e.target.style.borderColor = `${colors.primary}30`)}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddTask()
                    if (e.key === 'Escape') setShowForm(false)
                  }}
                />

                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium" style={{ color: '#374151' }}>Importance :</span>
                  {IMPORTANCE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setTaskImportance(opt.value)}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full cursor-pointer transition-all"
                      style={{
                        color: taskImportance === opt.value ? '#ffffff' : opt.color,
                        backgroundColor: taskImportance === opt.value ? opt.color : opt.bg,
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowForm(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all hover:opacity-80"
                    style={{ color: '#6B7280', backgroundColor: '#F3F4F6' }}
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleAddTask}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all hover:opacity-90"
                    style={{ backgroundColor: colors.primary, color: '#ffffff' }}
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-all hover:opacity-80 self-start"
                style={{ color: colors.primary, backgroundColor: `${colors.primary}15` }}
              >
                <Plus size={16} />
                Ajouter une tâche
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
