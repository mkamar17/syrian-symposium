export default function SpeakerCard({ speaker }) {
  return (
    <li>
      <strong>{speaker.name}</strong>
      {speaker.role && <> — {speaker.role}</>}
      {speaker.bio && <p>{speaker.bio}</p>}
    </li>
  )
}