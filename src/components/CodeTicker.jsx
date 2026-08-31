const ITEMS = [
  '</>',   '{ }',   '[ ]',   '( )',   '=>',
  'const', 'async', 'await', '.map()', '.filter()',
  'import', 'export', '&&', '||', '?.',
  'npm run build', 'git push', 'docker build',
  'JSON',  'REST API', 'SQL', 'HTTP',
  '200 OK', 'useState()', 'useEffect()', 'useRef()',
]

export default function CodeTicker() {
  const all = [...ITEMS, ...ITEMS]
  return (
    <div className="code-ticker" aria-hidden="true">
      <div className="code-ticker__track">
        {all.map((item, i) => (
          <span key={i} className="code-ticker__item">{item}</span>
        ))}
      </div>
    </div>
  )
}
