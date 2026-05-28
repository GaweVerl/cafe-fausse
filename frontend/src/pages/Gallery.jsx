import { useMemo, useState } from 'react'
import interiorImg from '../assets/gallery-cafe-interior.webp'
import ribeyeImg from '../assets/gallery-ribeye-steak.webp'
import eventImg from '../assets/gallery-special-event.webp'

const IMAGES = [
  {
    src: interiorImg,
    alt: 'Café Fausse interior ambiance',
    caption: 'Candlelit ambiance with modern Italian warmth.',
  },
  {
    src: ribeyeImg,
    alt: 'Ribeye steak plated for service',
    caption: 'Our ribeye—rich, restrained, and impeccably finished.',
  },
  {
    src: eventImg,
    alt: 'Special event at Café Fausse',
    caption: 'Special events and chef-led evenings throughout the year.',
  },
]

const AWARDS = [
  { title: 'Culinary Excellence Award', year: '2022' },
  { title: 'Restaurant of the Year', year: '2023' },
  { title: 'Best Fine Dining Experience – Foodie Magazine', year: '2023' },
]

const REVIEWS = [
  { quote: '“Exceptional ambiance and unforgettable flavors.”', source: 'Gourmet Review' },
  { quote: '“A must-visit restaurant for food enthusiasts.”', source: 'The Daily Bite' },
]

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null)
  const active = useMemo(
    () => (activeIndex == null ? null : IMAGES[activeIndex] || null),
    [activeIndex],
  )

  return (
    <div className="page">
      <section className="section">
        <div className="container">
          <div className="page-header">
            <h1 className="h1">Gallery</h1>
            <p className="muted">
              A glimpse of the dining room, the dishes, and the moments that make Café Fausse special.
            </p>
          </div>

          <div className="gallery-grid">
            {IMAGES.map((img, idx) => (
              <button
                key={img.alt}
                className="gallery-tile"
                type="button"
                onClick={() => setActiveIndex(idx)}
              >
                <img className="gallery-img" src={img.src} alt={img.alt} loading="lazy" />
                <div className="gallery-cap">{img.caption}</div>
              </button>
            ))}
          </div>

          <div className="two-col">
            <div className="card">
              <h2 className="h2">Awards</h2>
              <ul className="list">
                {AWARDS.map((a) => (
                  <li key={`${a.title}-${a.year}`} className="list-row">
                    <span>{a.title}</span>
                    <span className="muted">{a.year}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h2 className="h2">Reviews</h2>
              <div className="quotes">
                {REVIEWS.map((r) => (
                  <figure key={r.source} className="quote">
                    <blockquote className="quote-text">{r.quote}</blockquote>
                    <figcaption className="quote-source">— {r.source}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {active ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveIndex(null)}
        >
          <button className="lightbox-close" type="button" onClick={() => setActiveIndex(null)}>
            Close
          </button>
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <img className="lightbox-img" src={active.src} alt={active.alt} />
            <div className="lightbox-cap">{active.caption}</div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

