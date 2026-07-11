import { useTheme } from '../context/ThemeContext'
import { themes } from '../assets/Colors'

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
      <div className="rounded-xl p-6" style={{ backgroundColor: '#ffffff' }}>
        <h2 className="text-lg font-semibold mb-4">Theme</h2>
        <p className="text-sm text-gray-500 mb-6">
          Choose a color template for the application.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(themes).map(([key, theme]) => (
            <button
              key={key}
              onClick={() => setThemeName(key)}
              className="rounded-lg border-2 p-4 text-left transition-all cursor-pointer"
              style={{
                borderColor: themeName === key ? theme.primary : '#E5E7EB',
                backgroundColor: themeName === key ? theme.third : '#ffffff',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: theme.primary }}
                />
                <span className="font-medium">{theme.name}</span>
                {themeName === key && (
                  <span
                    className="ml-auto text-xs font-semibold px-2 py-1 rounded-full"
                    style={{ backgroundColor: theme.primary, color: '#ffffff' }}
                  >
                    Active
                  </span>
                )}
              </div>

              {/* Aperçu des couleurs */}
              <div className="flex gap-2">
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: theme.primary }}
                  title="Primary"
                />
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: theme.secondary }}
                  title="Secondary"
                />
                <div
                  className="w-6 h-6 rounded border border-gray-200"
                  style={{ backgroundColor: theme.third }}
                  title="Third"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Settings