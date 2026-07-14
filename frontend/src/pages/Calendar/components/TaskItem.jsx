import { useTheme } from '../../../context/ThemeContext'

const IMPORTANCE_CONFIG = {
  high: { label: 'Haute', color: '#DC2626', bg: '#FEE2E2' },
  medium: { label: 'Moyenne', color: '#D97706', bg: '#FEF3C7' },
  low: { label: 'Basse', color: '#16A34A', bg: '#DCFCE7' },
}

// Élément de tâche avec case à cocher, titre barré si terminé et tag d'importance coloré.
export default function TaskItem({ task, onToggle }) {
  const { colors } = useTheme()
  const importance = IMPORTANCE_CONFIG[task.importance] || IMPORTANCE_CONFIG.low

  return (
    <div
      className="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all"
      style={{ backgroundColor: task.done ? `${colors.primary}08` : 'transparent' }}
    >
      <button
        onClick={() => onToggle(task.id)}
        className="shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all"
        style={{
          borderColor: task.done ? colors.primary : '#D1D5DB',
          backgroundColor: task.done ? colors.primary : 'transparent',
        }}
      >
        {task.done && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <span
        className="flex-1 text-sm transition-all"
        style={{
          color: task.done ? '#9CA3AF' : '#1F2937',
          textDecoration: task.done ? 'line-through' : 'none',
        }}
      >
        {task.title}
      </span>

      <span
        className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full"
        style={{ color: importance.color, backgroundColor: importance.bg }}
      >
        {importance.label}
      </span>
    </div>
  )
}
