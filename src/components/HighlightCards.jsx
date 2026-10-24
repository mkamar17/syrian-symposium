import '../styles/cards.css'
import { urlFor } from '../sanityClient'

export default function HighlightCards({ cards = [] }) {
  const renderCards = () =>
    cards.map((card) => (
      <article key={card._id} className="card">
        {card.image && (
          <img
            className="card-image"
            src={urlFor(card.image).width(800).height(500).url()}
            alt={card.title}
          />
        )}
        <div className="card-body">
          <h3>{card.title}</h3>
          {card.text && <p>{card.text}</p>}
          {card.link && (
            <a href={card.link} target="_blank" rel="noopener noreferrer">
              Learn more
            </a>
          )}
        </div>
      </article>
    ))

  if (cards.length === 0) return null

  return (
    <section className="cards-section">
      <div className="cards-marquee">
        <div className="cards-group">{renderCards()}</div>
        {/* Duplicate set so the loop joins seamlessly. inert stops keyboard focus landing on it */}
        <div className="cards-group" aria-hidden="true" inert="">
          {renderCards()}
        </div>
      </div>
    </section>
  )
}