import { useTheme } from '../context/ThemeContext'
import { themes } from '../assets/Colors'

// Page de paramètres affichée en overlay, permet de changer le thème de l'application.
function Settings({ onClose }) {

  const { themeName, setThemeName, colors } = useTheme()

  

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold" style={{ color: colors.primary }}>
          Settings
        </h1>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer"
        >
          ×
        </button>
      </div>

      {/* Section Thème */}
      <ThemeSettings>

      </ThemeSettings>
      
    </div>
  )
}

// Section de sélection du thème avec grille de couleurs disponibles.
function ThemeSettings() {
  const { themeName, setThemeName } = useTheme()

  return (
    <div className="rounded-xl p-6" style={{ backgroundColor: '#ffffff' }}>
      <h2 className="text-lg font-semibold mb-4">Theme</h2>
      <p className="text-sm text-gray-500 mb-6">
        Choose a color template for the application.
      </p>

      <div className="grid grid-cols-3 gap-3">
        {Object.entries(themes).map(([key, theme]) => (
          <button
            key={key}
            onClick={() => setThemeName(key)}
            className="flex items-center gap-2 rounded-lg border-2 p-3 text-left transition-all cursor-pointer"
            style={{
              borderColor: themeName === key ? theme.primary : '#E5E7EB',
              backgroundColor: themeName === key ? theme.third : '#ffffff',
            }}
          >
            <div
              className="w-4 h-4 rounded-full shrink-0"
              style={{ backgroundColor: theme.primary }}
            />
            <span className="text-sm font-medium truncate">{theme.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Settings