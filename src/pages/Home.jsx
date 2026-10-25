import { useEffect, useState } from 'react'
import { client } from '../sanityClient'
import {
  HOME_INTRO_QUERY,
  HIGHLIGHT_CARDS_QUERY,
  INVITATION_QUERY,
  SPEAKERS_QUERY,
} from '../queries'
import Hero from '../components/Hero'
import HomeIntro from '../components/HomeIntro'
import Invitation from '../components/Invitation'
import HighlightCards from '../components/HighlightCards'
import Speakers from './Speakers'

export default function Home() {
  const [intro, setIntro] = useState(null)
  const [cards, setCards] = useState([])
  const [invitations, setInvitations] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([
      client.fetch(HOME_INTRO_QUERY),
      client.fetch(HIGHLIGHT_CARDS_QUERY),
      client.fetch(INVITATION_QUERY),
    ])
      .then(([introData, cardData, inviteData]) => {
        setIntro(introData)
        setCards(cardData)
        setInvitations(inviteData)
      })
      .catch((err) => setError(err.message))
  }, [])

  return (
    <>
      <Hero />
      {error && <p>Error: {error}</p>}
      {intro && <HomeIntro heading={intro.heading} paragraphs={intro.paragraphs} />}
      {invitations.map((invitation) => (
        <Invitation key={invitation._id} invitation={invitation} />
      ))}
      {/* <HighlightCards cards={cards} />
      <section className="home-speakers">
        <Speakers />
      </section> */}
    </>
  )
}