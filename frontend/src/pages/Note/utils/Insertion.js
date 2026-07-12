// ============================================
// Insertion.js — Fonctions d'insertion
// ============================================
// Contient toutes les fonctions pour insérer des éléments dans l'éditeur :
// tableaux, callouts, lignes de séparation, gestion des colonnes/lignes.
// Règle : TOUJOURS appeler editor.view.focus() AVANT d'insérer.
// Quand on clique dans le menu déroulant, le focus quitte l'éditeur.
// Sans focus explicite, les commandes TipTap échouent silencieusement.

// --- Tableaux ---

// Insère un tableau avec le nombre de lignes et colonnes choisi.
// La première ligne est un en-tête. Ajoute un paragraphe après
// pour pouvoir cliquer et écrire en dessous du tableau.
export function insertTable(editor, rows = 3, cols = 3) {
  if (!editor) return
  editor.view.focus()
  editor.chain().insertTable({ rows, cols, withHeaderRow: true }).run()
  const endPos = editor.state.doc.content.size
  editor.chain().insertContentAt(endPos, '<p></p>').run()
}

// Ajoute une colonne AVANT la colonne où est le curseur.
export function addColumnBefore(editor) {
  editor.chain().focus().addColumnBefore().run()
}

// Ajoute une colonne APRÈS la colonne où est le curseur.
export function addColumnAfter(editor) {
  editor.chain().focus().addColumnAfter().run()
}

// Supprime toute la colonne où se trouve le curseur.
export function deleteColumn(editor) {
  editor.chain().focus().deleteColumn().run()
}

// Ajoute une ligne AU-DESSUS de la ligne où est le curseur.
export function addRowBefore(editor) {
  editor.chain().focus().addRowBefore().run()
}

// Ajoute une ligne EN-DESSOUS de la ligne où est le curseur.
export function addRowAfter(editor) {
  editor.chain().focus().addRowAfter().run()
}

// Supprime toute la ligne où se trouve le curseur.
export function deleteRow(editor) {
  editor.chain().focus().deleteRow().run()
}

// Supprime le tableau entier autour du curseur.
export function deleteTable(editor) {
  editor.chain().focus().deleteTable().run()
}

// Fusionne les cellules sélectionnées en une seule grande cellule.
export function mergeCells(editor) {
  editor.chain().focus().mergeCells().run()
}

// Sépare une cellule fusionnée en cellules individuelles.
export function splitCell(editor) {
  editor.chain().focus().splitCell().run()
}

// Ajoute ou retire la ligne d'en-tête du tableau.
export function toggleHeaderRow(editor) {
  editor.chain().focus().toggleHeaderRow().run()
}

// --- Encadrés (Callouts) ---

// Insère un callout vide avec une icône et un type.
// Les couleurs viennent du thème (gérées par CalloutNode.jsx).
// Utilise une transaction ProseMirror brute pour contourner
// les problèmes de focus du système de commandes TipTap.
export function insertCallout(editor, type = 'info', icon = '💡') {
  if (!editor) return
  editor.view.focus()
  const { state, dispatch } = editor.view
  const calloutType = state.schema.nodes.callout
  if (!calloutType) {
    console.error('[Callout] Node type not in schema')
    return
  }
  const node = calloutType.create({ type, icon })
  dispatch(state.tr.insert(state.selection.from, node))
}

// --- Ligne de séparation ---

// Insère une ligne horizontale <hr> entre deux blocs.
export function insertHorizontalRule(editor) {
  editor.chain().focus().setHorizontalRule().run()
}
