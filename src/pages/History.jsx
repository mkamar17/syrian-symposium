import { useEffect, useState } from 'react'
import { client, urlFor } from '../sanityClient'
import { HISTORY_QUERY } from '../queries'
import Reveal from '../components/Reveal'
import '../styles/history.css'

export default function History() {
  const [history, setHistory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    client
      .fetch(HISTORY_QUERY)
      .then((data) => setHistory(data))
      .catch((err) => {
        console.error('Error loading society history:', err)
        setError(true)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading society history...</p>
  if (error) return <p>Could not load society history. Please try again later.</p>
  if (!history) return <p>Society history has not been added yet.</p>

    return (
    <>
            {history.heroImages?.length > 0 && (
        <ImageSlideshow images={history.heroImages} />
      )}

      <section className="history">
        <Reveal>
          <h1 className="history-title">{history.heading || 'Society history'}</h1>
        </Reveal>

        {history.paragraphs?.map((paragraph, index) => (
          <Reveal key={index} delay={index * 100}>
            <p className="history-text">{paragraph}</p>
          </Reveal>
        ))}
      </section>
    </>
  )
}
import ImageSlideshow from '../components/ImageSlideshow'