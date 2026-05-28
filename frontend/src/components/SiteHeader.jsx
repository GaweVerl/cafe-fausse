import { NavLink } from 'react-router-dom'
import heroImg from '../assets/hero.png'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/reservations', label: 'Reservations' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
]

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink to="/" className="brand" aria-label="Café Fausse home">
          <img className="brand-mark" src={heroImg} alt="" />
          <div className="brand-text">
            <div className="brand-name">Café Fausse</div>
            <div className="brand-tagline">Italian-inspired fine dining</div>
          </div>
        </NavLink>

        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

