// AlignButtons.jsx — Boutons d'alignement du texte.
// Affiche 4 boutons : gauche, centre, droite, justifié.
// Le bouton actif est mis en surbrillance.

import { setTextAlign } from '../../utils/TextEdit'
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react'

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

// Affiche les boutons d'alignement : gauche, centre, droite, justifié.
export default function AlignButtons({ editor }) {
  if (!editor) return null

  const alignments = [
    { icon: <AlignLeft size={16} />, value: 'left', title: 'Align left' },
    { icon: <AlignCenter size={16} />, value: 'center', title: 'Align center' },
    { icon: <AlignRight size={16} />, value: 'right', title: 'Align right' },
    { icon: <AlignJustify size={16} />, value: 'justify', title: 'Justify' },
  ]

  return (
    <>
      {alignments.map((a) => (
        <ToolButton
          key={a.value}
          onClick={() => setTextAlign(editor, a.value)}
          isActive={editor.isActive({ textAlign: a.value })}
          title={a.title}
        >
          {a.icon}
        </ToolButton>
      ))}
    </>
  )
}
