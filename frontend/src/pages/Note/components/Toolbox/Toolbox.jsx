// Toolbox.jsx — Barre d'outils principale de l'éditeur.
// Assemble tous les composants d'outils : annuler/refaire, titres,
// insertion, polices, formatage, couleurs, alignement, listes, blocs.
// Chaque outil est séparé par un trait vertical.

import HeadingSelect from './HeadingSelect'
import FormatButtons from './FormatButtons'
import FontSelect from './FontSelect'
import FontSizeSelect from './FontSizeSelect'
import TextColorPicker from './TextColorPicker'
import HighlightPicker from './HighlightPicker'
import AlignButtons from './AlignButtons'
import ListButtons from './ListButtons'
import BlockButtons from './BlockButtons'
import UndoRedoButtons from './UndoRedoButtons'
import InsertMenu from '../Insertion/InsertMenu'

// Trait vertical de séparation entre les groupes d'outils.
function Separator() {
  return <div className="w-px h-6 bg-gray-300 mx-1" />
}

// Affiche la barre d'outils complète de l'éditeur.
// editor = instance TipTap passée à chaque sous-composant.
export default function Toolbox({ editor }) {
  if (!editor) return null

  return (
    <div className="flex items-center gap-0.5 px-4 py-2 border-b border-gray-200 bg-white flex-wrap">
      <UndoRedoButtons editor={editor} />
      <Separator />
      <HeadingSelect editor={editor} />
      <Separator />
      <InsertMenu editor={editor} />
      <Separator />
      <FontSelect editor={editor} />
      <FontSizeSelect editor={editor} />
      <Separator />
      <FormatButtons editor={editor} />
      <Separator />
      <TextColorPicker editor={editor} />
      <HighlightPicker editor={editor} />
      <Separator />
      <AlignButtons editor={editor} />
      <Separator />
      <ListButtons editor={editor} />
      <Separator />
      <BlockButtons editor={editor} />
    </div>
  )
}
