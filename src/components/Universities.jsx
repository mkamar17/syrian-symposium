
import { useEffect, useRef, useState } from 'react'
import { client, urlFor } from '../sanityClient'
import { UNIVERSITIES_QUERY } from '../queries'
import '../styles/universities.css'

function UniversityLogo({ university, duplicate = false }) {
  const content = university.logo ? (
    <img
      src={urlFor(university.logo).height(120).url()}
      alt={duplicate ? '' : university.name}
      loading="lazy"
    />
  ) : (
    <span className="university-name">
      {university.name}
    </span>
  )

  if (!university.url) {
    return <span className="university">{content}</span>
  }

  return (
    <a
      className="university"
      href={university.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={duplicate ? undefined : university.name}
      tabIndex={duplicate ? -1 : undefined}
    >
      {content}
    </a>
  )
}

export default function Universities() {
  const [universities, setUniversities] = useState([])
  const [visible, setVisible] = useState(false)

  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const speedRef = useRef(1)

  // =========================================
  // FETCH UNIVERSITIES FROM SANITY
  // =========================================

  useEffect(() => {
    let cancelled = false

    client
      .fetch(UNIVERSITIES_QUERY)
      .then((data) => {
        if (!cancelled) {
          setUniversities(data || [])
        }
      })
      .catch(() => {
        if (!cancelled) setUniversities([])
      })

    return () => {
      cancelled = true
    }
  }, [])

  // =========================================
  // SMOOTH SCROLLING SPEED ON HOVER
  // =========================================

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let frameId
    let targetSpeed = 1

    const animate = () => {
      const animation = track.getAnimations()[0]

      if (animation) {
        // Gradually approach the target speed
        speedRef.current +=
          (targetSpeed - speedRef.current) * 0.05

        animation.playbackRate = speedRef.current
      }

      frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)

    const slowDown = () => {
      targetSpeed = 0
    }

    const speedUp = () => {
      targetSpeed = 1
    }

    track.addEventListener('mouseenter', slowDown)
    track.addEventListener('mouseleave', speedUp)

    return () => {
      cancelAnimationFrame(frameId)
      track.removeEventListener('mouseenter', slowDown)
      track.removeEventListener('mouseleave', speedUp)
    }
  }, [universities.length])

  // =========================================
  // HEADING BLUR-IN ON SCROLL
  // =========================================

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [universities.length])

  // =========================================
  // RENDER
  // =========================================

  if (universities.length === 0) return null

  return (
    <section
      ref={sectionRef}
      className={`universities ${visible ? 'is-visible' : ''}`}
    >
      <div className="universities-label">
        <h2>Collaborating Universities</h2>
      </div>

      <div className="universities-viewport">
        <div className="universities-track" ref={trackRef}>

          {/* Original logos */}
          <div className="universities-group">
            {universities.map((university) => (
              <UniversityLogo
                key={university._id}
                university={university}
              />
            ))}
          </div>

          {/* Duplicate logos for seamless looping */}
          <div
            className="universities-group"
            aria-hidden="true"
          >
            {universities.map((university) => (
              <UniversityLogo
                key={`duplicate-${university._id}`}
                university={university}
                duplicate
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
