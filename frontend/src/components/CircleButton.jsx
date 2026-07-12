import { Settings } from "lucide-react"
import { useTheme } from '../context/ThemeContext'

// Settings Boutton

export const SettingsIcon = ({ onClick }) => {
  const { colors } = useTheme() 

  return (
    <button
      onClick={onClick}
      className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110"
      style={{ backgroundColor: colors.third }}
    >
      <Settings size={18} style={{ color: colors.primary }} />
    </button>
  )
}

export const AvatarIcon = ({ src, alt, onClick }) => {
  const { colors } = useTheme()

  return (
    <button
      onClick={onClick}
      className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center cursor-pointer transition-all hover:scale-110"
      style={{
        backgroundColor: colors.third,
        border: `2px solid ${colors.primary}`,
      }}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="text-sm font-semibold" style={{ color: colors.primary }}>?</span>
      )}
    </button>
  )
}

export const CircleText = ({ text, onClick }) => {
  const { colors } = useTheme()

  return (
    <button
      onClick={onClick}
      className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110"
      style={{ backgroundColor: colors.primary }}
    >
      <span className="text-sm font-semibold text-white">{text}</span>
    </button>
  )
}
