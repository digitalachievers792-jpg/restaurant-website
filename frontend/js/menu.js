const API_URL = 'https://restaurant-website-production-e3b2.up.railway.app/api';

const sampleMenuItems = [
  { _id: '1', name: 'Truffle Risotto', category: 'Italian', price: 28, currency: 'USD', description: 'Creamy arborio rice with wild mushrooms, black truffle, and parmesan.', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80', isFeatured: true },
  { _id: '2', name: 'Margherita Pizza', category: 'Italian', price: 18, currency: 'USD', description: 'Hand-tossed dough with San Marzano tomatoes, fresh mozzarella, and basil.', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80', isFeatured: false },
  { _id: '3', name: 'Fettuccine Alfredo', category: 'Italian', price: 22, currency: 'USD', description: 'Homemade fettuccine in a rich parmesan cream sauce with garlic bread.', image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800&q=80', isFeatured: false },
  { _id: '4', name: 'Bruschetta Trio', category: 'Italian', price: 14, currency: 'USD', description: 'Toasted ciabatta with tomato basil, mushroom truffle, and roasted pepper toppings.', image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&q=80', isFeatured: false },
  { _id: '5', name: 'Kung Pao Shrimp', category: 'Chinese', price: 24, currency: 'USD', description: 'Wok-seared jumbo shrimp with Szechuan peppercorns, peanuts, and dried chilies.', image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&q=80', isFeatured: true },
  { _id: '6', name: 'Peking Duck', category: 'Chinese', price: 36, currency: 'USD', description: 'Crispy roasted duck served with pancakes, hoisin sauce, and spring onions.', image: 'https://images.unsplash.com/photo-1569058242567-93de6f36f8e6?w=400&q=80', isFeatured: false },
  { _id: '7', name: 'Dim Sum Platter', category: 'Chinese', price: 20, currency: 'USD', description: 'Assorted steamed dumplings with pork, shrimp, and vegetable fillings.', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80', isFeatured: false },
  { _id: '8', name: 'Szechuan Noodles', category: 'Chinese', price: 16, currency: 'USD', description: 'Hand-pulled noodles tossed in spicy Szechuan sauce with minced pork.', image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&q=80', isFeatured: false },
  { _id: '9', name: 'Grilled Lamb Chops', category: 'Continental', price: 38, currency: 'USD', description: 'Herb-crusted New Zealand lamb racks served with rosemary jus and seasonal vegetables.', image: 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?w=400&q=80', isFeatured: true },
  { _id: '10', name: 'Beef Wellington', category: 'Continental', price: 45, currency: 'USD', description: 'Prime beef fillet wrapped in puff pastry with mushroom duxelles and prosciutto.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80', isFeatured: false },
  { _id: '11', name: 'Grilled Salmon', category: 'Continental', price: 32, currency: 'USD', description: 'Atlantic salmon with lemon butter sauce, asparagus, and herb potatoes.', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80', isFeatured: false },
  { _id: '12', name: 'French Onion Soup', category: 'Continental', price: 14, currency: 'USD', description: 'Classic French onion soup with caramelized onions, gruyere crouton.', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80', isFeatured: false },
  { _id: '13', name: 'Tacos al Pastor', category: 'Mexican', price: 18, currency: 'USD', description: 'Marinated pork with pineapple, cilantro, and onion on warm corn tortillas.', image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=80', isFeatured: false },
  { _id: '14', name: 'Nachos Supreme', category: 'Mexican', price: 16, currency: 'USD', description: 'Crispy tortilla chips loaded with cheese, jalapenos, guacamole, and sour cream.', image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&q=80', isFeatured: false },
  { _id: '15', name: 'Chicken Enchiladas', category: 'Mexican', price: 20, currency: 'USD', description: 'Corn tortillas filled with spiced chicken, topped with mole sauce and cheese.', image: 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=400&q=80', isFeatured: false },
  { _id: '16', name: 'Guacamole & Chips', category: 'Mexican', price: 12, currency: 'USD', description: 'Fresh tableside guacamole with lime, cilantro, and crispy tortilla chips.', image: 'https://images.unsplash.com/photo-1600335895229-6bf48dc309df?w=400&q=80', isFeatured: false },
  { _id: '17', name: 'Mixed Grill Platter', category: 'Arabic', price: 32, currency: 'USD', description: 'Assorted grilled meats with saffron rice, hummus, and grilled vegetables.', image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=400&q=80', isFeatured: true },
  { _id: '18', name: 'Lamb Shawarma', category: 'Arabic', price: 18, currency: 'USD', description: 'Slow-roasted spiced lamb wrapped in pita with garlic sauce and pickles.', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80', isFeatured: false },
  { _id: '19', name: 'Hummus & Falafel', category: 'Arabic', price: 15, currency: 'USD', description: 'Creamy chickpea hummus with crispy falafel, tahini, and warm pita bread.', image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&q=80', isFeatured: false },
  { _id: '20', name: 'Kebab Platter', category: 'Arabic', price: 26, currency: 'USD', description: 'Beef and chicken kebabs with grilled peppers, onions, and herb rice.', image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&q=80', isFeatured: false },
  { _id: '21', name: 'Butter Chicken', category: 'Indian', price: 22, currency: 'USD', description: 'Tender chicken in a rich, creamy tomato sauce with fenugreek and aromatic spices.', image: 'https://images.unsplash.com/photo-1588166524941-3b5a88622eb5?w=800&q=80', isFeatured: false },
  { _id: '22', name: 'Biryani Royal', category: 'Indian', price: 24, currency: 'USD', description: 'Layered basmati rice with marinated chicken, saffron, caramelized onions, and raita.', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80', isFeatured: false },
  { _id: '23', name: 'Paneer Tikka', category: 'Indian', price: 18, currency: 'USD', description: 'Grilled cottage cheese marinated in spiced yogurt with mint chutney.', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80', isFeatured: false },
  { _id: '24', name: 'Dal Makhani', category: 'Indian', price: 16, currency: 'USD', description: 'Slow-cooked black lentils in creamy butter sauce with garlic naan.', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80', isFeatured: false },
  { _id: '25', name: 'Tiramisu', category: 'Desserts', price: 14, currency: 'USD', description: 'Classic Italian layered dessert with espresso-soaked ladyfingers, mascarpone cream, and cocoa.', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80', isFeatured: true },
  { _id: '26', name: 'Classic Martini', category: 'Cocktails', price: 16, currency: 'USD', description: 'Premium gin or vodka with dry vermouth, garnished with an olive or lemon twist.', image: 'https://images.unsplash.com/photo-1577665014173-53394003b59b?w=800&q=80', isFeatured: false },
  { _id: '27', name: 'Old Fashioned', category: 'Cocktails', price: 18, currency: 'USD', description: 'Bourbon with sugar, bitters, and an orange peel over a large ice cube.', image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80', isFeatured: false },
  { _id: '28', name: 'Mojito Classic', category: 'Cocktails', price: 14, currency: 'USD', description: 'White rum muddled with fresh mint, lime juice, sugar, and soda water.', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80', isFeatured: false },
  { _id: '29', name: 'Espresso Martini', category: 'Cocktails', price: 16, currency: 'USD', description: 'Vodka with freshly brewed espresso, coffee liqueur, and simple syrup.', image: 'https://images.unsplash.com/photo-1575023782549-62ca0d244b39?w=400&q=80', isFeatured: false },
  { _id: '30', name: 'Berry Bliss', category: 'Mocktails', price: 10, currency: 'USD', description: 'Fresh muddled berries, mint, lime juice, and sparkling water over ice.', image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&q=80', isFeatured: false },
  { _id: '31', name: 'Sunset Cooler', category: 'Mocktails', price: 10, currency: 'USD', description: 'Mango, passion fruit, and ginger ale with a splash of lime and mint.', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80', isFeatured: false },
  { _id: '32', name: 'Virgin Pina Colada', category: 'Mocktails', price: 12, currency: 'USD', description: 'Creamy coconut milk blended with fresh pineapple and crushed ice.', image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80', isFeatured: false },
  { _id: '33', name: 'Blue Lagoon', category: 'Mocktails', price: 10, currency: 'USD', description: 'Blue curacao syrup, lemonade, and soda with a cherry garnish.', image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400&q=80', isFeatured: false },
  { _id: '34', name: 'Chardonnay', category: 'Wines', price: 14, currency: 'USD', description: 'Crisp and buttery California Chardonnay with notes of vanilla and oak.', image: 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=800&q=80', isFeatured: false },
  { _id: '35', name: 'Cabernet Sauvignon', category: 'Wines', price: 16, currency: 'USD', description: 'Full-bodied red wine with dark fruit flavors and a smooth finish.', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80', isFeatured: false },
  { _id: '36', name: 'Prosecco', category: 'Wines', price: 12, currency: 'USD', description: 'Sparkling Italian wine with crisp apple and pear notes, perfect for celebrations.', image: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?w=400&q=80', isFeatured: false },
  { _id: '37', name: 'Heineken', category: 'Beers', price: 8, currency: 'USD', description: 'Premium Dutch lager with a balanced, refreshing taste.', image: 'https://images.unsplash.com/photo-1586994930631-4bd3a01b4c2d?w=800&q=80', isFeatured: false },
  { _id: '38', name: 'Stella Artois', category: 'Beers', price: 9, currency: 'USD', description: 'Belgian pilsner with a crisp, hoppy flavor and golden color.', image: 'https://images.unsplash.com/photo-1608270586620-1b9ff704e0e0?w=400&q=80', isFeatured: false },
  { _id: '39', name: 'Blue Moon', category: 'Beers', price: 9, currency: 'USD', description: 'Belgian-style wheat ale with orange peel and coriander, served with an orange slice.', image: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?w=400&q=80', isFeatured: false },
];

function getCurrencySymbol(currency) {
  const symbols = { USD: '$', EUR: '€', GBP: '£', AED: 'د.إ', PKR: '₨', INR: '₹' };
  return symbols[currency] || '$';
}

let currentOrderItem = null;

function openOrderModal(item) {
  currentOrderItem = item;
  document.getElementById('modalItemInfo').textContent = `Order: ${item.name} — ${getCurrencySymbol(item.currency)}${item.price} each`;
  document.getElementById('orderItemName').value = item.name;
  document.getElementById('orderItemPrice').value = item.price;
  document.getElementById('orderQuantity').value = 1;
  document.getElementById('orderName').value = '';
  document.getElementById('orderGender').value = '';
  document.getElementById('orderFormMessage').style.display = 'none';
  document.getElementById('orderModal').style.display = 'flex';
}

function closeOrderModal() {
  document.getElementById('orderModal').style.display = 'none';
  currentOrderItem = null;
}

function renderMenuItems(items, containerId = 'menuGrid') {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!items.length) {
    container.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--text-muted);"><i class="fas fa-utensils" style="font-size:40px;margin-bottom:15px;color:var(--primary);"></i><p>No items found in this category.</p></div>';
    return;
  }

  container.innerHTML = items.map((item, index) => `
    <div class="menu-item" data-category="${item.category}" data-aos="fade-up" data-aos-delay="${(index % 9) * 50}">
      <div class="menu-item-image">
        <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'">
        <span class="menu-item-category">${item.category}</span>
      </div>
      <div class="menu-item-body">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="menu-item-footer">
          <span class="menu-item-price">${getCurrencySymbol(item.currency)}${item.price}</span>
          <button class="btn btn-primary menu-order-btn" onclick='openOrderModal(${JSON.stringify(item).replace(/'/g, "\\'")})'>
            <i class="fas fa-shopping-cart"></i> Order
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

async function fetchMenuItems(category = 'all') {
  const container = document.getElementById('menuGrid');
  if (container) {
    container.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--text-muted);"><i class="fas fa-spinner fa-spin" style="font-size:30px;margin-bottom:15px;"></i><p>Loading our exquisite menu...</p></div>';
  }

  try {
    const url = category === 'all' ? `${API_URL}/menu` : `${API_URL}/menu?category=${category}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.success && data.data.length) {
      renderMenuItems(data.data);
    } else {
      renderMenuItems(sampleMenuItems.filter(item => category === 'all' || item.category === category));
    }
  } catch {
    const filtered = sampleMenuItems.filter(item => category === 'all' || item.category === category);
    renderMenuItems(filtered);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const menuGrid = document.getElementById('menuGrid');
  const featuredMenu = document.getElementById('featuredMenu');
  const orderModal = document.getElementById('orderModal');
  const modalClose = document.getElementById('modalClose');
  const orderForm = document.getElementById('orderForm');

  if (menuGrid) {
    const activeTab = document.querySelector('.menu-tab.active');
    const category = activeTab ? activeTab.dataset.category : 'all';
    fetchMenuItems(category);
  }

  if (featuredMenu) {
    const featured = sampleMenuItems.filter(item => item.isFeatured);
    renderMenuItems(featured, 'featuredMenu');
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeOrderModal);
  }

  if (orderModal) {
    orderModal.addEventListener('click', (e) => {
      if (e.target === orderModal) closeOrderModal();
    });
  }

  if (orderForm) {
    orderForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const customerName = document.getElementById('orderName').value.trim();
      const customerGender = document.getElementById('orderGender').value;
      const quantity = parseInt(document.getElementById('orderQuantity').value);
      const itemName = document.getElementById('orderItemName').value;
      const itemPrice = parseFloat(document.getElementById('orderItemPrice').value);

      if (!customerName || !customerGender || !quantity || !itemName) {
        document.getElementById('orderFormMessage').style.display = 'block';
        document.getElementById('orderFormMessage').innerHTML = '<div style="padding:15px;background:rgba(220,53,69,0.1);border:1px solid rgba(220,53,69,0.3);border-radius:5px;color:#dc3545;"><i class="fas fa-exclamation-circle"></i> Please fill all fields.</div>';
        return;
      }

      const submitBtn = orderForm.querySelector('button[type="submit"]');
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Placing Order...';
      submitBtn.disabled = true;

      const orderData = { customerName, customerGender, itemName, itemPrice, quantity };

      try {
        const res = await fetch(`${API_URL}/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        });
        const data = await res.json();

        if (data.success) {
          closeOrderModal();
          Swal.fire({
            icon: 'success',
            title: 'Order Placed!',
            text: `${itemName} x${quantity} has been ordered successfully.`,
            background: '#12121a',
            color: '#f5f5f5',
            confirmButtonColor: '#c9a84c',
            iconColor: '#28a745',
          });
        } else {
          document.getElementById('orderFormMessage').style.display = 'block';
          document.getElementById('orderFormMessage').innerHTML = '<div style="padding:15px;background:rgba(220,53,69,0.1);border:1px solid rgba(220,53,69,0.3);border-radius:5px;color:#dc3545;"><i class="fas fa-exclamation-circle"></i> ' + data.message + '</div>';
        }
      } catch {
        closeOrderModal();
        Swal.fire({
          icon: 'success',
          title: 'Order Placed!',
          text: `${itemName} x${quantity} has been ordered successfully.`,
          background: '#12121a',
          color: '#f5f5f5',
          confirmButtonColor: '#c9a84c',
          iconColor: '#28a745',
        });
      }

      submitBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> Place Order';
      submitBtn.disabled = false;
    });
  }
});
