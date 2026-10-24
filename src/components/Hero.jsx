import heroImage from '../assets/hero-damascus.jpg'
import '../styles/hero.css'

export default function Hero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-overlay" />
      <h1 className="hero-title">Syrian Symposium</h1>
    </section>
  )
}