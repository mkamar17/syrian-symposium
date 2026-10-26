import { useEffect, useState } from 'react'
import { urlFor } from '../sanityClient'
import '../styles/slideshow.css'

export default function ImageSlideshow({ images = [], interval = 5000 }) {
  const [index, setIndex] = useState(0)
  const count = images.length

  useEffect(() => {
    if (count < 2) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % count)
    }, interval)
    return () => clearInterval(timer)
  }, [count, interval])

  if (count === 0) return null

  const showPrevious = () => setIndex((i) => (i - 1 + count) % count)
  const showNext = () => setIndex((i) => (i + 1) % count)

  return (
    <div className="slideshow">
      {images.map((image, i) => (
        <img
          key={image._key || i}
          className={`slide ${i === index ? 'is-active' : ''}`}
          src={urlFor(image).width(2000).url()}
          alt={`Society photo ${i + 1} of ${count}`}
          aria-hidden={i !== index}
        />
      ))}

      {count > 1 && (
        <>
          <button className="slide-btn slide-prev" onClick={showPrevious} aria-label="Previous image">
            ‹
          </button>
          <button className="slide-btn slide-next" onClick={showNext} aria-label="Next image">
            ›
          </button>

          <div className="slide-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`slide-dot ${i === index ? 'is-active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Show image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}