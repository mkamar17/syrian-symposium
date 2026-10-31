
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaLinkedinIn } from 'react-icons/fa'
import { Menu, X } from 'lucide-react'
import logo from '../assets/new-logo.jpg'
import '../styles/navbar.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/history', label: 'Society history' },
  { to: '/schedule', label: 'Schedule & Speakers' },
  { to: '/join', label: 'Join us' }
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="navbar">
      <Link
        to="/"
        className="navbar-logo"
        onClick={() => setMenuOpen(false)}
      >
        <img
          src={logo}
          alt="Syrian Symposium logo"
          className="navbar-logo-img"
        />
      </Link>

      <nav
        id="navbar-navigation"
        className={`navbar-nav ${menuOpen ? 'navbar-nav-open' : ''}`}
        aria-label="Main navigation"
      >
        <ul className="navbar-links">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                // className={
                //   location.pathname === link.to ? 'active' : ''
                // }
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="navbar-actions">
        <a
          href="https://www.linkedin.com/in/nour-samman-b1ab15269/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow us on LinkedIn"
          className="navbar-social"
        >
          <FaLinkedinIn />
        </a>

        <button
          type="button"
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="navbar-navigation"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
    </header>
  )
}
