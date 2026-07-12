// ListButtons.jsx — Boutons de listes.
// Affiche 3 boutons : liste à puces, liste numérotée, liste de tâches.

import { toggleBulletList, toggleOrderedList, toggleTaskList } from '../../utils/TextEdit'
import { List, ListOrdered, ListChecks } from 'lucide-react'

// Bouton réutilisable avec état actif/inactif.
function ToolButton({ onClick, isActive, children, title }) {
  return (
    <button
      onClick={onClick}
      className={`p-1.5 rounded transition-colors cursor-pointer ${
        isActive ? 'bg-gray-300 text-gray-900' : 'text-gray-600 hover:bg-gray-200'
      }`}
      title={title}
    >
      {children}
    </button>
  )
}

// Affiche les boutons de listes : puces, numérotée, tâches.
export default function ListButtons({ editor }) {
  if (!editor) return null

  const tools = [
    { icon: <List size={16} />, action: () => toggleBulletList(editor), active: editor.isActive('bulletList'), title: 'Bullet list' },
    { icon: <ListOrdered size={16} />, action: () => toggleOrderedList(editor), active: editor.isActive('orderedList'), title: 'Ordered list' },
    { icon: <ListChecks size={16} />, action: () => toggleTaskList(editor), active: editor.isActive('taskList'), title: 'Task list' },
  ]

  return (
    <>
      {tools.map((tool, i) => (
        <ToolButton key={i} onClick={tool.action} isActive={tool.active} title={tool.title}>
          {tool.icon}
        </ToolButton>
      ))}
    </>
  )
}
