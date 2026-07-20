import Image from '@tiptap/extension-image'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { NodeViewWrapper } from '@tiptap/react'
import { useState, useRef, useCallback, useEffect } from 'react'

function ImageComponent({ node, updateAttributes, deleteNode, editor, getPos }) {
  const [selected, setSelected] = useState(false)
  const [resizing, setResizing] = useState(false)
  const wrapperRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSelected(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Resize
  const handleResizeStart = useCallback((e, dir) => {
    e.preventDefault()
    e.stopPropagation()
    const img = imgRef.current
    const startX = e.clientX
    const startY = e.clientY
    const startW = img?.offsetWidth || 300
    const startH = img?.offsetHeight || 200

    function onMove(ev) {
      const dx = ev.clientX - startX
      const dy = ev.clientY - startY
      let newW = startW
      let newH = startH
      if (dir.includes('right')) newW = Math.max(80, startW + dx)
      if (dir.includes('left')) newW = Math.max(80, startW - dx)
      if (dir.includes('bottom')) newH = Math.max(60, startH + dy)
      if (dir.includes('top')) newH = Math.max(60, startH - dy)
      updateAttributes({ width: newW, height: newH })
    }

    function onUp() {
      setResizing(false)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }

    setResizing(true)
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }, [updateAttributes])

  // Deplacer l'image dans le document en la tirant
  const handleDragStart = useCallback((e) => {
    if (resizing) return
    if (!selected) return
    e.preventDefault()
    e.stopPropagation()

    const startY = e.clientY
    let lastStep = 0

    function onMove(ev) {
      const dy = ev.clientY - startY
      const step = Math.floor(dy / 30)
      if (step !== lastStep) {
        const dir = step > lastStep ? 'down' : 'up'
        lastStep = step
        moveNode(dir)
      }
    }

    function onUp() {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }, [resizing, selected, getPos, editor])

  function moveNode(direction) {
    if (!editor || typeof getPos !== 'function') return
    const pos = getPos()
    if (typeof pos !== 'number') return

    editor.chain().command(({ tr, state }) => {
      const $pos = state.doc.resolve(pos)
      const depth = $pos.depth
      const parent = $pos.node(depth)
      const index = $pos.index(depth)
      const node = $pos.nodeAfter
      if (!node) return false

      const nodeSize = node.nodeSize

      if (direction === 'up' && index > 0) {
        const prevNode = parent.child(index - 1)
        const prevSize = prevNode.nodeSize
        tr.replaceWith(pos - prevSize, pos + nodeSize, [node, prevNode])
        return true
      }

      if (direction === 'down' && index < parent.childCount - 1) {
        const nextNode = parent.child(index + 1)
        const nextSize = nextNode.nodeSize
        tr.replaceWith(pos, pos + nodeSize + nextSize, [nextNode, node])
        return true
      }

      return false
    }).run()
  }

  const resizeHandles = ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right']

  const resizeHandleStyles = {
    top:            { top: -6, left: '50%', transform: 'translateX(-50%)', cursor: 'ns-resize' },
    bottom:         { bottom: -6, left: '50%', transform: 'translateX(-50%)', cursor: 'ns-resize' },
    left:           { left: -6, top: '50%', transform: 'translateY(-50%)', cursor: 'ew-resize' },
    right:          { right: -6, top: '50%', transform: 'translateY(-50%)', cursor: 'ew-resize' },
    'top-left':     { top: -6, left: -6, cursor: 'nwse-resize' },
    'top-right':    { top: -6, right: -6, cursor: 'nesw-resize' },
    'bottom-left':  { bottom: -6, left: -6, cursor: 'nesw-resize' },
    'bottom-right': { bottom: -6, right: -6, cursor: 'nwse-resize' },
  }

  return (
    <NodeViewWrapper
      ref={wrapperRef}
      as="div"
      style={{
        position: 'relative',
        display: 'inline-block',
        width: 'fit-content',
        maxWidth: '100%',
        outline: selected ? '2px solid #3B82F6' : 'none',
        outlineOffset: 2,
        borderRadius: 4,
        transition: 'outline 0.15s',
        cursor: selected ? 'grab' : 'default',
      }}
      onClick={(e) => { e.stopPropagation(); setSelected(true) }}
    >
      <img
        ref={imgRef}
        src={node.attrs.src}
        alt={node.attrs.alt || ''}
        style={{
          width: node.attrs.width || '100%',
          height: node.attrs.height || 'auto',
          display: 'block',
          borderRadius: 4,
          userSelect: 'none',
          pointerEvents: resizing ? 'none' : 'auto',
        }}
        draggable={false}
        onMouseDown={handleDragStart}
      />

      {selected && resizeHandles.map((dir) => (
        <div
          key={dir}
          onMouseDown={(e) => handleResizeStart(e, dir)}
          style={{
            position: 'absolute',
            width: 12,
            height: 12,
            backgroundColor: '#3B82F6',
            border: '2px solid white',
            borderRadius: '50%',
            zIndex: 10,
            ...resizeHandleStyles[dir],
          }}
        />
      ))}
    </NodeViewWrapper>
  )
}

const CustomImage = Image.extend({
  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      width: { default: '100%' },
      height: { default: 'auto' },
    }
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageComponent)
  },
})

export default CustomImage
