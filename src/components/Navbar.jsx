import { Link } from 'react-router-dom'
import { FaLinkedinIn } from 'react-icons/fa'
import logo from '../assets/initial_logo.png'
import '../styles/navbar.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/history', label: 'Society history' },
//   { to: '/committee', label: 'Committee' },
{ to: '/schedule', label: 'Schedule & Speakers'},
  { to: '/join', label: 'Join us' }
//   { to: '/schedule', label: 'Schedule & Speakers'}
]

export default function Navbar() {
  return (
    <header className="navbar">
      <img src={logo} alt="Syrian Symposium logo" className="navbar-logo-img" />

      <nav>
        <ul className="navbar-links">
          {links.map((link) => (
            <li key={link.to}>
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <a
        href="https://www.linkedin.com/in/nour-samman-b1ab15269/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow us on LinkedIn"
        className="navbar-social"
      >
        <FaLinkedinIn />
      </a>
    </header>
  )
}