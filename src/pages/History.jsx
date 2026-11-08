
import { useEffect, useRef, useState } from 'react'
import { client, urlFor } from '../sanityClient'
import { HISTORY_QUERY, PAST_EVENTS_QUERY } from '../queries'
import Reveal from '../components/Reveal'
import '../styles/history.css'
import PastEventsSlideshow from '../components/PastEventsSlideshow'

export default function History() {
  const [history, setHistory] = useState(null)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const pastEventsRef = useRef(null)
  const [pastEventsFade, setPastEventsFade] = useState(0)

  useEffect(() => {
    let frame = null

    const updateFade = () => {
      const section = pastEventsRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      const fadeAbove = Math.max(
        0,
        Math.min(
          1,
          (viewportHeight * 0.3 - rect.bottom) /
            (viewportHeight * 0.5)
        )
      )

      const fadeBelow = Math.max(
        0,
        Math.min(
          1,
          (rect.top - viewportHeight * 0.4) /
            (viewportHeight * 0.5)
        )
      )

      const progress = Math.max(fadeAbove, fadeBelow)
      setPastEventsFade(progress)
    }

    const onScroll = () => {
      if (frame !== null) return

      frame = requestAnimationFrame(() => {
        frame = null
        updateFade()
      })
    }

    updateFade()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)

      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    Promise.all([
      client.fetch(HISTORY_QUERY),
      client.fetch(PAST_EVENTS_QUERY),
    ])
      .then(([historyData, eventsData]) => {
        if (cancelled) return

        setHistory(historyData)
        setEvents(eventsData || [])
      })
      .catch((err) => {
        if (cancelled) return

        console.error('Error loading history:', err)
        setError(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  if (loading) return <p>Loading society history...</p>

  if (error) {
    return <p>Could not load society history. Please try again later.</p>
  }

  if (!history) {
    return <p>Society history has not been added yet.</p>
  }

  const heroImage = history.heroImages?.[0]

  return (
    <>
      {heroImage && (
        <img
          className="history-banner"
          src={urlFor(heroImage).width(2000).url()}
          alt={history.heading || 'Society history'}
        />
      )}

      <section className="history">
        <h1 className="history-title">
          {history.heading || 'Society history'}
        </h1>

        {history.paragraphs?.map((paragraph, index) => (
          <Reveal key={index} delay={800 + index * 100}>
            <p className="history-text">{paragraph}</p>
          </Reveal>
        ))}
      </section>

      <section
        ref={pastEventsRef}
        className="past-events"
        style={{
          '--past-events-fade': pastEventsFade,
        }}
      >
        <Reveal>
          <h2 className="past-events-title">
            Past Events
          </h2>
        </Reveal>

        <PastEventsSlideshow events={events} />
      </section>
    </>
  )
}
