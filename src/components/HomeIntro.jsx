import '../styles/intro.css'

export default function HomeIntro({ heading, paragraphs = [] }) {
  return (
    <section className="intro">
      <h2 className="intro-heading">{heading}</h2>
      <div className="intro-body">
        {paragraphs.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>
    </section>
  )
}