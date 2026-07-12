// FontSelect.jsx — Sélecteur de police de caractères.
// Dropdown avec 70+ polices (système + Google Fonts).
// Affiche chaque police dans son propre style.

import { setFontFamily } from '../../utils/TextEdit'

const fonts = [
  // Polices système Windows
  'Arial',
  'Courier New',
  'Georgia',
  'Times New Roman',
  'Verdana',
  'Helvetica',
  'Trebuchet MS',
  'Impact',
  'Comic Sans MS',
  'Consolas',
  'Tahoma',
  'Cambria',
  'Calibri',
  'Segoe UI',
  'Palatino Linotype',
  'Book Antiqua',
  'Franklin Gothic Medium',
  'Century Gothic',
  // Google Fonts
  'Roboto',
  'Lato',
  'Poppins',
  'Nunito',
  'Raleway',
  'Montserrat',
  'Open Sans',
  'Oswald',
  'Source Sans 3',
  'Quicksand',
  'Playfair Display',
  'Merriweather',
  'Ubuntu',
  'Fira Code',
  'Pacifico',
  'Caveat',
  'Dancing Script',
  'Indie Flower',
  'Lobster',
  'Luckiest Guy',
  'Satisfy',
  'Great Vibes',
  'Abril Fatface',
  'Bebas Neue',
  'Righteous',
  'Fredoka One',
  'Comfortaa',
  'Josefin Sans',
  'Barlow',
  'Rubik',
  'Work Sans',
  'Manrope',
  'Outfit',
  'Space Grotesk',
  'Sora',
  'DM Sans',
  'Inter',
  'Lexend',
  'Red Hat Display',
  'Archivo',
  'IBM Plex Sans',
  'Noto Sans',
  'Pt Sans',
  'Libre Franklin',
  'Cabin',
  'Exo 2',
  'Titillium Web',
  'Pathway Extreme',
  'Urbanist',
  'General Sans',
]

// Affiche un dropdown avec la liste des polices disponibles.
export default function FontSelect({ editor }) {
  if (!editor) return null

  return (
    <select
      value={editor.getAttributes('textStyle').fontFamily || ''}
      onChange={(e) => setFontFamily(editor, e.target.value)}
      className="text-xs px-2 py-1 rounded border border-gray-300 bg-white cursor-pointer outline-none"
    >
      <option value="">Default</option>
      {fonts.map((font) => (
        <option key={font} value={font} style={{ fontFamily: font }}>
          {font}
        </option>
      ))}
    </select>
  )
}
