import TaskItem from './TaskItem'
import { useTasks } from '../../../context/TaskContext'

const IMPORTANCE_ORDER = { high: 0, medium: 1, low: 2 }

// Liste des tâches d'un jour donné, filtrées et triées par importance (haute en bas).
export default function DayTaskList({ selectedDate }) {
  const { tasks, toggleTask } = useTasks()

  const dateStr = selectedDate.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const dayTasks = tasks
    .filter((t) => {
      const taskDate = new Date(t.date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      return taskDate === dateStr
    })
    .sort((a, b) => (IMPORTANCE_ORDER[a.importance] ?? 3) - (IMPORTANCE_ORDER[b.importance] ?? 3))

  return (
    <div className="flex-1 bg-white rounded-xl overflow-y-auto p-6 min-h-[350px]">
      {dayTasks.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-sm text-gray-400">Aucune tâche pour ce jour</p>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {dayTasks.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={toggleTask} />
          ))}
        </div>
      )}
    </div>
  )
}
