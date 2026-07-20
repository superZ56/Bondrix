import UserMenuItem from './UserMenuItem'
import { Settings, LogOut, User } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

function UserMenu({ onProfile, onSettings, onLogout }) {
  const { colors } = useTheme()

  const menuItems = [
    { label: 'Profile', icon: User, onClick: onProfile },
    { label: 'Settings', icon: Settings, onClick: onSettings },
    { label: 'Déconnexion', icon: LogOut, onClick: onLogout },
  ]

  return (
    <div
      className="absolute bottom-full left-0 right-0 mb-2 mx-3 py-2 rounded-xl shadow-xl z-50"
      style={{ backgroundColor: colors.primary }}
    >
      {menuItems.map((item) => (
        <UserMenuItem
          key={item.label}
          label={item.label}
          icon={item.icon}
          onClick={item.onClick}
        />
      ))}
    </div>
  )
}

export default UserMenu
