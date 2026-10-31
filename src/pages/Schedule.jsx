import { useCallback, useEffect, useRef, useState } from 'react'
import { client } from '../sanityClient'
import { SCHEDULE_QUERY } from '../queries'
import ScrollVelocity from '../components/ScrollVelocity'
import Speakers from './Speakers'
import '../styles/schedule.css'

function formatDate(iso) {
  if (!iso) return 'Date TBC'
  // Noon avoids timezone shifts moving the date to the day before
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// index: this day's position in the list
// revealedIndex: how many days have been revealed so far
// onReveal: tells the parent this day has been revealed
function ScheduleDay({ date, items, index, revealedIndex, onReveal }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  // Track whether the day is on screen right now
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // Reveal only while the day is on screen, and only once the day above is revealed.
  // If the visitor scrolls away before the timer ends, the timer is cancelled.
  useEffect(() => {
    if (!inView || index !== revealedIndex) return
    const timer = setTimeout(() => onReveal(), 1100)
    return () => clearTimeout(timer)
  }, [inView, index, revealedIndex, onReveal])

  const shown = index < revealedIndex

  return (
    <section ref={ref} className={`schedule-day ${shown ? 'is-visible' : ''}`}>
      <div className="schedule-date">{formatDate(date === 'tbc' ? null : date)}</div>

      <div className="schedule-sessions">
        {items.map((s) => (
          <article key={s._id} className="session">
            <div>
              <h3 className="session-title">{s.title || 'Session TBC'}</h3>
              {s.speakers?.length > 0 ? (
                s.speakers.map((sp, j) => (
                  <p key={j} className="session-speaker">
                    {sp.name}
                    {sp.role && `, ${sp.role}`}
                  </p>
                ))
              ) : (
                <p className="session-speaker">Speakers TBC</p>
              )}
            </div>
            <p className="session-time">{s.time || 'Time TBC'}</p>
            <p className="session-venue">{s.venue || 'Venue TBC'}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default function Schedule() {
  const [sessions, setSessions] = useState([])
  const [error, setError] = useState(null)
  const [revealedIndex, setRevealedIndex] = useState(0)

  useEffect(() => {
    client.fetch(SCHEDULE_QUERY).then(setSessions).catch((err) => setError(err.message))
  }, [])

  const handleReveal = useCallback(() => setRevealedIndex((i) => i + 1), [])

  if (error) return <p>Error: {error}</p>

  // Group sessions by day, keeping the order from the query
  const days = sessions.reduce((acc, s) => {
    const key = s.date || 'tbc'
    if (!acc[key]) acc[key] = []
    acc[key].push(s)
    return acc
  }, {})

  return (
    <>
      {/* <div className="schedule-title-band">
        <ScrollVelocity
          texts={['Syrian Symposium Schedule 2027']}
          velocity={30}
          skewWithVelocity={6}
          separator="✦"
          numCopies={4}
          gap={400}
        />
      </div> */}

      <h1 className="schedule-title">What to Expect</h1>

      <main className="schedule">
        {sessions.length > 0 && (
          <div className="schedule-header">
            <p className="column-label">Date</p>
            <div className="session-header">
              <p className="column-label">Session &amp; speakers</p>
              <p className="column-label">Time</p>
              <p className="column-label">Venue</p>
            </div>
          </div>
        )}

        {Object.entries(days).map(([date, items], index) => (
          <ScheduleDay
            key={date}
            date={date}
            items={items}
            index={index}
            revealedIndex={revealedIndex}
            onReveal={handleReveal}
          />
        ))}

        {sessions.length === 0 && <p>Schedule TBC</p>}
      </main>

      <h1 className="speakers-title">Projected Speakers</h1>

      <Speakers/>
    </>
  )
}