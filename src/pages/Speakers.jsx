import { useEffect, useState } from 'react'
import { client } from '../sanityClient'
import { SPEAKERS_QUERY } from '../queries'
import SpeakerCard from '../components/SpeakerCard'

export default function Speakers() {
  const [speakers, setSpeakers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    client
      .fetch(SPEAKERS_QUERY)
      .then(setSpeakers)
      .catch((err) => setError(err.message))
  }, [])

  if (error) return <p>Error: {error}</p>

  return (
    <section>
      <h2>Speakers</h2>
      <ul>
        {speakers.map((s) => (
          <SpeakerCard key={s._id} speaker={s} />
        ))}
      </ul>
    </section>
  )
}