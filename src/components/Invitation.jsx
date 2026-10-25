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

  return (
    <section ref={ref} className={`invitation ${visible ? 'is-visible' : ''}`}>
      {invitation.image && (
        <div className="invitation-media">
          <img
            src={urlFor(invitation.image).width(1000).height(750).url()}
            alt={invitation.heading}
          />
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