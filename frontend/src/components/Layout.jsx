import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import Settings from '../pages/Settings/Settings'
import { useTheme } from '../context/ThemeContext'
import { useState } from 'react'

// Mise en page principale avec SideBar, TopBar, zone de contenu et overlay Settings.
function Layout() {
  const { colors } = useTheme()
  const [showSettings , setShowSettings] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar onSettingsClick={() => setShowSettings(true)} />
      <div
        className="flex-1 flex flex-col overflow-hidden"
        style={{ backgroundColor: colors.secondary }}
      >
        <main
          className="flex-1 overflow-y-auto overflow-x-hidden m-4 mb-0 rounded-t-2xl hide-scrollbar"
          style={{ backgroundColor: colors.third }}
        >
          <Outlet />
        </main>
      </div>

     {/* Overlay Settings */}
      {showSettings && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setShowSettings(false)}
        >
          <div
            className="rounded-2xl shadow-2xl max-h-[80vh] overflow-y-auto mx-4"
            style={{ backgroundColor: colors.third, width: '100%', maxWidth: '640px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Settings onClose={() => setShowSettings(false)} />
          </div>
        </div>
      )}
    </div>

  )

  
}

export default Layout
