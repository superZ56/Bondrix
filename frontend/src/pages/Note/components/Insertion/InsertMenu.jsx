// InsertMenu.jsx — Menu déroulant "Insérer".
// Bouton "+" qui ouvre un dropdown avec les éléments insérables
// (tableau, callout). Gère l'ouverture/fermeture et le clic extérieur.

import { useState, useRef, useEffect } from 'react'
import { Plus, Table2, MessageSquare } from 'lucide-react'
import TableInsert from './TableInsert'
import CalloutInsert from './CalloutInsert'

// Liste des éléments insérables avec leur composant associé.
const insertions = [
  { id: 'table',   label: 'Table',   icon: <Table2 size={16} />,     component: TableInsert },
  { id: 'callout', label: 'Callout', icon: <MessageSquare size={16} />, component: CalloutInsert },
]

// Affiche le bouton Insert + dropdown avec les sous-menus.
// editor = instance TipTap passée aux composants d'insertion.
export default function InsertMenu({ editor }) {
  const [open, setOpen] = useState(false)
  const [activePanel, setActivePanel] = useState(null)
  const ref = useRef(null)

  // Ferme le menu quand on clique à l'extérieur.
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
        setActivePanel(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const ActiveComponent = activePanel
    ? insertions.find((i) => i.id === activePanel)?.component
    : null

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => {
          setOpen(!open)
          setActivePanel(null)
        }}
        className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-200 transition-colors cursor-pointer text-gray-600"
        title="Insert"
      >
        <Plus size={16} />
        <span className="text-xs font-medium">Insert</span>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[180px]">
          {!activePanel ? (
            <div className="py-1">
              {insertions.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActivePanel(item.id)}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          ) : (
            <div>
              <button
                onClick={() => setActivePanel(null)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer w-full text-left border-b border-gray-100"
              >
                ← Back
              </button>
              {ActiveComponent && (
                <ActiveComponent
                  editor={editor}
                  onClose={() => {
                    setOpen(false)
                    setActivePanel(null)
                  }}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
