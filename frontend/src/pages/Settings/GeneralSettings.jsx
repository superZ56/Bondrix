import { useTheme } from '../../context/ThemeContext'
import { themes } from '../../assets/Colors'

function GeneralSettings() {
  const { themeName, setThemeName } = useTheme()

  return (
    <div className="rounded-xl p-6" style={{ backgroundColor: '#ffffff' }}>
      <h2 className="text-lg font-semibold mb-4">Theme</h2>
      <p className="text-sm text-gray-500 mb-6">
        Choose a color template for the application.
      </p>
      <div className="grid grid-cols-3 gap-3">
        {Object.entries(themes).map(([key, theme]) => (
          <button key={key} onClick={() => setThemeName(key)}
            className="flex items-center gap-2 rounded-lg border-2 p-3 text-left transition-all cursor-pointer"
            style={{
              borderColor: themeName === key ? theme.primary : '#E5E7EB',
              backgroundColor: themeName === key ? theme.third : '#ffffff',
            }}>
            <div className="w-4 h-4 rounded-full shrink-0"
              style={{ backgroundColor: theme.primary }} />
            <span className="text-sm font-medium truncate">{theme.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default GeneralSettings