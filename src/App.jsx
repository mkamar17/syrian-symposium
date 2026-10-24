import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { useEffect } from 'react'
import { client } from './sanityClient'

export default function App() {
  const [speakers, setSpeakers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    client
      .fetch(`*[_type == "speaker"] { _id, name, role, bio }`)
      .then(setSpeakers)
      .catch((err) => setError(err.message))
  }, [])

  if (error) return <p>Error: {error}</p>

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1 style={{ color: '#CE1126' }}>Heyyy :D</h1>
      <h2>Speakers</h2>
      <ul>
        {speakers.map((s) => (
          <li key={s._id}>
            <strong>{s.name}</strong>
            {s.role && <> — {s.role}</>}
            {s.bio && <p>{s.bio}</p>}
          </li>
        ))}
      </ul>
    </main>
  )
}