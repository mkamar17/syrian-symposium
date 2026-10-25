import { useEffect, useState } from 'react'
import { client } from '../sanityClient'
import { FOOTER_QUERY } from '../queries'
import '../styles/footer.css'

export default function Footer() {
  const [footer, setFooter] = useState(null)

  useEffect(() => {
    client.fetch(FOOTER_QUERY).then(setFooter).catch(() => setFooter(null))
  }, [])

  if (!footer) return null

    return (
    <footer className="site-footer">
      <div className="footer-inner">
        {footer.organisation && <h2 className="footer-name">{footer.organisation}</h2>}

        {footer.address && (
          <p className="footer-address">
            {footer.address.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        )}

        {footer.contactEmail && (
          <p className="footer-contact">
            Contact us at:{' '}
            <a href={`mailto:${footer.contactEmail}`}>{footer.contactEmail}</a>
          </p>
        )}

        {footer.linkedinUrl && (
          <a
            className="footer-linkedin"
            href={footer.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Add us on LinkedIn
          </a>
        )}
      </div>
    </footer>
  )
}