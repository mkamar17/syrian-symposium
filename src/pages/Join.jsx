
import { useEffect, useState } from 'react'
import { PortableText } from '@portabletext/react'
import { client, urlFor } from '../sanityClient'
import { JOIN_PAGE_QUERY } from '../queries'
import '../styles/join.css'

const portableTextComponents = {
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href

      if (!href) return <>{children}</>

      const isExternal = /^https?:\/\//i.test(href)

      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      )
    },
  },
}

export default function Join() {
  const [page, setPage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    client
      .fetch(JOIN_PAGE_QUERY)
      .then((data) => {
        if (!cancelled) setPage(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })

    return () => {
      cancelled = true
    }
  }, [])

  if (error) return <p>Error: {error}</p>
  if (!page) return null

  const backgroundUrl = page.backgroundImage
    ? urlFor(page.backgroundImage)
        .width(2000)
        .quality(85)
        .url()
    : null

  return (
    <main className="join-page">
      <section className="join-hero">

        {backgroundUrl && (
          <div
            className="join-background"
            style={{
              backgroundImage: `url("${backgroundUrl}")`,
            }}
            aria-hidden="true"
          />
        )}

        <div className="join-overlay" aria-hidden="true" />

        <div className="join-content">
          <h1 className="join-heading">
            {page.heading || 'Become a Sponsor'}
          </h1>
          

          {page.pitchUrl && (
            <a
              className="join-button"
              href={page.pitchUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {page.buttonLabel || 'View Pitch'}
            </a>
          )}

          {Array.isArray(page.intro) && page.intro.length > 0 && (
            <div className="join-intro">
              <PortableText
                value={page.intro}
                components={portableTextComponents}
              />
            </div>
          )}
        </div>

      </section>
    </main>
  )
}
