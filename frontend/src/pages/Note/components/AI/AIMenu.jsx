import { useState, useRef, useEffect } from 'react'
import { Bot, Sparkles } from 'lucide-react'
import { summarizeNote } from '../../../../services/aiService'
import BubbleAI from '../../../../components/BubbleAI'

const aiActions = [
  { id: 'summarize', label: 'Summarize', icon: <Sparkles size={16} /> },
]

export default function AIMenu({ editor }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function handleAction(actionId) {
    if (!editor) return

    if (actionId === 'summarize') {
      setLoading(true)
      setOpen(false)
      try {
        const html = editor.getHTML()
        const div = document.createElement('div')
        div.innerHTML = html
        const plainText = div.textContent || div.innerText || ''
        const summary = await summarizeNote(plainText)
        setResult(summary)
      } catch (error) {
        console.error('Erreur IA:', error.message)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <>
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          disabled={loading}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-200 transition-colors cursor-pointer text-gray-600"
          title="AI"
        >
          <Bot size={16} className={loading ? 'animate-pulse' : ''} />
          {!loading && <span className="text-xs font-medium">AI</span>}
          {loading && <span className="text-xs font-medium">...</span>}
        </button>

        {open && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[180px] py-1">
            {aiActions.map((item) => (
              <button
                key={item.id}
                onClick={() => handleAction(item.id)}
                disabled={loading}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors disabled:opacity-50"
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bubble IA */}
      {result && (
        <div className="fixed bottom-6 right-6 z-50">
          <BubbleAI
            title="Résumé"
            content={result}
            onClose={() => setResult(null)}
          />
        </div>
      )}
    </>
  )
}