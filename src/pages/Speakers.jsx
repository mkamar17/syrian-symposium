import { useEffect, useRef, useState } from 'react'
import { client, urlFor } from '../sanityClient'
import { SPEAKERS_QUERY } from '../queries'
import '../styles/speakers.css'

export default function Speakers() {
  const [speakers, setSpeakers] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)

  const ref = useRef(null)

  // =========================================
  // FETCH SPEAKERS FROM SANITY
  // =========================================

  useEffect(() => {
    let cancelled = false

    client
      .fetch(SPEAKERS_QUERY)
      .then((data) => {
        if (!cancelled) {
          setSpeakers(data || [])
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message)
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  // =========================================
  // SCROLL VISIBILITY OBSERVER
  // =========================================

  useEffect(() => {
    if (loading || speakers.length === 0 || !ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [loading, speakers.length])

  // =========================================
  // LOADING / ERROR / EMPTY STATES
  // =========================================

  if (loading) return null

  if (error) {
    return <p className="speakers-error">Error: {error}</p>
  }

  if (speakers.length === 0) {
    return (
      <section id="speakers" className="speakers speakers-empty">
        <p className="speakers-tbc">TBC</p>
      </section>
    )
  }

  // =========================================
  // SPEAKERS GRID
  // =========================================

  return (
    <section
      ref={ref}
      id="speakers"
      className={`speakers ${visible ? 'is-visible' : ''}`}
    >
      <div className="speakers-grid">
        {speakers.map((speaker, i) => (
          <article
            key={speaker._id}
            className="speaker"
            style={{ animationDelay: `${0.2 + i * 0.08}s` }}
          >
            {speaker.photo && (
              <img
                className="speaker-photo"
                src={urlFor(speaker.photo)
                  .width(200)
                  .height(200)
                  .fit('crop')
                  .url()}
                alt={speaker.name}
                loading="lazy"
              />
            )}

            <div className="speaker-info">
              <h3 className="speaker-name">
                {speaker.name}
              </h3>

              {speaker.role && (
                <p className="speaker-role">
                  {speaker.role}
                </p>
              )}

              {speaker.bio && (
                <p className="speaker-bio">
                  {speaker.bio}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}