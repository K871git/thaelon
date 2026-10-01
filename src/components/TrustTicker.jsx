const TRUST_ITEMS = [
  { text: 'Fixed price, every time',            accent: true  },
  { text: 'Reply within 24 hours',              accent: false },
  { text: '2 live products shipped',            accent: true  },
  { text: 'NDA ready on request',               accent: false },
  { text: 'No templates, no boilerplate',       accent: true  },
  { text: 'Free estimate — zero commitment',    accent: false },
  { text: 'Honest scope, fixed delivery',       accent: true  },
  { text: 'Every line written by the builder',  accent: false },
  { text: 'Open to founders & enterprises',     accent: false },
  { text: '8 engineering capabilities',         accent: true  },
  { text: 'No vanishing after launch',          accent: false },
  { text: 'Direct line — no middleman',         accent: true  },
]

export default function TrustTicker() {
  const all = [...TRUST_ITEMS, ...TRUST_ITEMS]
  return (
    <div className="trust-ticker" aria-hidden="true">
      <div className="trust-ticker__track">
        {all.map((item, i) => (
          <span key={i} className="trust-ticker__item">
            <span className={`trust-ticker__text${item.accent ? ' trust-ticker__text--accent' : ''}`}>
              {item.text}
            </span>
            <span className="trust-ticker__sep">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
