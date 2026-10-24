import Speakers from './Speakers'
import Hero from '../components/Hero'

export default function Home() {
  return (
    <>
    <Hero />
    <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <Speakers />
    </main>
    </>
  )
}