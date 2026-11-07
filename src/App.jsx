import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { useReveal } from './hooks/useReveal'
import { useHeroIntro } from './hooks/useHeroIntro'
import { profile, nav, stack } from './data'
import Footer from './Footer'

// blur-to-sharp reveal for the portrait (runs once per page load)
function focusIn(el) {
  if (el.dataset.focused) return
  el.dataset.focused = '1'
  gsap.fromTo(
    el,
    { filter: 'blur(28px)', scale: 1.12, autoAlpha: 0.6 },
    { filter: 'blur(0px)', scale: 1, autoAlpha: 1, duration: 3, delay: 0.4, ease: 'power2.out' },
  )
}

function Chars({ text }) {
  return (
    <span aria-label={text}>
      {text.split('').map((c, i) => (
        <span className="hero__mask" aria-hidden="true" key={i}>
          <span className="hero__char">{c === ' ' ? ' ' : c}</span>
        </span>
      ))}
    </span>
  )
}

function Section({ id, n, title, children }) {
  return (
    <section id={id} className="section">
      <div className="section__head" data-reveal-group>
        <span className="mono" data-reveal>{n}</span>
        <h2 data-reveal>{title}</h2>
      </div>
      <div className="section__line" data-line />
      <div className="section__body">{children}</div>
    </section>
  )
}

export default function App() {
  const root = useReveal()
  const heroRef = useHeroIntro()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <div ref={root}>
      <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
        <a href="#hero" className="header__logo">VE<span>.</span></a>
        <nav className="header__nav" aria-label="Primary">
          {nav.map((l) => (
            <a key={l.id} href={`#${l.id}`}>{l.label}</a>
          ))}
        </nav>
        <a className="pill" href={profile.resume} target="_blank" rel="noreferrer">Resume</a>
      </header>

      <main>
        <section id="hero" className="hero" ref={heroRef}>
          <div className="hero__orb" aria-hidden="true" />
          <figure className="portrait" aria-label="Portrait of Vince Dorell F. Esmero">
            <div className="portrait__frame">
              <span className="portrait__ph mono" aria-hidden="true">VE</span>
              <img
                className="portrait__img"
                src="/profile.jpg?v=2"
                ref={(el) => { if (el?.complete && el.naturalWidth) focusIn(el) }}
                onLoad={(e) => focusIn(e.currentTarget)}
                alt={profile.name}
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
            <i className="portrait__c portrait__c--tl" /><i className="portrait__c portrait__c--tr" />
            <i className="portrait__c portrait__c--bl" /><i className="portrait__c portrait__c--br" />
            <figcaption className="mono">Fig. 01 / Vince</figcaption>
          </figure>
          <p className="mono hero__kicker">Digital Portfolio / 2026</p>
          <h1 className="hero__title">
            <span className="hero__line"><Chars text="Vince Dorell" /></span>
            <span className="hero__line hero__line--indent"><Chars text="F. Esmero" /></span>
          </h1>
          <div className="hero__meta">
            <p>{profile.role}</p>
            <p>{profile.school}</p>
            <a className="mono hero__scroll" href="#about">Scroll &darr;</a>
          </div>
        </section>

        <Section id="about" n="01" title="About">
          <div data-reveal-group>
            <p className="lead" data-reveal>
              A third-year IT student who likes turning ideas into things that work in the browser, from clean interfaces to the logic behind them.
            </p>
          </div>
        </Section>

        <Section id="education" n="02" title="Education">
          <div className="timeline" data-reveal-group>
            <div className="row" data-reveal>
              <span className="mono muted">Elementary to College</span>
              <h3>{profile.school}</h3>
            </div>
            <div className="row" data-reveal>
              <span className="mono muted">Present</span>
              <h3>BSIT, 3rd year</h3>
            </div>
          </div>
        </Section>

        <Section id="skills" n="03" title="Skills">
          <div className="stack" data-reveal-group>
            {stack.map((g) => (
              <div className="stack__group" key={g.title} data-reveal>
                <p className="mono stack__title">{g.title}</p>
                <ul>
                  {g.items.map((i) => (
                    <li className="chip mono" key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="projects" n="04" title="Projects">
          <article className="card" data-reveal-group>
            <span className="mono muted" data-reveal>Capstone proposal</span>
            <h3 data-reveal>CommunityVoice</h3>
            <p data-reveal>A complaint management system that gives a community a clear, trackable way to be heard.</p>
          </article>
        </Section>

        <Section id="certifications" n="05" title="Certifications">
          <div className="card" data-reveal-group>
            <span className="mono muted" data-reveal>Beginner</span>
            <h3 data-reveal>Cisco Packet Tracer</h3>
            <p data-reveal>Certificate of completion.</p>
          </div>
        </Section>

        <Section id="contact" n="06" title="Contact">
          <div data-reveal-group>
            <a className="cta" href={`mailto:${profile.email}`} data-reveal>{profile.email}</a>
            <p data-reveal>
              <a className="mono link" href={profile.github} target="_blank" rel="noreferrer">{profile.githubLabel} &nearr;</a>
            </p>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  )
}
