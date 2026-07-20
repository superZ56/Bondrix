import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { CircleText, AvatarIcon } from '../components/CircleButton'
import { uploadImage }  from '../services/uploadService'
import { openImagesFolder } from './utils/pathExtract'

// Page et Methodes Profile

function Profile({ onClose }) {
  const { colors } = useTheme()
  const { user, setUser } = useAuth()

  if (!user) return null

  const handleAvatarChange = async () => {
    const file = await openImagesFolder();
    if (!file) return;

    // 1. Upload l'image via le service existant
    const  url  = await uploadImage(file);

    // 2. Sauvegarder l'URL dans la BDD
    const res = await fetch("http://localhost:3000/api/auth/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ avatar: url }),
    });
    const data = await res.json();

    // 3. Mettre à jour le contexte auth pour que l'avatar persiste
    setUser(data);
  };

  const handleAvatarRemove = async () => {
    const res = await fetch("http://localhost:3000/api/auth/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ avatar: null }),
    });
    const data = await res.json();
    setUser(data);
  };

  return (
    <div className="p-8">
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-4">
          {user.avatar ? (
          <div className="relative">
            <AvatarIcon src={user.avatar} alt={user.username} onClick={handleAvatarChange} size="w-30 h-30" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAvatarRemove();
              }}
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs cursor-pointer hover:scale-110 transition-transform"
              style={{ backgroundColor: '#EF4444' }}
            >
              ✕
            </button>
          </div>
        ) : (
          <div
            onClick={handleAvatarChange}
            className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold cursor-pointer hover:scale-105 transition-transform"
            style={{ backgroundColor: colors.primary }}
          >
            {user.username.charAt(0)}
          </div>
        )}
          <h2 className="text-xl font-bold" style={{ color: colors.textColor || '#1F2937' }}>
            {user.username}
          </h2>
        </div>

        <div className="w-full space-y-4">
          <div className="p-4 rounded-xl" style={{ backgroundColor: colors.secondary + '15' }}>
            <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: colors.textColor || '#6B7280' }}>
              Nom d'utilisateur
            </span>
            <p className="mt-1 text-sm" style={{ color: colors.textColor || '#1F2937' }}>
              {user.username}
            </p>
          </div>

          <div className="p-4 rounded-xl" style={{ backgroundColor: colors.secondary + '15' }}>
            <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: colors.textColor || '#6B7280' }}>
              Email
            </span>
            <p className="mt-1 text-sm" style={{ color: colors.textColor || '#1F2937' }}>
              {user.email}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-6 py-2 rounded-xl text-sm font-medium text-white transition-colors cursor-pointer"
          style={{ backgroundColor: colors.primary }}
        >
          Fermer
        </button>
      </div>
    </div>
  )
}

export default Profile
