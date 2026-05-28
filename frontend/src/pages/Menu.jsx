const MENU = [
  {
    category: 'Starters',
    items: [
      {
        name: 'Bruschetta',
        description: 'Fresh tomatoes, basil, olive oil, and toasted baguette slices',
        price: 8.5,
      },
      {
        name: 'Caesar Salad',
        description: 'Crisp romaine with homemade Caesar dressing',
        price: 9.0,
      },
    ],
  },
  {
    category: 'Main Courses',
    items: [
      {
        name: 'Grilled Salmon',
        description: 'Served with lemon butter sauce and seasonal vegetables',
        price: 22.0,
      },
      {
        name: 'Ribeye Steak',
        description: '12 oz prime cut with garlic mashed potatoes',
        price: 28.0,
      },
      {
        name: 'Vegetable Risotto',
        description: 'Creamy Arborio rice with wild mushrooms',
        price: 18.0,
      },
    ],
  },
  {
    category: 'Desserts',
    items: [
      { name: 'Tiramisu', description: 'Classic Italian dessert with mascarpone', price: 7.5 },
      { name: 'Cheesecake', description: 'Creamy cheesecake with berry compote', price: 7.0 },
    ],
  },
  {
    category: 'Beverages',
    items: [
      { name: 'Red Wine (Glass)', description: 'A selection of Italian reds', price: 10.0 },
      { name: 'White Wine (Glass)', description: 'Crisp and refreshing', price: 9.0 },
      { name: 'Craft Beer', description: 'Local artisan brews', price: 6.0 },
      { name: 'Espresso', description: 'Strong and aromatic', price: 3.0 },
    ],
  },
]

function money(amount) {
  return `$${amount.toFixed(2)}`
}

export function Menu() {
  return (
    <div className="page">
      <section className="section">
        <div className="container">
          <div className="page-header">
            <h1 className="h1">Menu</h1>
            <p className="muted">
              A concise selection inspired by Italian classics—executed with modern restraint.
            </p>
          </div>

          <div className="menu-grid">
            {MENU.map((section) => (
              <div key={section.category} className="menu-card">
                <div className="menu-category">{section.category}</div>
                <div className="menu-items">
                  {section.items.map((item) => (
                    <div key={item.name} className="menu-item">
                      <div className="menu-item-top">
                        <div className="menu-item-name">{item.name}</div>
                        <div className="menu-item-price">{money(item.price)}</div>
                      </div>
                      <div className="menu-item-desc">{item.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

