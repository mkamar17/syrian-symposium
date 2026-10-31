import { useEffect, useRef, useState } from 'react'
import { PortableText } from '@portabletext/react'
import '../styles/invitation.css'
import { urlFor } from '../sanityClient'

const headingComponents = {
  block: {
    normal: ({ children }) => <>{children}</>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
  },
}

export default function Invitation({ invitation }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  if (!invitation) return null

  const images = invitation.images || []

  return (
    <section ref={ref} className={`invitation ${visible ? 'is-visible' : ''}`}>
      {images.length > 0 && (
        <div className="invitation-media">
          <div className="invitation-stack">
            {images.map((img, i) => (
              <img
                key={img._key || i}
                className={`invitation-stack-img invitation-stack-img-${i}`}
                src={urlFor(img).width(900).url()}
                alt={img.alt || ''}
                loading="lazy"
                style={{
                //   '--tilt': `${i % 2 === 0 ? -1.5 : 1.5}deg`,
                  zIndex: i + 1,
                  animationDelay: `${0.4 + i * 0.6}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="invitation-text">
        {invitation.heading && (
          <h2 className="invitation-heading">
            <PortableText value={invitation.heading} components={headingComponents} />
          </h2>
        )}

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