import homeImg from '../assets/home-cafe-fausse.webp'
import { NewsletterForm } from '../components/NewsletterForm.jsx'

export function Home() {
  return (
    <div className="page">
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="kicker">Café Fausse • Washington, DC</div>
            <h1 className="display">An unforgettable dining experience.</h1>
            <p className="lede">
              Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez, Café Fausse blends
              traditional Italian flavors with modern culinary innovation—crafted with locally sourced
              ingredients and served with quiet confidence.
            </p>
            <div className="hero-actions">
              <a className="button" href="/reservations">
                Reserve a table
              </a>
              <a className="button button--ghost" href="/menu">
                View the menu
              </a>
            </div>

            <div className="info-card">
              <div className="info-row">
                <div className="info-label">Address</div>
                <div className="info-value">1234 Culinary Ave, Suite 100, Washington, DC 20002</div>
              </div>
              <div className="info-row">
                <div className="info-label">Phone</div>
                <div className="info-value">(202) 555-4567</div>
              </div>
              <div className="info-row">
                <div className="info-label">Hours</div>
                <div className="info-value">
                  Monday–Saturday: 5:00 PM – 11:00 PM
                  <br />
                  Sunday: 5:00 PM – 9:00 PM
                </div>
              </div>
            </div>
          </div>

          <div className="hero-media" aria-hidden="true">
            <img className="hero-image" src={homeImg} alt="" />
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container section-grid">
          <div>
            <h2 className="h2">Seasonal menus. Timeless craft.</h2>
            <p className="muted">
              From bright starters to deeply satisfying mains, every plate is composed with care. Join our
              newsletter for limited-seat events and seasonal releases.
            </p>
          </div>
          <div>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  )
}

