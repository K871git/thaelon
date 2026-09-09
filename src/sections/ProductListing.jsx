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
  saas: { label: 'SaaS', desc: 'Cloud · Subscription · Always up to date' },
  'on-premise': { label: 'On-Premise', desc: 'Install locally · You own the data · One-time setup' },
}

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
  </svg>
)

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

function VideoSlot({ src, productName }) {
  if (src) {
    return (
      <video className="products__video-player" src={src}
        controls muted playsInline preload="metadata"
        aria-label={`${productName} demo video`} />
    )
  }
  return (
    <div className="products__video-placeholder">
      <div className="products__video-placeholder-icon"><PlayIcon /></div>
      <span>Demo video coming soon</span>
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

      {/* ── DETAIL MODAL — all the real content lives here ── */}
      <Modal isOpen={!!modal} onClose={close} title={modal?.name} className="modal--product-detail">
        {modal && (() => {
          const meta = TYPE_META[modal.type]
          return (
            <div className="product-detail" data-color={modal.color}>

              {/* Header */}
              <div className="product-detail__header">
                <div className="product-detail__header-top">
                  <span className="products__type-badge">{meta.label}</span>
                  <span className="products__type-platform">{meta.desc}</span>
                  <span className={`projects__status projects__status--${modal.status}`}>{modal.status}</span>
                </div>
                <h2 className="product-detail__name">{modal.name}</h2>
                <p className="product-detail__tagline">{modal.tagline}</p>
              </div>

              {/* Demo video */}
              <div className="product-detail__section">
                <h4 className="product-detail__section-title"><PlayIcon /> Demo</h4>
                <div className="product-detail__video-wrap">
                  <VideoSlot src={modal.demo} productName={modal.name} />
                </div>
              </div>

              {/* Overview */}
              <div className="product-detail__section">
                <h4 className="product-detail__section-title"><DocIcon /> Overview</h4>
                <p className="product-detail__desc">{modal.description}</p>
              </div>

              {/* Features */}
              <div className="product-detail__section">
                <h4 className="product-detail__section-title">Key capabilities</h4>
                <ul className="product-detail__features">
                  {modal.features.map(f => <li key={f}>{f}</li>)}
                </ul>
              </div>

              {/* Resources */}
              <div className="product-detail__section">
                <h4 className="product-detail__section-title">Resources</h4>
                <div className="product-detail__resources">
                  {modal.type === 'saas' && (
                    modal.docs ? (
                      <a href={modal.docs} target="_blank" rel="noopener noreferrer"
                        className="product-detail__resource">
                        <DocIcon />
                        <div>
                          <strong>Documentation</strong>
                          <span>Setup guides, API reference, usage</span>
                        </div>
                        <ExternalIcon />
                      </a>
                    ) : (
                      <div className="product-detail__resource product-detail__resource--soon">
                        <DocIcon />
                        <div>
                          <strong>Documentation</strong>
                          {/* ← FILL: set docs URL in products.js */}
                          <span>Coming soon — setup guides and API reference</span>
                        </div>
                      </div>
                    )
                  )}

                  {modal.type === 'on-premise' && (<>
                    {modal.docs ? (
                      <a href={modal.docs} download className="product-detail__resource">
                        <DocIcon />
                        <div>
                          <strong>Setup Guide</strong>
                          <span>Installation, configuration, and usage manual</span>
                        </div>
                        <DownloadIcon />
                      </a>
                    ) : (
                      <div className="product-detail__resource product-detail__resource--soon">
                        <DocIcon />
                        <div>
                          <strong>Setup Guide</strong>
                          {/* ← FILL: set docs path in products.js */}
                          <span>Coming soon — installation and configuration manual</span>
                        </div>
                      </div>
                    )}

                    {modal.datasheet ? (
                      <a href={modal.datasheet} download className="product-detail__resource">
                        <DownloadIcon />
                        <div>
                          <strong>Datasheet</strong>
                          <span>Technical specs, requirements, and pricing overview</span>
                        </div>
                        <DownloadIcon />
                      </a>
                    ) : (
                      <div className="product-detail__resource product-detail__resource--soon">
                        <DownloadIcon />
                        <div>
                          <strong>Datasheet</strong>
                          {/* ← FILL: set datasheet path in products.js */}
                          <span>Coming soon — technical specs and pricing overview</span>
                        </div>
                      </div>
                    )}
                  </>)}
                </div>
              </div>

              {/* Tech stack */}
              <div className="product-detail__section">
                <h4 className="product-detail__section-title">Stack</h4>
                <ul className="product-detail__tech">
                  {modal.tech.map(t => <li key={t}>{t}</li>)}
                </ul>
              </div>

              {/* Primary action */}
              <div className="product-detail__footer">
                {modal.link ? (
                  <a href={modal.link} target="_blank" rel="noopener noreferrer"
                    className="project-modal__action-btn">
                    <ExternalIcon />
                    {modal.type === 'saas' ? `Try ${modal.name} free` : 'Visit live site'}
                  </a>
                ) : (
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
