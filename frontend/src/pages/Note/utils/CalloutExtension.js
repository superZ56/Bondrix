// CalloutExtension.js — Extension TipTap pour les encadrés (callouts).
// Définit le node "callout" dans le schema ProseMirror : un bloc
// contenant du texte inline + une icône. Le rendu est géré par
// le composant React CalloutNode via ReactNodeViewRenderer.

import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import CalloutNode from '../components/CalloutNode'

export const Callout = Node.create({
  name: 'callout',
  group: 'block',
  content: 'inline*',
  draggable: true,

  // Attributs stockés dans chaque nœud callout.
  // type = variante visuelle (info, success, warning, danger, tip).
  // icon = emoji affiché à gauche ( cliquable pour changer ).
  addAttributes() {
    return {
      type: { default: 'info' },
      icon: { default: '💡' },
    }
  },

  // Règle de parsing HTML : reconnaît les <div data-callout>.
  parseHTML() {
    return [{ tag: 'div[data-callout]' }]
  },

  // Structure HTML de sortie (utilisée pour l'export/clipboard).
  // Le "0" = emplacement du contenu inline du callout.
  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 'data-callout': '' }),
      0,
    ]
  },

  // Utilise un composant React pour le rendu dans l'éditeur.
  // CalloutNode gère les couleurs du thème et le clic sur l'icône.
  addNodeView() {
    return ReactNodeViewRenderer(CalloutNode)
  },
})
