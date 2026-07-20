import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useNavigate } from 'react-router-dom'

function AccountSettings() {
  const { user, logout } = useAuth()
  const { colors } = useTheme()
  const navigate = useNavigate()

  if (!user) return null

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const handleDeleteAccount = async () => {
        if (!window.confirm("Es-tu sûr de vouloir supprimer ton compte ? Cette action est irréversible.")) return

        const res = await fetch("http://localhost:3000/api/auth/account", {
            method: "DELETE",
            credentials: "include",
        })

        if (res.ok) {
            window.location.href = '/login'
        }
   }

  // List des info utilisateur 

  const infoRows = [
    { label: 'Nom', value: user.username },
    { label: 'Email', value: user.email },
    { label: 'Workspace ID', value: user.workspaceId },
  ]

  return (
    <div className="rounded-xl p-6" style={{ backgroundColor: '#ffffff' }}>
      <h2 className="text-lg font-semibold mb-6">Compte</h2>

      {/* Infos */}
      <div className="space-y-0">
        {infoRows.map((row, i) => (
          <div key={row.label}>
            <div className="flex justify-between py-3">
              <span className="text-sm font-medium" style={{ color: '#6B7280' }}>{row.label}</span>
              <span className="text-sm" style={{ color: '#1F2937' }}>{row.value}</span>
            </div>
            {i < infoRows.length - 1 && (
              <div style={{ borderTop: `1px solid ${colors.secondary}30` }} />
            )}
          </div>
        ))}
      </div>

      {/* Boutons */}
      <div className="mt-8 space-y-3">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer"
          style={{ backgroundColor: colors.secondary + '20', color: colors.textColor || '#1F2937' }}
        >
          Se déconnecter
        </button>

        <button
          onClick={handleDeleteAccount}
          className="w-full px-4 py-2 rounded-xl text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"
        >
          Supprimer mon compte
        </button>
      </div>
    </div>
  )
}

export default AccountSettings