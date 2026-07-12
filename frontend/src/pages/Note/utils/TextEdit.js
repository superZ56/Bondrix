// ============================================
// TextEdit.js — Fonctions de formatage texte
// ============================================
// Contient toutes les fonctions pour formater le texte dans l'éditeur :
// gras, italique, souligné, couleurs, polices, listes, etc.
// Chaque fonction prend l'instance editor de TipTap.

// --- Formatage de base ---

// Active ou désactive le GRAS sur la sélection.
export function toggleBold(editor) {
  editor.chain().focus().toggleBold().run()
}

// Active ou désactive l'ITALIQUE sur la sélection.
export function toggleItalic(editor) {
  editor.chain().focus().toggleItalic().run()
}

// Active ou désactive le SOULIGNÉ sur la sélection.
export function toggleUnderline(editor) {
  editor.chain().focus().toggleUnderline().run()
}

// Active ou désactive le BARRÉ sur la sélection.
export function toggleStrike(editor) {
  editor.chain().focus().toggleStrike().run()
}

// Active ou désactive le CODE INLINE sur la sélection.
export function toggleCode(editor) {
  editor.chain().focus().toggleCode().run()
}

// --- Headings ---

// Applique un titre (H1, H2, H3) au bloc courant.
export function setHeading(editor, level) {
  editor.chain().focus().toggleHeading({ level }).run()
}

// Repasse le bloc courant en paragraphe normal.
export function setParagraph(editor) {
  editor.chain().focus().setParagraph().run()
}

// --- Listes ---

// Active ou désactive une liste à puces (bullet list).
export function toggleBulletList(editor) {
  editor.chain().focus().toggleBulletList().run()
}

// Active ou désactive une liste numérotée (ordered list).
export function toggleOrderedList(editor) {
  editor.chain().focus().toggleOrderedList().run()
}

// Active ou désactive une liste de tâches (checkbox list).
export function toggleTaskList(editor) {
  editor.chain().focus().toggleTaskList().run()
}

// --- Alignement ---

// Change l'alignement du texte (left, center, right, justify).
export function setTextAlign(editor, alignment) {
  editor.chain().focus().setTextAlign(alignment).run()
}

// --- Couleurs ---

// Change la police de caractères du texte sélectionné.
export function setFontFamily(editor, fontFamily) {
  editor.chain().focus().setFontFamily(fontFamily).run()
}

// Change la couleur du texte sélectionné.
export function setTextColor(editor, color) {
  editor.chain().focus().setColor(color).run()
}

// Applique un surlignage coloré sur la sélection.
export function setHighlight(editor, color) {
  editor.chain().focus().toggleHighlight({ color }).run()
}

// Retire le surlignage de la sélection.
export function unsetHighlight(editor) {
  editor.chain().focus().unsetHighlight().run()
}

// --- Taille de texte ---

// Change la taille du texte. Si vide, remet la taille par défaut.
export function setFontSize(editor, size) {
  if (size === '') {
    editor.chain().focus().unsetFontSize().run()
  } else {
    editor.chain().focus().setFontSize(size).run()
  }
}

// --- Blocs ---

// Transforme le bloc en citation (blockquote).
export function setBlockquote(editor) {
  editor.chain().focus().toggleBlockquote().run()
}

// Insère une ligne horizontale entre deux blocs.
export function setHorizontalRule(editor) {
  editor.chain().focus().setHorizontalRule().run()
}

// Transforme le bloc en bloc de code (code block).
export function setCodeBlock(editor) {
  editor.chain().focus().toggleCodeBlock().run()
}

// --- Historique ---

// Annule la dernière action.
export function undo(editor) {
  editor.chain().focus().undo().run()
}

// Rétablit la dernière action annulée.
export function redo(editor) {
  editor.chain().focus().redo().run()
}

// --- Réinitialisation ---

// Supprime tout le formatage (couleurs, polices, taille, highlight)
// et remet le bloc en paragraphe normal.
export function clearMarks(editor) {
  editor.chain().focus().unsetColor().run()
  editor.chain().focus().unsetFontFamily().run()
  editor.chain().focus().unsetFontSize().run()
  editor.chain().focus().unsetHighlight().run()
  editor.chain().focus().clearNodes().run()
}
