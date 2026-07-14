import { useState } from 'react'
import { ChevronRight, ChevronDown, Folder, FileText, FolderPlus, FilePlus } from 'lucide-react'

// Noeud récursif d'un dossier ou fichier dans l'arborescence des notes.
function DirectoryNode({ node, level, selectedId, onSelect, onAddSubdirectory, onAddNote }) {
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = node.children && node.children.length > 0
  const isSelected = selectedId === node.id

  return (
    <div>
      <div
        className="flex items-center gap-1 py-1 px-2 rounded-md cursor-pointer text-sm hover:bg-white/10 transition-colors"
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => {
          onSelect(node)
          setIsOpen(!isOpen)
        }}
      >
        {hasChildren ? (
          isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
        ) : (
          <span className="w-[14px]" />
        )}
        {node.type === 'directory' ? (
          <Folder size={16} style={{ color: isSelected ? '#ffffff' : '#9CA3AF' }} />
        ) : (
          <FileText size={16} style={{ color: isSelected ? '#ffffff' : '#9CA3AF' }} />
        )}
        <span className={`truncate ${isSelected ? 'text-white font-medium' : 'text-gray-300'}`}>
          {node.name}
        </span>
        {node.type === 'directory' && (
            <div className="ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                onClick={(e) => {
                    e.stopPropagation()
                    onAddSubdirectory(node.id)
                }}
                className="hover:text-white text-gray-400 transition-colors cursor-pointer"
                title="Add subdirectory"
                >
                <FolderPlus size={14} />
                </button>
                <button
                onClick={(e) => {
                    e.stopPropagation()
                    onAddNote(node.id)
                }}
                className="hover:text-white text-gray-400 transition-colors cursor-pointer"
                title="Add note"
                >
                <FilePlus size={14} />
                </button>
            </div>
            )}
      </div>

      {isOpen && hasChildren && (
        <div>
          {node.children.map((child) => (
            <DirectoryNode
              key={child.id}
              node={child}
              level={level + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              onAddSubdirectory={onAddSubdirectory}
              onAddNote={onAddNote}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Arborescence complète des dossiers et notes, rend chaque noeud racine récursivement.
export default function DirectoryTree({ data, selectedId, onSelect, onAddSubdirectory, onAddNote }) {
  return (
    <div className="group">
      {data.map((node) => (
        <DirectoryNode
          key={node.id}
          node={node}
          level={0}
          selectedId={selectedId}
          onSelect={onSelect}
          onAddSubdirectory={onAddSubdirectory}
           onAddNote={onAddNote}

        />
      ))}
    </div>
  )
}