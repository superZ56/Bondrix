import { useTheme } from '../context/ThemeContext'

// Bouton réutilisable avec variantes primary, secondary et ghost.
export default function Button({ text, onClick, variant = 'primary', className = '' }) {
  const { colors } = useTheme()

  const variants = {
    primary: {
      backgroundColor: colors.primary,
      color: '#ffffff',
    },
    secondary: {
      backgroundColor: colors.third,
      color: colors.primary,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colors.primary,
    },
  }

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all hover:opacity-90 active:scale-95 cursor-pointer ${className}`}
      style={variants[variant]}
    >
      {text}
    </button>
  )
}