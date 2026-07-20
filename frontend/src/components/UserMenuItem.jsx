import { useTheme } from '../context/ThemeContext'

function UserMenuItem({ label, icon: Icon, onClick }) {
  const { colors } = useTheme()

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white rounded-lg transition-colors cursor-pointer"
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent'
      }}
    >
      <Icon size={16} />
      <span>{label}</span>
    </button>
  )
}

export default UserMenuItem
