// BlockButtons.jsx — Boutons d'actions de blocs.
// Affiche 4 boutons : citation, bloc de code, ligne horizontale, effacer le formatage.

import { setBlockquote, setHorizontalRule, setCodeBlock, clearMarks } from '../../utils/TextEdit'
import { Quote, Minus, Code2, Eraser } from 'lucide-react'

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

// Affiche les boutons de blocs : citation, code, séparateur, effacer.
export default function BlockButtons({ editor }) {
  if (!editor) return null

  const tools = [
    { icon: <Quote size={16} />, action: () => setBlockquote(editor), active: editor.isActive('blockquote'), title: 'Blockquote' },
    { icon: <Code2 size={16} />, action: () => setCodeBlock(editor), active: editor.isActive('codeBlock'), title: 'Code block' },
    { icon: <Minus size={16} />, action: () => setHorizontalRule(editor), active: false, title: 'Horizontal rule' },
    { icon: <Eraser size={16} />, action: () => clearMarks(editor), active: false, title: 'Clear formatting' },
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
