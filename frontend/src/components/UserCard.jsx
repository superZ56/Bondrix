import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { CircleText, AvatarIcon } from './CircleButton'
import UserMenu from './UserMenu'
import Profile from '../pages/Profile'

function UserCard({ onSettingsClick }) {
  const { colors } = useTheme()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  if (!user) return null

  //methodes executé par les bouttons du menu

  const handleLogout = async () => {
    setShowMenu(false)
    await logout()
    navigate('/login')
  }

  const handleProfile = () => {
    setShowMenu(false)
    setShowProfile(true)
  }

  const handleSettings = () => {
    setShowMenu(false)
    onSettingsClick()
  }

  return (
    <div className="relative px-3 py-3">
      {showMenu && (
        <UserMenu
          onProfile={handleProfile}
          onSettings={handleSettings}
          onLogout={handleLogout}
        />
      )}

      <div
        onClick={() => setShowMenu(!showMenu)}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-colors cursor-pointer"
        style={{ backgroundColor: colors.primary }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.85'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1'
        }}
      >
        {user.avatar ? (
          <AvatarIcon src={user.avatar} alt={user.username} />
        ) : (
          <CircleText text={user.username.charAt(0)} />
        )}
        <span className="text-sm text-white truncate">{user.username}</span>
      </div>

      {showProfile && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setShowProfile(false)}
        >
          <div
            className="rounded-2xl shadow-2xl max-h-[80vh] overflow-y-auto mx-4"
            style={{ backgroundColor: colors.third, width: '100%', maxWidth: '480px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Profile onClose={() => setShowProfile(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default UserCard
