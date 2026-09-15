import { useState, useCallback } from 'react'
import products from '../data/products'
import Modal from '../components/Modal'

const PRODUCT_ICONS = {
  KareerOS: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2.5 6 4 6 4s6-1.5 6-4v-5" />
    </svg>
  ),
  Clinora: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  ),
}

const TYPE_META = {
  saas:         { label: 'SaaS',        desc: 'Cloud · Subscription · Always up to date' },
  'on-premise': { label: 'On-Premise',  desc: 'Self-hosted · Data stays local · No cloud' },
}

const PLATFORM_ICONS = {
  Web: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Desktop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
}

const DocIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="13" y2="17" />
  </svg>
)

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

function PlatformBadges({ platforms }) {
  if (!platforms?.length) return null
  return (
    <div className="products__platform-badges">
      {platforms.map(p => (
        <span key={p} className="products__platform-badge">
          {PLATFORM_ICONS[p]}
          {p}
        </span>
      ))}
    </div>
  )
}

export default function ProductListing() {
  const [modal, setModal] = useState(null)
  const close = useCallback(() => setModal(null), [])

  return (
    <section className="section" id="products" aria-labelledby="products-heading">
      <div className="container">
        <span className="section-label reveal">Products</span>
        <h2 className="section-heading reveal" id="products-heading">What we've built</h2>
        <p className="section-desc reveal" style={{ '--reveal-delay': '0.05s' }}>
          SaaS platforms and installable products — built by Thaelon, ready to deploy.
        </p>

        <div className="products__grid">
          {products.map((p, i) => {
            const meta = TYPE_META[p.type]
            return (
              <article
                key={p.name}
                className="products__item reveal"
                data-color={p.color}
                style={{ '--reveal-delay': `${i * 0.1}s` }}
                role="button"
                tabIndex={0}
                aria-label={`Explore ${p.name}`}
                onClick={() => setModal(p)}
                onKeyDown={e => e.key === 'Enter' && setModal(p)}
              >
                <span className="products__item-num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {PRODUCT_ICONS[p.name] && (
                  <div className="products__icon-area">
                    {PRODUCT_ICONS[p.name]}
                  </div>
                )}

                <div className="products__item-badges">
                  <span className="products__type-badge">{meta.label}</span>
                  <span className={`projects__status projects__status--${p.status}`}>{p.status}</span>
                </div>

                <PlatformBadges platforms={p.platforms} />

                <h3 className="products__name">{p.name}</h3>
                <p className="products__tagline">{p.tagline}</p>

                <ul className="products__tech-strip">
                  {p.tech.slice(0, 3).map(t => <li key={t}>{t}</li>)}
                  {p.tech.length > 3 && (
                    <li className="products__tech-more">+{p.tech.length - 3}</li>
                  )}
                </ul>

                <div className="products__item-footer">
                  <span className="products__explore-cta">
                    Explore <ArrowIcon />
                  </span>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {/* ── DETAIL MODAL ── */}
      <Modal isOpen={!!modal} onClose={close} title={modal?.name} className="modal--product-detail">
        {modal && (() => {
          const meta = TYPE_META[modal.type]
          return (
            <div className="product-detail" data-color={modal.color}>

              {/* Header */}
              <div className="product-detail__header">
                <div className="product-detail__header-top">
                  <span className="products__type-badge">{meta.label}</span>
                  <span className={`projects__status projects__status--${modal.status}`}>{modal.status}</span>
                </div>
                <h2 className="product-detail__name">{modal.name}</h2>
                <p className="product-detail__tagline">{modal.tagline}</p>
                <PlatformBadges platforms={modal.platforms} />
              </div>

              {/* Overview */}
              <div className="product-detail__section">
                <h4 className="product-detail__section-title"><DocIcon /> Overview</h4>
                {modal.description.split('\n\n').map((para, i) => (
                  <p key={i} className="product-detail__desc">{para}</p>
                ))}
              </div>

              {/* Features */}
              <div className="product-detail__section">
                <h4 className="product-detail__section-title">Key capabilities</h4>
                <ul className="product-detail__features">
                  {modal.features.map(f => <li key={f}>{f}</li>)}
                </ul>
              </div>

              {/* Resources */}
              {(modal.docs || modal.datasheet) && (
                <div className="product-detail__section">
                  <h4 className="product-detail__section-title">Resources</h4>
                  <div className="product-detail__resources">
                    {modal.docs && (
                      <a href={modal.docs} target="_blank" rel="noopener noreferrer"
                        className="product-detail__resource">
                        <DocIcon />
                        <div>
                          <strong>Documentation</strong>
                          <span>Setup guides, API reference, usage manual</span>
                        </div>
                        <ExternalIcon />
                      </a>
                    )}
                    {modal.datasheet && (
                      <a href={modal.datasheet} download className="product-detail__resource">
                        <DownloadIcon />
                        <div>
                          <strong>Datasheet</strong>
                          <span>Technical specs, requirements, and feature overview</span>
                        </div>
                        <DownloadIcon />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Tech stack */}
              <div className="product-detail__section">
                <h4 className="product-detail__section-title">Stack</h4>
                <ul className="product-detail__tech">
                  {modal.tech.map(t => <li key={t}>{t}</li>)}
                </ul>
              </div>

              {/* Primary actions */}
              <div className="product-detail__footer">
                {modal.link && (
                  <a href={modal.link} target="_blank" rel="noopener noreferrer"
                    className="project-modal__action-btn">
                    <ExternalIcon />
                    {modal.type === 'saas' ? `Try ${modal.name}` : 'Open Web App'}
                  </a>
                )}
                {modal.download && (
                  <a href={modal.download} className="project-modal__action-btn project-modal__action-btn--secondary">
                    <DownloadIcon />
                    Download Desktop App
                  </a>
                )}
                {!modal.link && !modal.download && (
                  <a href="#contact" onClick={close} className="project-modal__action-btn">
                    Contact us about {modal.name} →
                  </a>
                )}
              </div>

            </div>
          )
        })()}
      </Modal>
    </section>
  )
}
