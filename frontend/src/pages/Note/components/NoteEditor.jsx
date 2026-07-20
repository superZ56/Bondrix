// NoteEditor.jsx — Composant éditeur riche TipTap.
// Contient l'éditeur avec toutes ses extensions (formatage, tableaux,
// callouts, placeholder, etc.) et la barre d'outils.

import { useEffect , useRef } from 'react'
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

import CustomImage from '../utils/ImageExtension.jsx'
import { uploadImage } from '../../../services/uploadService'

import { Table, TableRow, TableCell, TableHeader } from '@tiptap/extension-table'
import { Callout } from '../utils/CalloutExtension'
import Toolbox from './Toolbox/Toolbox'
import TableToolbar from './Insertion/TableToolbar'

// Crée et affiche l'éditeur TipTap avec toutes les extensions.
// note = la note sélectionnée (ou null si aucune).
// onUpdate = callback appelé quand le contenu change pour sauvegarder.
export default function NoteEditor({ note, onUpdate }) {

  const editorRef = useRef(null)


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
      CustomImage.configure({ inline: false, allowBase64: true }),
    ],
    content: note?.content || '',
    // Sauvegarde le contenu à chaque modification.
    onUpdate: ({ editor }) => {
      if (onUpdate && note) {
        onUpdate({ ...note, content: editor.getHTML() })
      }
    },
  })

  // Drag & Drop image 

  useEffect(() => {
    if (!editor || !editorRef.current) return
    const editorEl = editorRef.current

    function handleDrop(e) {
      e.preventDefault()
      const files = e.dataTransfer?.files
      if (!files?.length) return
      Array.from(files).forEach(async (file) => {
        if (!file.type.startsWith('image/')) return
        const url = await uploadImage(file)
        editor.chain().focus().setImage({ src: url, width: 400, height: 'auto' }).run()      })
    }

    function handlePaste(e) {
      const items = e.clipboardData?.items
      if (!items) return
      Array.from(items).forEach(async (item) => {
        if (item.type.startsWith('image/')) {
          e.preventDefault()
          const file = item.getAsFile()
          const url = await uploadImage(file)
          editor.chain().focus().setImage({ src: url, width: 400, height: 'auto' }).run()        }
      })
    }

    editorEl.addEventListener('drop', handleDrop)
    editorEl.addEventListener('paste', handlePaste)
    return () => {
      editorEl.removeEventListener('drop', handleDrop)
      editorEl.removeEventListener('paste', handlePaste)
    }
  }, [editor])

  // Quand on change de note, met à jour le contenu de l'éditeur.
  useEffect(() => {
    if (editor && note) {
      const currentContent = editor.getHTML()
      const newContent = note.content || ''
      if (currentContent !== newContent) {
        editor.commands.setContent(newContent)
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
  <div ref={editorRef} className="flex-1 flex flex-col">
    <div className="max-w-[59rem] mx-auto w-full flex flex-col gap-3">
      <Toolbox editor={editor} />
      <TableToolbar editor={editor} />
      <div className="flex-1 bg-white rounded-xl overflow-y-auto p-6">
        <EditorContent editor={editor} className="prose prose-sm max-w-none" />
      </div>
    </div>
  </div>
 )
}
