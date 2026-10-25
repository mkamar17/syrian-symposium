import { useEffect, useRef, useState } from 'react'
import '../styles/invitation.css'
import { urlFor } from '../sanityClient'

export default function Invitation({ invitation }) {
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
      { threshold: 0.2 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const images = invitation.images || []

  return (
    <section ref={ref} className={`invitation ${visible ? 'is-visible' : ''}`}>
      {images.length > 0 && (
        <div className="invitation-media">
          <div className="invitation-stack">
            {images.map((img, i) => (
              <img
                key={img._key}
                className="invitation-stack-img"
                src={urlFor(img).width(900).url()}
                alt={img.alt || ''}
                style={{
                  '--offset-x': `${i * 40}px`,
                  '--offset-y': `${i * 30}px`,
                  '--tilt': `${(i % 2 === 0 ? -1 : 1) * (1 + i)}deg`,
                  zIndex: i + 1,
                  animationDelay: `${0.4 + i * 0.6}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="invitation-text">
        <h2 className="invitation-heading">{invitation.heading}</h2>
        {invitation.text && <p className="invitation-body">{invitation.text}</p>}
        {invitation.buttonLabel && invitation.buttonLink && (
          <a className="invitation-button" href={invitation.buttonLink}>
            {invitation.buttonLabel}
          </a>
        )}
      </div>
    </section>
  )
}