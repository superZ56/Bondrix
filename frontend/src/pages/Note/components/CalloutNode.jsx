// CalloutNode.jsx — Composant React qui affiche un callout dans l'éditeur.
// Utilise useTheme() pour les couleurs dynamiques (changent avec le thème).
// NodeViewWrapper = conteneur du nœud, NodeViewContent = zone de texte éditable.
// L'icône est cliquable : chaque clic passe à l'emoji suivant.

import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { useTheme } from '../../../context/ThemeContext'

// Nœud callout personnalisé avec icône cliquable et zone de texte éditable.
export default function CalloutNode({ node, updateAttributes }) {
  const { colors } = useTheme()

  return (
    <NodeViewWrapper
      data-callout
      style={{
        backgroundColor: colors.third,
        borderLeft: `4px solid ${colors.third}`,
        borderRadius: '0.5rem',
        padding: '0.75rem 1rem',
        margin: '0.75em 0',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
      }}
    >
      <span
        contentEditable={false}
        suppressContentEditableWarning
        style={{
          fontSize: '1.25rem',
          lineHeight: 1,
          cursor: 'pointer',
          minWidth: '1.5em',
          textAlign: 'center',
          userSelect: 'none',
        }}
        onClick={() => {
          const icons = ['💡', '✅', '⚠️', '🚨', 'ℹ️', '💬', '🔥', '📝']
          const current = node.attrs.icon
          const idx = icons.indexOf(current)
          const next = icons[(idx + 1) % icons.length]
          updateAttributes({ icon: next })
        }}
      >
        {node.attrs.icon}
      </span>
      <NodeViewContent style={{ flex: 1, minWidth: 0 }} />
    </NodeViewWrapper>
  )
}
