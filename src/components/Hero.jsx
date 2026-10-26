import { useEffect, useState } from 'react'
import { FiCalendar, FiMapPin } from 'react-icons/fi'
import { client } from '../sanityClient'
import { EVENT_DETAILS_QUERY } from '../queries'
import heroImage from '../assets/hero-damascus.jpg'
import '../styles/hero.css'

export default function Hero() {
  const [details, setDetails] = useState(null)

  useEffect(() => {
    client.fetch(EVENT_DETAILS_QUERY).then(setDetails).catch(() => setDetails(null))
  }, [])

  return (
    <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-overlay" />

      <div className="hero-content">
        <h1 className="hero-title">Syrian Symposium</h1>

        {details && (
          <div className="hero-details">
            {details.host && <p className="hero-host">Hosted by {details.host}</p>}
            <p className="hero-meta">
              {details.dates && (
                <span>
                  <FiCalendar aria-hidden="true" />
                  {details.dates}
                </span>
              )}
              {details.venue && (
                <span>
                  <FiMapPin aria-hidden="true" />
                  {details.venue}
                </span>
              )}
            </p>
          </div>
        )}
      </div>

      <a href="#intro" className="hero-scroll" aria-label="Scroll to discover">
        <span className="hero-scroll-line" />
      </a>
    </section>
  )
}