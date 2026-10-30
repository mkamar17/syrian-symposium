import { useEffect, useState } from 'react'
import { client } from '../sanityClient'
import { JOIN_PAGE_QUERY } from '../queries'
import '../styles/join.css'

export default function Join() {
  const [page, setPage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    client.fetch(JOIN_PAGE_QUERY).then(setPage).catch((err) => setError(err.message))
  }, [])

  if (error) return <p>Error: {error}</p>
  if (!page) return null

  return (
    <>
      <section className="join-hero">
        <h1 className="join-heading">{page.heading || 'Join us'}</h1>
        {page.intro && <p className="join-intro">{page.intro}</p>}
      </section>

      <section className="join-body">
        <div className="join-info">
          {page.steps?.length > 0 && (
            <>
              <h2 className="join-label">How to join</h2>
              <ol className="join-steps">
                {page.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </>
          )}

          <h2 className="join-label">Get in touch</h2>
          {page.contactEmail && (
            <p className="join-email">
              <a href={`mailto:${page.contactEmail}`}>{page.contactEmail}</a>
            </p>
          )}

          <div className="join-social">
            {page.instagramUrl && (
              <a href={page.instagramUrl} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            )}
            {page.linkedinUrl && (
              <a href={page.linkedinUrl} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
          </div>
        </div>

        {/* Dummy form: stops the page reloading, but doesn't send anything yet */}
        <form className="join-form" onSubmit={(e) => e.preventDefault()}>
          <h2 className="join-form-title">Send us a message</h2>

          <label className="join-field">
            <span>Name</span>
            <input type="text" name="name" required />
          </label>

          <label className="join-field">
            <span>Email</span>
            <input type="email" name="email" required />
          </label>

          <label className="join-field">
            <span>Message</span>
            <textarea name="message" rows={5} required />
          </label>

          <button type="submit" className="join-submit">
            Send
          </button>
        </form>
      </section>
    </>
  )
}