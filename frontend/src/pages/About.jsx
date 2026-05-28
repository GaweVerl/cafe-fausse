export function About() {
  return (
    <div className="page">
      <section className="section">
        <div className="container">
          <div className="page-header">
            <h1 className="h1">About</h1>
            <p className="muted">The story, the mission, and the people behind Café Fausse.</p>
          </div>

          <div className="two-col">
            <div className="card">
              <h2 className="h2">About Café Fausse</h2>
              <p className="body">
                Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez, Café Fausse blends
                traditional Italian flavors with modern culinary innovation. Our mission is to provide an
                unforgettable dining experience that reflects both quality and creativity.
              </p>
              <p className="body muted">
                We’re committed to exceptional food made with locally sourced ingredients—served in a
                warm, refined setting.
              </p>
            </div>

            <div className="card">
              <h2 className="h2">Founders</h2>
              <div className="bio">
                <div className="bio-name">Chef Antonio Rossi</div>
                <div className="bio-text">
                  A classically trained chef known for elevating Italian staples with modern technique and
                  seasonality.
                </div>
              </div>
              <div className="bio">
                <div className="bio-name">Maria Lopez</div>
                <div className="bio-text">
                  A hospitality visionary focused on creating a welcoming experience where every detail
                  feels intentional.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

