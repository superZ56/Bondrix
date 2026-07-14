import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTheme } from '../../../context/ThemeContext'

const DAY_LABELS = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']

// Retourne le nombre de jours dans un mois donné (année, mois).
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

// Retourne le jour de la semaine (0=Lundi) du premier jour du mois donné.
function getFirstDayOfMonth(year, month) {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1
}

// Mini calendrier interactif avec navigation mois et sélection de jour.
export default function MiniCalendar({ selectedDate, onSelectDate }) {
  const { colors } = useTheme()
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth())
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear())

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)

  const monthLabel = new Date(currentYear, currentMonth).toLocaleDateString('fr-FR', {
    month: 'long',
    year: 'numeric',
  })

  // Passe au mois précédent (gère le passage décembre → janvier).
  const goToPrev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear((y) => y - 1)
    } else {
      setCurrentMonth((m) => m - 1)
    }
  }

  // Passe au mois suivant (gère le passage décembre → janvier).
  const goToNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear((y) => y + 1)
    } else {
      setCurrentMonth((m) => m + 1)
    }
  }

  // Vérifie si deux dates correspondent au même jour (jour, mois, année).
  const isSameDay = (d1, d2) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()

  // Vérifie si le jour donné correspond à la date d'aujourd'hui.
  const isToday = (day) => isSameDay(new Date(currentYear, currentMonth, day), new Date())
  // Vérifie si le jour donné correspond à la date sélectionnée.
  const isSelected = (day) => isSameDay(new Date(currentYear, currentMonth, day), selectedDate)

  const cells = []
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} />)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dayNum = day
    cells.push(
      <button
        key={day}
        onClick={() => onSelectDate(new Date(currentYear, currentMonth, day))}
        className="w-8 h-8 flex items-center justify-center text-xs rounded-full cursor-pointer transition-all font-medium"
        style={{
          color: isSelected(day) ? '#ffffff' : isToday(day) ? colors.primary : '#374151',
          backgroundColor: isSelected(day) ? colors.primary : 'transparent',
          fontWeight: isSelected(day) || isToday(day) ? '700' : '400',
        }}
        onMouseEnter={(e) => {
          if (!isSelected(day)) e.currentTarget.style.backgroundColor = `${colors.primary}15`
        }}
        onMouseLeave={(e) => {
          if (!isSelected(day)) e.currentTarget.style.backgroundColor = 'transparent'
        }}
      >
        {day}
      </button>
    )
  }

  return (
    <div className="select-none">
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={goToPrev}
          className="p-1 rounded-md cursor-pointer transition-all hover:opacity-70"
          style={{ color: colors.primary }}
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm font-semibold capitalize" style={{ color: '#1F2937' }}>
          {monthLabel}
        </span>
        <button
          onClick={goToNext}
          className="p-1 rounded-md cursor-pointer transition-all hover:opacity-70"
          style={{ color: colors.primary }}
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0">
        {DAY_LABELS.map((label) => (
          <div key={label} className="w-8 h-6 flex items-center justify-center text-[10px] font-semibold text-gray-400">
            {label}
          </div>
        ))}
        {cells}
      </div>
    </div>
  )
}
