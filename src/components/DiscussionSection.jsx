import { useEffect, useRef, useState } from 'react'
import '../styles/discussion.css'
import { urlFor } from '../sanityClient'

export default function DiscussionSection({ section }) {
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
    <section ref={ref} className={`discussion ${visible ? 'is-visible' : ''}`}>
      {section.heading && (
        <div className="discussion-label">
          <h2>{section.heading}</h2>
          
        </div>
      )}

      <div className="discussion-grid">
        {section.points?.map((point, i) => (
          <article
            key={point._key}
            className="discussion-item"
            style={{ animationDelay: `${0.3 + i * 0.4}s` }}
          >
            {point.icon && (
              <img
                className="discussion-icon"
                src={urlFor(point.icon).width(240).url()}
                alt=""
              />
            )}
            <h3 className="discussion-title">{point.title}</h3>
            {point.text && <p className="discussion-text">{point.text}</p>}
          </article>
        ))}
      </div>
    </section>
  )
}