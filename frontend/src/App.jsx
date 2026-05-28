import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { SiteFooter } from './components/SiteFooter.jsx'
import { SiteHeader } from './components/SiteHeader.jsx'
import { About } from './pages/About.jsx'
import { Gallery } from './pages/Gallery.jsx'
import { Home } from './pages/Home.jsx'
import { Menu } from './pages/Menu.jsx'
import { Reservations } from './pages/Reservations.jsx'

export default function App() {
  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  )
}
