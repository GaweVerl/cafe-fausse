import { NewsletterForm } from './NewsletterForm.jsx'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-block">
          <div className="footer-title">Café Fausse</div>
          <div className="footer-text">
            1234 Culinary Ave, Suite 100
            <br />
            Washington, DC 20002
          </div>
          <div className="footer-text">
            (202) 555-4567
            <br />
            Mon–Sat: 5:00 PM – 11:00 PM
            <br />
            Sun: 5:00 PM – 9:00 PM
          </div>
        </div>

        <div className="footer-block">
          <NewsletterForm compact />
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {new Date().getFullYear()} Café Fausse</span>
          <span className="footer-dot" aria-hidden="true">
            •
          </span>
          <span>Fine dining, thoughtfully served.</span>
        </div>
      </div>
    </footer>
  )
}

