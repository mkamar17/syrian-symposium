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

  const imagePositions = [
  { x: '-180px', y: '-50px', tilt: '-4deg' }, // first image
  { x: '60px', y: '100px', tilt: '4deg' },  // second image
]

// when the actual pictures come 

// const imagePositions = [
//   // IMAGE 1
//   { 
//     x: '0px', 
//     y: '20px', 
//     tilt: '-2deg',
//     width: '65%',
//     height: '300px'
//   },

//   // IMAGE 2 — smaller
//   { 
//     x: '220px', 
//     y: '0px', 
//     tilt: '2deg',
//     width: '50%',
//     height: '240px'
//   },
// ]

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
                    '--offset-x': imagePositions[i]?.x || '0px',
                    '--offset-y': imagePositions[i]?.y || '0px',
                    '--tilt': imagePositions[i]?.tilt || '0deg',
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