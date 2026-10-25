import { useEffect, useState } from 'react'
import { client } from '../sanityClient'
import {
  HOME_INTRO_QUERY,
  INVITATION_QUERY,
  DISCUSSION_SECTION_QUERY,
} from '../queries'
import Hero from '../components/Hero'
import HomeIntro from '../components/HomeIntro'
import Invitation from '../components/Invitation'
import DiscussionSection from '../components/DiscussionSection'
import Speakers from './Speakers'

export default function Home() {
  const [intro, setIntro] = useState(null)
  const [invitations, setInvitations] = useState([])
  const [discussion, setDiscussion] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([
      client.fetch(HOME_INTRO_QUERY),
      client.fetch(INVITATION_QUERY),
      client.fetch(DISCUSSION_SECTION_QUERY),
    ])
      .then(([introData, inviteData, discussionData]) => {
        setIntro(introData)
        setInvitations(inviteData)
        setDiscussion(discussionData)
      })
      .catch((err) => setError(err.message))
  }, [])

  return (
    <>
      <Hero />
      {error && <p>Error: {error}</p>}
      {intro && <HomeIntro heading={intro.heading} paragraphs={intro.paragraphs} />}
      
      {discussion && <DiscussionSection section={discussion} />}

      {invitations.map((invitation) => (
        <Invitation key={invitation._id} invitation={invitation} />
      ))}
      <Speakers />
    </>
  )
}