import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useNotes } from '../context/NotesContext'
import DirectoryTree from './DirectoryTree'
import {
  Home,
  FileText,
  CheckSquare,
  Calendar,
  MessageCircle,
  FolderOpen,
  Settings,
  ChevronDown,
  ChevronRight,
  Plus,
} from 'lucide-react'

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Notes', path: '/Notes', icon:FileText},
  { name: 'Home', path: '/', icon: Home },
  { name: 'Home', path: '/', icon: Home },
]

function SideBar() {
  const location = useLocation()
  const { colors } = useTheme()
  const { directories, selectedItem, setSelectedItem, addSubdirectory, addNote } = useNotes()
  const [openSections, setOpenSections] = useState({})
  const isNotesActive = location.pathname === '/Notes'

  const toggleSection = (name) => {
    setOpenSections((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  return (
    <aside
      className="w-60 h-full flex flex-col shrink-0"
      style={{ backgroundColor: colors.secondary }}
    >
      {/* Logo */}
      <div className="h-14 flex items-center px-6 border-b border-white/15">
        <span className="text-xl font-bold text-white tracking-wide">
          BONDRIX
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.children && item.children.some((c) => location.pathname === c.path))

          const hasChildren = item.children && item.children.length > 0
          const isOpen = openSections[item.name]

          return (
            <div key={item.name}>
              <div className="flex items-center">
                <Link
                  to={item.path}
                  className="flex-1 flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors text-gray-300"
                  style={{
                    backgroundColor: isActive ? colors.primary : 'transparent',
                    color: isActive ? '#ffffff' : undefined,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = colors.primary + '40'
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  <item.icon size={18} />
                  <span>{item.name}</span>
                </Link>

                {hasChildren && (
                  <button
                    onClick={() => toggleSection(item.name)}
                    className="p-1 rounded cursor-pointer text-gray-300"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.primary + '40'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }}
                  >
                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                )}
              </div>

              {hasChildren && isOpen && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      className="block px-3 py-1.5 rounded-md text-sm transition-colors text-gray-300"
                      style={{
                        backgroundColor: location.pathname === child.path ? colors.primary : 'transparent',
                        color: location.pathname === child.path ? '#ffffff' : undefined,
                      }}
                      onMouseEnter={(e) => {
                        if (location.pathname !== child.path)
                          e.currentTarget.style.backgroundColor = colors.primary + '40'
                      }}
                      onMouseLeave={(e) => {
                        if (location.pathname !== child.path)
                          e.currentTarget.style.backgroundColor = 'transparent'
                      }}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}

              {item.name === 'Notes' && isNotesActive && (
                <div className="ml-2 mt-2 mb-2">
                  <div className="flex items-center justify-between mb-2 px-2">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Files</span>
                    <button
                      onClick={() => addSubdirectory(null)}
                      className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <DirectoryTree
                    data={directories}
                    selectedId={selectedItem?.id}
                    onSelect={setSelectedItem}
                    onAddSubdirectory={addSubdirectory}
                    onAddNote={addNote}
                  />
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}

export default SideBar
