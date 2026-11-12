
import { useEffect, useState } from 'react'
import { urlFor } from '../sanityClient'
import '../styles/pastEventsSlideshow.css'

export default function PastEventsSlideshow({ events = [] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  // Reset when events change
  useEffect(() => {
    setActiveIndex(0)
    setPaused(false)
  }, [events])

  // Automatically advance every 5 seconds
  useEffect(() => {
    if (events.length <= 1 || paused) return

    const interval = setInterval(() => {
      setActiveIndex(
        (previous) => (previous + 1) % events.length
      )
    }, 10000)

    return () => clearInterval(interval)
  }, [events.length, paused])

  if (!events.length) return null

  const currentIndex = Math.min(
    activeIndex,
    events.length - 1
  )

  const next = () => {
    setPaused(false)
    setActiveIndex(
      (previous) => (previous + 1) % events.length
    )
  }

  const previous = () => {
    setPaused(false)
    setActiveIndex(
      (previous) =>
        (previous - 1 + events.length) % events.length
    )
  }

  const goToSlide = (index) => {
    setPaused(false)
    setActiveIndex(index)
  }

  return (
    <div
      className="past-slideshow"
      role="region"
      aria-roledescription="carousel"
      aria-label="Past events photo gallery"
    >
      <div className="past-slideshow-card">

        {/* IMAGE STAGE */}
        <div
          className="past-slideshow-stage"
          onClick={() => setPaused(true)}
          onKeyDown={(event) => {
            if (
              event.key === 'Enter' ||
              event.key === ' '
            ) {
              event.preventDefault()
              setPaused(true)
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={
            paused
              ? 'Slideshow paused. Use arrows to resume.'
              : 'Pause slideshow'
          }
        >
          {events.map((event, index) => (
            <div
              key={event._id}
              className={`past-slide ${
                index === currentIndex
                  ? 'is-active'
                  : ''
              }`}
              aria-hidden={index !== currentIndex}
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

          {/* IMAGE COUNTER */}
          <div className="past-slideshow-counter">
            {String(currentIndex + 1).padStart(2, '0')}
            <span> / </span>
            {String(events.length).padStart(2, '0')}
          </div>
        </div>

        {/* DESCRIPTION CROSSFADE */}
        <div className="past-slideshow-description">
          {events.map((event, index) => (
            <div
              key={event._id}
              className={`past-description-slide ${
                index === currentIndex
                  ? 'is-active'
                  : ''
              }`}
              aria-hidden={index !== currentIndex}
            >
              <p>{event.description || ''}</p>
            </div>
          ))}
        </div>

      </div>

      {/* NAVIGATION */}
      {events.length > 1 && (
        <div className="past-slideshow-controls">
          <button
            type="button"
            className="past-slideshow-arrow"
            onClick={previous}
            aria-label="Previous event"
          >
            ←
          </button>

          <div className="past-slideshow-progress">
            {events.map((event, index) => (
              <button
                key={event._id}
                type="button"
                className={`past-slideshow-dot ${
                  index === currentIndex
                    ? 'is-active'
                    : ''
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Show ${event.title}`}
                aria-current={
                  index === currentIndex
                    ? 'true'
                    : undefined
                }
              />
            ))}
          </div>

          <button
            type="button"
            className="past-slideshow-arrow"
            onClick={next}
            aria-label="Next event"
          >
            →
          </button>
        </div>
      )}
    </div>
  )
}
