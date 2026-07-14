import { useRef, useState, useCallback } from 'react'
import CalendarHeader from './components/CalendarHeader'
import CalendarView from './components/CalendarView'
import AddEventModal from './components/AddEventModal'
import EventPopover from './components/EventPopover'
import DayTasksModal from './components/DayTasksModal'
import { EventProvider, useEvents } from '../../context/EventContext'
import { TaskProvider } from '../../context/TaskContext'

// Composant principal du calendrier. Gère l'état des vues, modals et popover, et englobe les providers.
function CalendarInner() {
  const calendarRef = useRef(null)
  const [currentView, setCurrentView] = useState('dayGridMonth')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDayTasks, setShowDayTasks] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [popover, setPopover] = useState(null)
  const { events, updateEvent, deleteEvent } = useEvents()

  // Change la vue du calendrier (mois, semaine, 4 jours, jour) et met à jour le state.
  const handleViewChange = (viewId) => {
    setCurrentView(viewId)
    calendarRef.current?.getApi().changeView(viewId)
  }

  // Met à jour la date courante affichée dans le header quand FullCalendar navigue.
  const handleDatesSet = (dateInfo) => {
    setCurrentDate(dateInfo.start)
  }

  // Sauvegarde la nouvelle position d'un événement après drag & drop.
  const handleEventDrop = useCallback((eventId, { start, end }) => {
    updateEvent(eventId, { start, end })
  }, [updateEvent])

  // Ouvre le popover d'action (modifier/supprimer) au clic sur un événement.
  const handleEventClick = useCallback((event, el) => {
    setPopover({ event, anchorEl: el })
  }, [])

  // Ferme le popover et ouvre le formulaire d'édition pré-rempli avec les données de l'événement.
  const handleEditFromPopover = () => {
    const ev = popover?.event
    setPopover(null)
    if (ev) {
      setEditingEvent({
        id: ev.id,
        title: ev.title,
        start: ev.startStr,
        end: ev.endStr,
        color: ev.backgroundColor,
      })
    }
  }

  // Ferme le popover et supprime l'événement sélectionné du contexte.
  const handleDeleteFromPopover = () => {
    const ev = popover?.event
    setPopover(null)
    if (ev) deleteEvent(ev.id)
  }

  // Ferme le modal d'ajout/édition et réinitialise l'événement en cours d'édition.
  const handleCloseAddModal = () => {
    setShowAddModal(false)
    setEditingEvent(null)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <CalendarHeader
        calendarRef={calendarRef}
        currentView={currentView}
        currentDate={currentDate}
        onViewChange={handleViewChange}
        onAddEvent={() => setShowAddModal(true)}
        onDayTasks={() => setShowDayTasks(true)}
      />
      <CalendarView
        calendarRef={calendarRef}
        currentView={currentView}
        events={events}
        onDatesSet={handleDatesSet}
        onEventDrop={handleEventDrop}
        onEventClick={handleEventClick}
      />

      {popover && (
        <EventPopover
          anchorEl={popover.anchorEl}
          onEdit={handleEditFromPopover}
          onDelete={handleDeleteFromPopover}
          onClose={() => setPopover(null)}
        />
      )}

      {(showAddModal || editingEvent) && (
        <AddEventModal
          onClose={handleCloseAddModal}
          editingEvent={editingEvent}
        />
      )}

      {showDayTasks && (
        <DayTasksModal onClose={() => setShowDayTasks(false)} />
      )}
    </div>
  )
}

// Point d'entrée de la page Calendar. Englobe EventProvider et TaskProvider.
export default function Calendar() {
  return (
    <EventProvider>
      <TaskProvider>
        <CalendarInner />
      </TaskProvider>
    </EventProvider>
  )
}
