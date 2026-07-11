import { useTheme } from '../context/ThemeContext'
import { SettingsIcon, AvatarIcon, CircleText } from './CircleButton'

const organizationName = "Mon Organisation"

const user = {
  name: "Super Z",
  avatar: null,
}

function TopBar({onSettingsClick}) {
  const { colors } = useTheme()

  return (
    <header
      className="h-14 border-b flex items-center justify-between px-6 shrink-0"
      style={{
        backgroundColor: colors.primary,
        borderColor: colors.secondary,
      }}
    >
      <span className="text-lg font-semibold text-white">
        {organizationName}
      </span>

      <div className="flex items-center gap-3">
        <CircleText text={user.name.charAt(0)} />
        <AvatarIcon src={user.avatar} alt={user.name} />
        <SettingsIcon onClick={onSettingsClick} />
      </div>
    </header>
  )
}

export default TopBar
