import { useEffect, useState } from 'react'
import { profile, nav } from './data'

function useManilaTime() {
  const [t, setT] = useState('')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    })
    const tick = () => setT(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return t
}

export default function Footer() {
  const time = useManilaTime()

  return (
    <footer className="foot">
      <div className="foot__glow" aria-hidden="true" />

      <div className="foot__top" data-reveal-group>
        <p className="foot__say" data-reveal>
          Let&rsquo;s build something<br />worth scrolling for.
        </p>
        <a className="foot__mail" href={`mailto:${profile.email}`} data-reveal>
          Say hello <span aria-hidden="true">&nearr;</span>
        </a>
      </div>

      <div className="foot__grid" data-reveal-group>
        <div data-reveal>
          <p className="mono muted">Index</p>
          <ul>
            {nav.map((l) => (
              <li key={l.id}><a href={`#${l.id}`}>{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div data-reveal>
          <p className="mono muted">Elsewhere</p>
          <ul>
            <li><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href={`mailto:${profile.email}`}>Email</a></li>
            <li><a href={profile.resume} target="_blank" rel="noreferrer">Resume</a></li>
          </ul>
        </div>
        <div data-reveal>
          <p className="mono muted">Signal</p>
          <p className="foot__status mono"><i aria-hidden="true" /> Open to opportunities</p>
          <p className="foot__clock mono">{time} PHT</p>
          <p className="mono muted">Iloilo, Philippines</p>
        </div>
      </div>

      <div className="foot__mark" aria-hidden="true" data-reveal>ESMERO</div>

      <div className="foot__base mono">
        <span className="muted">&copy; 2026 {profile.name}</span>
        <a href="#hero">Back to top &uarr;</a>
      </div>
    </footer>
  )
}
