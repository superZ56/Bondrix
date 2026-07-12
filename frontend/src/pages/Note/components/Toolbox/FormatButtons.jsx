// FormatButtons.jsx — Boutons de formatage de base (gras, italique, etc.).
// Affiche 5 boutons : Bold, Italic, Underline, Strikethrough, Code.
// Chaque bouton est actif quand le format est appliqué sur la sélection.

import {
  toggleBold,
  toggleItalic,
  toggleUnderline,
  toggleStrike,
  toggleCode,
} from '../../utils/TextEdit'
import { Bold, Italic, Underline, Strikethrough, Code } from 'lucide-react'

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

// Affiche les boutons de formatage : gras, italique, souligné, barré, code.
export default function FormatButtons({ editor }) {
  if (!editor) return null

  const tools = [
    { icon: <Bold size={16} />, action: () => toggleBold(editor), active: editor.isActive('bold'), title: 'Bold (Ctrl+B)' },
    { icon: <Italic size={16} />, action: () => toggleItalic(editor), active: editor.isActive('italic'), title: 'Italic (Ctrl+I)' },
    { icon: <Underline size={16} />, action: () => toggleUnderline(editor), active: editor.isActive('underline'), title: 'Underline (Ctrl+U)' },
    { icon: <Strikethrough size={16} />, action: () => toggleStrike(editor), active: editor.isActive('strike'), title: 'Strikethrough' },
    { icon: <Code size={16} />, action: () => toggleCode(editor), active: editor.isActive('code'), title: 'Inline code' },
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
