
import { useEffect, useState } from 'react'
import { client } from '../sanityClient'
import { HISTORY_QUERY } from '../queries'

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

  if (loading) {
    return <p>Loading society history...</p>
  }

  if (error) {
    return <p>Could not load society history. Please try again later.</p>
  }

  if (!history) {
    return <p>Society history has not been added yet.</p>
  }

  return (
    <section>
      <h1>{history.heading || 'Society history'}</h1>

      {history.paragraphs?.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  )
}
