import { Link, useParams } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { works, profile } from '../data'
import Footer from '../Footer'

export default function Work() {
  const root = useReveal()
  const { slug } = useParams()
  const i = works.findIndex((w) => w.slug === slug)
  const work = works[i]

  if (!work) {
    return (
      <div className="wk wk--missing">
        <p className="mono muted">404</p>
        <h1>Work not found</h1>
        <Link className="pill" to="/#projects">Back to projects</Link>
      </div>
    )
  }
  const next = works[(i + 1) % works.length]

  return (
    <div ref={root} key={work.slug}>
      <header className="header is-scrolled">
        <Link to="/" className="header__logo">VE<span>.</span></Link>
        <Link className="pill" to="/#projects">&larr; All works</Link>
      </header>

      <main className="wk">
        <p className="mono wk__crumb" data-reveal-group><span data-reveal>Coursework / {work.n}</span></p>
        <h1 className="wk__title" data-reveal-group><span data-reveal>{work.title}</span></h1>
        <div className="wk__cover" data-reveal aria-hidden="true"><span className="mono">Cover image placeholder</span></div>

        <div className="wk__meta" data-reveal-group>
          <div data-reveal><p className="mono muted">Term</p><p>{work.title}</p></div>
          <div data-reveal><p className="mono muted">Role</p><p>Placeholder</p></div>
          <div data-reveal><p className="mono muted">Stack</p><p>Placeholder</p></div>
          <div data-reveal><p className="mono muted">Author</p><p>{profile.name}</p></div>
        </div>

        <section className="wk__block" data-reveal-group>
          <h2 data-reveal>Overview</h2>
          <p data-reveal>Placeholder: describe what this {work.title.toLowerCase()} project is about, what problem it solves and what you learned.</p>
        </section>

        <section className="wk__block" data-reveal-group>
          <h2 data-reveal>Screens</h2>
          <div className="wk__shots">
            {[1, 2].map((n) => (
              <div className="wk__shot" key={n} data-reveal aria-hidden="true"><span className="mono">Screenshot {n}</span></div>
            ))}
          </div>
        </section>

        <nav className="wk__next" data-reveal-group aria-label="Next work">
          <Link to={`/works/${next.slug}`} data-reveal>
            <span className="mono muted">Next</span>
            <strong>{next.title} &rarr;</strong>
          </Link>
        </nav>
      </main>

      <Footer />
    </div>
  )
}
