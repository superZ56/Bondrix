import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import EventCard from './EventCard'

// Conteneur FullCalendar avec rendu custom des événements, drag & drop et gestion des clics.
export default function CalendarView({
  calendarRef,
  currentView,
  events,
  onDatesSet,
  onEventDrop,
  onEventClick,
}) {
  return (
    <div
      className="rounded-b-xl overflow-hidden fc-custom"
      style={{ backgroundColor: '#ffffff' }}
    >
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={false}
        views={{
          timeGrid4Days: {
            type: 'timeGrid',
            duration: { days: 4 },
            buttonText: '4 Jours',
          },
        }}
        editable={true}
        events={events}
        eventContent={(arg) => <EventCard event={arg.event} />}
        locale="fr"
        firstDay={1}
        allDaySlot={false}
        slotMinTime="06:00:00"
        slotMaxTime="23:00:00"
        height="auto"
        contentHeight={550}
        dayMaxEvents={3}
        nowIndicator={true}
        eventDisplay="block"
        datesSet={(dateInfo) => onDatesSet(dateInfo)}
        eventDrop={(info) => {
          onEventDrop(info.event.id, {
            start: info.event.startStr,
            end: info.event.endStr,
          })
        }}
        eventClick={(info) => {
          info.jsEvent.preventDefault()
          onEventClick(info.event, info.el)
        }}
      />
    </div>
  )
}
