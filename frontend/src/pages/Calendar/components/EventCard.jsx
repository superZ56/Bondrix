// Carte d'événement rendue dans FullCalendar avec bordure latérale colorée, titre et horaires.
export default function EventCard({ event }) {
  const start = new Date(event.start)
  const end = new Date(event.end)

  // Formate une date en HH:MM pour l'affichage des horaires.
  const formatTime = (date) =>
    `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`

  return (
    <div
      className="flex h-full rounded-md overflow-hidden w-full"
      style={{ borderLeft: `3px solid ${event.backgroundColor}` }}
    >
      <div className="px-2 py-1 min-w-0 flex-1 overflow-hidden">
        <p className="text-[11px] font-semibold text-gray-900 truncate">{event.title}</p>
        <p className="text-[10px] text-gray-500">
          {formatTime(start)} – {formatTime(end)}
        </p>
      </div>
    </div>
  )
}
