import { useEffect, useCallback, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const ANIM_MS = 230

export default function Modal({ isOpen, onClose, title, children, className }) {
  const closeRef = useRef(null)
  const timerRef = useRef(null)
  const [closing, setClosing] = useState(false)

  const startClose = useCallback(() => {
    if (closing) return
    setClosing(true)
    timerRef.current = setTimeout(() => {
      setClosing(false)
      onClose()
    }, ANIM_MS)
  }, [closing, onClose])

  const handleKey = useCallback(e => {
    if (e.key === 'Escape') startClose()
  }, [startClose])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  useEffect(() => {
    if (!isOpen) return
    document.addEventListener('keydown', handleKey)

    const sbW = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (sbW > 0) document.body.style.paddingRight = `${sbW}px`

    closeRef.current?.focus({ preventScroll: true })

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isOpen, handleKey])

  if (!isOpen && !closing) return null

  return createPortal(
    <div
      className={`modal-backdrop${closing ? ' modal-backdrop--out' : ''}`}
      onClick={startClose}
      role="presentation"
    >
      <div
        className={`modal${closing ? ' modal--out' : ''}${className ? ` ${className}` : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={e => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          className="modal__close"
          onClick={startClose}
          aria-label="Close dialog"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.body
  )
}
