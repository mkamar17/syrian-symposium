
import { useEffect, useRef, useState } from 'react'
import { client, urlFor } from '../sanityClient'
import { SPEAKERS_QUERY } from '../queries'
import '../styles/speakers.css'

export default function Speakers() {
  const [speakers, setSpeakers] = useState([])
  const [error, setError] = useState(null)
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    let cancelled = false

    client
      .fetch(SPEAKERS_QUERY)
      .then((data) => {
        if (!cancelled) setSpeakers(data || [])
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!ref.current) return

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
  }, [speakers.length])

  if (error) return <p>Error: {error}</p>
  if (speakers.length === 0) return null

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
              <h3 className="speaker-name">{speaker.name}</h3>

              {speaker.role && (
                <p className="speaker-role">{speaker.role}</p>
              )}

              {speaker.bio && (
                <p className="speaker-bio">{speaker.bio}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
