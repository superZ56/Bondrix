import { useState, useRef, useCallback } from 'react'
import { X, Copy, Check, GripHorizontal } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

// Composant réutilisable d'affichage de contenu IA
// Props : title (string), content (string), onClose (function)
// Glissable en maintenant le header

export default function BubbleAI({ title = 'Résultat', content = '', onClose }) {
  const { colors } = useTheme()
  const [copied, setCopied] = useState(false)
  const [position, setPosition] = useState({ x: window.innerWidth - 550, y: window.innerHeight - 420 })
  const [dragging, setDragging] = useState(false)
  const dragOffset = useRef({ x: 0, y: 0 })

  const handleMouseDown = useCallback((e) => {
    if (e.target.closest('button')) return
    setDragging(true)
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    }
  }, [position])

  const handleMouseMove = useCallback((e) => {
    if (!dragging) return
    setPosition({
      x: e.clientX - dragOffset.current.x,
      y: e.clientY - dragOffset.current.y,
    })
  }, [dragging])

  const handleMouseUp = useCallback(() => {
    setDragging(false)
  }, [])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      console.error('Erreur lors de la copie')
    }
  }

  return (
    <>
      {dragging && (
        <div className="fixed inset-0 z-40 cursor-grabbing" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} />
      )}
      <div
        className="fixed z-50 w-full max-w-lg select-none"
        style={{ left: position.x, top: position.y }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div
          className="rounded-2xl shadow-lg overflow-hidden"
          style={{ backgroundColor: colors.secondary }}
        >
          {/* Top bar — drag handle */}
          <div
            className="flex items-center justify-between px-4 py-2.5 cursor-grab active:cursor-grabbing"
            style={{ backgroundColor: colors.secondary }}
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center gap-2 pr-2 overflow-hidden">
              <GripHorizontal size={14} className="text-white/40 shrink-0" />
              <span className="text-sm font-semibold text-white truncate">
                {title}
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                title="Copier"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-white/10 transition-all cursor-pointer"
                title="Fermer"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Content area */}
          <div
            className="rounded-b-2xl px-5 py-4 overflow-y-auto max-h-[60vh]"
            style={{ backgroundColor: colors.third }}
          >
            <div className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: '#1F2937' }}>
              {content || 'Chargement...'}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}