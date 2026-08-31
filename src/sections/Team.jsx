import team from '../data/team'

export default function Team() {
  return (
    <section className="section" id="team" aria-labelledby="team-heading">
      <div className="container">
        <span className="section-label">Team</span>
        <h2 className="section-heading" id="team-heading">The people behind the work</h2>
        <p className="section-desc">Small team. High standards.</p>

        {team.length === 0 ? (
          <div className="team__empty">
            <p>Team members will be introduced here.</p>
          </div>
        ) : (
          <div className="team__grid">
            {team.map(m => (
              <article className="team__card" key={m.name}>
                <div className="team__avatar" aria-hidden="true">{m.name[0]}</div>
                <h3>{m.name}</h3>
                <p className="team__role">{m.role}</p>
                <p className="team__bio">{m.bio}</p>
                <div className="team__links">
                  {m.github && (
                    <a href={m.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                  )}
                  {m.linkedin && (
                    <a href={m.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
