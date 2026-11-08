
import { useEffect, useState } from 'react'
import { urlFor } from '../sanityClient'
import '../styles/pastEventsSlideshow.css'

export default function PastEventsSlideshow({ events = [] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    setActiveIndex(0)
  }, [events])

  useEffect(() => {
    if (events.length <= 1 || paused) return

    const interval = setInterval(() => {
      setActiveIndex((previous) => (previous + 1) % events.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [events.length, paused])

  if (!events.length) return null

  const next = () => {
    setActiveIndex((previous) => (previous + 1) % events.length)
  }

  const previous = () => {
    setActiveIndex(
      (previous) => (previous - 1 + events.length) % events.length
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
      role="region"
      aria-roledescription="carousel"
    >
      <div className="past-slideshow-stage">
        {events.map((event, index) => (
          <div
            key={event._id}
            className={`past-slide ${
              index === activeIndex ? 'is-active' : ''
            }`}
            aria-hidden={index !== activeIndex}
          >
            <img
              src={urlFor(event.image)
                .width(1800)
                .auto('format')
                .url()}
              alt={event.image?.alt || event.title}
              loading={index === 0 ? 'eager' : 'lazy'}
            />

            <div className="past-slide-caption">
              <h3>{event.title}</h3>
            </div>
          </div>
        ))}

        <div className="past-slideshow-counter">
          {String(activeIndex + 1).padStart(2, '0')}
          <span> / </span>
          {String(events.length).padStart(2, '0')}
        </div>
      </div>

      {events.length > 1 && (
        <div className="past-slideshow-controls">
          <button
            className="past-slideshow-arrow"
            onClick={previous}
            aria-label="Previous event"
            type="button"
          >
            ←
          </button>

          <div className="past-slideshow-progress">
            {events.map((event, index) => (
              <button
                key={event._id}
                type="button"
                className={`past-slideshow-dot ${
                  index === activeIndex ? 'is-active' : ''
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${event.title}`}
                aria-current={
                  index === activeIndex ? 'true' : undefined
                }
              />
            ))}
          </div>

          <button
            className="past-slideshow-arrow"
            onClick={next}
            aria-label="Next event"
            type="button"
          >
            →
          </button>
        </div>
      )}
    </div>
  )
}
