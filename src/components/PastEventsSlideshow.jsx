
import { useEffect, useState } from 'react'
import { urlFor } from '../sanityClient'
import '../styles/pastEventsSlideshow.css'

export default function PastEventsSlideshow({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    setActiveIndex(0)
  }, [images])

  useEffect(() => {
    if (images.length <= 1 || paused) return

    const interval = setInterval(() => {
      setActiveIndex((previous) => (previous + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length, paused])

  if (!images.length) return null

  const next = () => {
    setActiveIndex((previous) => (previous + 1) % images.length)
  }

  const previous = () => {
    setActiveIndex(
      (previous) => (previous - 1 + images.length) % images.length
    )
  }

  return (
    <div
      className="past-slideshow"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false)
        }
      }}
      aria-label="Past events photo gallery"
    >
      <div className="past-slideshow-stage">
        {images.map((image, index) => (
          <div
            key={image._key || index}
            className={`past-slide ${
              index === activeIndex ? 'is-active' : ''
            }`}
            aria-hidden={index !== activeIndex}
          >
            <img
              src={urlFor(image).width(1800).auto('format').url()}
              alt={image.alt || `Past event photograph ${index + 1}`}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        <div className="past-slideshow-counter">
          {String(activeIndex + 1).padStart(2, '0')}
          <span> / </span>
          {String(images.length).padStart(2, '0')}
        </div>
      </div>

      {images.length > 1 && (
        <div className="past-slideshow-controls">
          <button
            className="past-slideshow-arrow"
            onClick={previous}
            aria-label="Previous photograph"
            type="button"
          >
            ←
          </button>

          <div className="past-slideshow-progress">
            {images.map((image, index) => (
              <button
                key={image._key || index}
                type="button"
                className={`past-slideshow-dot ${
                  index === activeIndex ? 'is-active' : ''
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show photograph ${index + 1}`}
                aria-current={index === activeIndex ? 'true' : undefined}
              />
            ))}
          </div>

          <button
            className="past-slideshow-arrow"
            onClick={next}
            aria-label="Next photograph"
            type="button"
          >
            →
          </button>
        </div>
      )}
    </div>
  )
}
