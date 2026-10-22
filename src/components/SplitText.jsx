import { useEffect, useRef, useState, Fragment, isValidElement } from 'react'

export default function SplitText({ as: Tag = 'h2', children, className = '', id, style }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect() } },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  let wi = 0
  const renderNodes = (nodes) =>
    (Array.isArray(nodes) ? nodes : [nodes]).flatMap((node, ni) => {
      if (typeof node === 'string') {
        const words = node.trim().split(/\s+/).filter(Boolean)
        if (!words.length) return []
        return words.map((word, j) => {
          const idx = wi++
          return (
            <Fragment key={`w-${ni}-${j}`}>
              <span className="sw" style={{ '--wi': idx }}>{word}</span>
              {j < words.length - 1 ? ' ' : ''}
            </Fragment>
          )
        })
      }
      if (isValidElement(node) && node.type === 'br') {
        return [<br key={`br-${ni}`} />]
      }
      return []
    })

  return (
    <Tag
      ref={ref}
      id={id}
      style={style}
      className={`split-text${visible ? ' split-text--on' : ''}${className ? ` ${className}` : ''}`}
    >
      {renderNodes(children)}
    </Tag>
  )
}
