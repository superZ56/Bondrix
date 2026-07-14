import { ChevronLeft, ChevronRight, Plus, ClipboardList } from 'lucide-react'
import ViewSelector from './ViewSelector'
import { useTheme } from '../../../context/ThemeContext'

// Barre d'en-tête du calendrier avec navigation, titre dynamique, sélecteur de vue et boutons d'action.
export default function CalendarHeader({ calendarRef, currentView, currentDate, onViewChange, onAddEvent, onDayTasks }) {
  const { colors } = useTheme()

  // Navigue vers la période précédente (mois, semaine ou jour selon la vue active).
  const goToPrev = () => calendarRef.current?.getApi().prev()
  // Navigue vers la période suivante (mois, semaine ou jour selon la vue active).
  const goToNext = () => calendarRef.current?.getApi().next()
  // Revient à la date du jour dans le calendrier.
  const goToToday = () => calendarRef.current?.getApi().today()

  // Génère le titre affiché dans le header selon la vue active (mois, plage de dates ou jour précis).
  const getTitle = () => {
    const api = calendarRef.current?.getApi()
    if (!api) return ''

    if (currentView === 'dayGridMonth') {
      return currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    }
    if (currentView === 'timeGridWeek' || currentView === 'timeGrid4Days') {
      const start = api.view.activeStart
      const end = api.view.activeEnd
      return `${start.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} – ${end.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}`
    }
    if (currentView === 'timeGridDay') {
      return currentDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    }
    return ''
  }

  return (
    <div
      className="flex items-center justify-between px-4 py-3 rounded-t-xl"
      style={{ backgroundColor: colors.primary }}
    >
      <div className="flex items-center gap-2">
        <button
          onClick={goToToday}
          className="px-3 py-1.5 text-sm font-medium rounded-lg cursor-pointer transition-all hover:opacity-90"
          style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff' }}
        >
          Aujourd'hui
        </button>

        <button
          onClick={goToPrev}
          className="p-1.5 rounded-lg cursor-pointer transition-all hover:opacity-80"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#ffffff' }}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={goToNext}
          className="p-1.5 rounded-lg cursor-pointer transition-all hover:opacity-80"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#ffffff' }}
        >
          <ChevronRight size={18} />
        </button>

        <h2 className="text-white text-lg font-semibold ml-2">{getTitle()}</h2>
      </div>

      <div className="flex items-center gap-2">
        <ViewSelector currentView={currentView} onViewChange={onViewChange} />
        <button
          onClick={onDayTasks}
          className="p-1.5 rounded-lg cursor-pointer transition-all hover:opacity-90"
          style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff' }}
          title="Tâches du jour"
        >
          <ClipboardList size={18} />
        </button>
        <button
          onClick={onAddEvent}
          className="p-1.5 rounded-lg cursor-pointer transition-all hover:opacity-90"
          style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff' }}
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  )
}