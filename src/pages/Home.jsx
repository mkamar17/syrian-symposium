import { useEffect, useState } from 'react'
import { client } from '../sanityClient'
import { HOME_INTRO_QUERY, HIGHLIGHT_CARDS_QUERY, SPEAKERS_QUERY } from '../queries'
import Hero from '../components/Hero'
import HomeIntro from '../components/HomeIntro'
import HighlightCards from '../components/HighlightCards'
import Speakers from './Speakers'

export default function Home() {
  const [intro, setIntro] = useState(null)
  const [cards, setCards] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([client.fetch(HOME_INTRO_QUERY), client.fetch(HIGHLIGHT_CARDS_QUERY)])
      .then(([introData, cardData]) => {
        setIntro(introData)
        setCards(cardData)
      })
      .catch((err) => setError(err.message))
  }, [])

  return (
    <>
      <Hero />
      {error && <p>Error: {error}</p>}
      {intro && <HomeIntro heading={intro.heading} paragraphs={intro.paragraphs} />}
        {/* <HighlightCards cards={cards} /> */}
      {/* <section className="home-speakers">
        <Speakers />
      </section> */}
    </>
  )
}