// NoteEditor.jsx — Composant éditeur riche TipTap.
// Contient l'éditeur avec toutes ses extensions (formatage, tableaux,
// callouts, placeholder, etc.) et la barre d'outils.

import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle, FontSize } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import Highlight from '@tiptap/extension-highlight'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Placeholder from '@tiptap/extension-placeholder'
import { Table, TableRow, TableCell, TableHeader } from '@tiptap/extension-table'
import { Callout } from '../utils/CalloutExtension'
import Toolbox from './Toolbox/Toolbox'
import TableToolbar from './Insertion/TableToolbar'

// Crée et affiche l'éditeur TipTap avec toutes les extensions.
// note = la note sélectionnée (ou null si aucune).
// onUpdate = callback appelé quand le contenu change pour sauvegarder.
export default function NoteEditor({ note, onUpdate }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: { depth: 100 },
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      FontSize,
      Color,
      FontFamily,
      Highlight.configure({ multicolor: true }),
      TaskList,
      TaskItem.configure({ nested: true }),
      // Placeholder : affiche un texte grisé quand un bloc est vide.
      // Pour les callouts, affiche un texte spécifique.
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'callout') return 'Saisissez votre texte ici...'
          return 'Start writing...'
        },
      }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Callout,
    ],
    content: note?.content || '',
    // Sauvegarde le contenu à chaque modification.
    onUpdate: ({ editor }) => {
      if (onUpdate && note) {
        onUpdate({ ...note, content: editor.getJSON() })
      }
    },
  })

  // Quand on change de note, met à jour le contenu de l'éditeur.
  useEffect(() => {
    if (editor && note) {
      const currentJSON = JSON.stringify(editor.getJSON())
      const newJSON = JSON.stringify(note.content)
      if (currentJSON !== newJSON) {
        editor.commands.setContent(note.content || '')
      }
    }
  }, [note?.id])

  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        <p className="text-sm">Select a note to start editing</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col gap-3">
      <Toolbox editor={editor} />
      <TableToolbar editor={editor} />
      <div className="flex-1 bg-white rounded-xl overflow-y-auto p-6">
        <EditorContent editor={editor} className="prose prose-sm max-w-none" />
      </div>
    </div>
  )
}
