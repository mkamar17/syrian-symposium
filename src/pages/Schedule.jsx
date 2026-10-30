import { useEffect, useRef, useState } from 'react'
import { client } from '../sanityClient'
import { SCHEDULE_QUERY } from '../queries'
import ScrollVelocity from '../components/ScrollVelocity'
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

function ScheduleDay({ date, items }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className={`schedule-day ${visible ? 'is-visible' : ''}`}>
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

  useEffect(() => {
    client.fetch(SCHEDULE_QUERY).then(setSessions).catch((err) => setError(err.message))
  }, [])

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
      <div className="schedule-title-band">
        <ScrollVelocity
          texts={['Syrian Symposium Schedule 2027']}
          velocity={30}
          skewWithVelocity={6}
          separator="✦"
          numCopies={4}
          gap={500}
        />
      </div>

      <main className="schedule">
        {Object.entries(days).map(([date, items]) => (
          <ScheduleDay key={date} date={date} items={items} />
        ))}

        {sessions.length === 0 && <p>Schedule TBC</p>}
      </main>
    </>
  )
}