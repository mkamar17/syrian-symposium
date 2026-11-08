
import { useEffect, useRef, useState } from 'react'
import '../styles/discussion.css'
import { urlFor } from '../sanityClient'

export default function DiscussionSection({ section }) {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0,
        rootMargin: '0px 0px 100px 0px',
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`discussion ${visible ? 'is-visible' : ''}`}
    >
      {section.heading && (
        <div className="discussion-label">
          <h2>{section.heading}</h2>
        </div>
      )}

      <div className="discussion-grid">
        {section.points?.map((point, i) => (
          <DiscussionItem key={point._key} point={point} />
        ))}
      </div>
    </section>
  )
}

function DiscussionItem({ point }) {
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
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px',
      }
    )

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  return (
    <article
      ref={ref}
      className={`discussion-item ${visible ? 'item-visible' : ''}`}
    >
      {point.icon && (
        <img
          className="discussion-icon"
          src={urlFor(point.icon).width(240).url()}
          alt=""
        />
      )}

      <h3 className="discussion-title">{point.title}</h3>

      {point.text && (
        <p className="discussion-text">{point.text}</p>
      )}
    </article>
  )
}
