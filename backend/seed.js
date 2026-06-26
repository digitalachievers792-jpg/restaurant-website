const { pool } = require('./config/db');

const menuData = [
  ['Truffle Risotto', 'Italian', 28, 'USD', 'Creamy arborio rice with wild mushrooms, black truffle, and parmesan.', 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80', true],
  ['Margherita Pizza', 'Italian', 18, 'USD', 'Hand-tossed dough with San Marzano tomatoes, fresh mozzarella, and basil.', 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80', false],
  ['Fettuccine Alfredo', 'Italian', 22, 'USD', 'Homemade fettuccine in a rich parmesan cream sauce with garlic bread.', 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800&q=80', false],
  ['Bruschetta Trio', 'Italian', 14, 'USD', 'Toasted ciabatta with tomato basil, mushroom truffle, and roasted pepper toppings.', 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&q=80', false],
  ['Kung Pao Shrimp', 'Chinese', 24, 'USD', 'Wok-seared jumbo shrimp with Szechuan peppercorns, peanuts, and dried chilies.', 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80', true],
  ['Peking Duck', 'Chinese', 36, 'USD', 'Crispy roasted duck served with pancakes, hoisin sauce, and spring onions.', 'https://images.unsplash.com/photo-1569058242567-93de6f36f8e6?w=800&q=80', false],
  ['Dim Sum Platter', 'Chinese', 20, 'USD', 'Assorted steamed dumplings with pork, shrimp, and vegetable fillings.', 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80', false],
  ['Szechuan Noodles', 'Chinese', 16, 'USD', 'Hand-pulled noodles tossed in spicy Szechuan sauce with minced pork.', 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&q=80', false],
  ['Grilled Lamb Chops', 'Continental', 38, 'USD', 'Herb-crusted New Zealand lamb racks served with rosemary jus and seasonal vegetables.', 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?w=800&q=80', true],
  ['Beef Wellington', 'Continental', 45, 'USD', 'Prime beef fillet wrapped in puff pastry with mushroom duxelles and prosciutto.', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80', false],
  ['Grilled Salmon', 'Continental', 32, 'USD', 'Atlantic salmon with lemon butter sauce, asparagus, and herb potatoes.', 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80', false],
  ['French Onion Soup', 'Continental', 14, 'USD', 'Classic French onion soup with caramelized onions, gruyere crouton.', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80', false],
  ['Tacos al Pastor', 'Mexican', 18, 'USD', 'Marinated pork with pineapple, cilantro, and onion on warm corn tortillas.', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80', false],
  ['Nachos Supreme', 'Mexican', 16, 'USD', 'Crispy tortilla chips loaded with cheese, jalapenos, guacamole, and sour cream.', 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800&q=80', false],
  ['Chicken Enchiladas', 'Mexican', 20, 'USD', 'Corn tortillas filled with spiced chicken, topped with mole sauce and cheese.', 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=800&q=80', false],
  ['Guacamole & Chips', 'Mexican', 12, 'USD', 'Fresh tableside guacamole with lime, cilantro, and crispy tortilla chips.', 'https://images.unsplash.com/photo-1600335895229-6bf48dc309df?w=800&q=80', false],
  ['Mixed Grill Platter', 'Arabic', 32, 'USD', 'Assorted grilled meats with saffron rice, hummus, and grilled vegetables.', 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=800&q=80', true],
  ['Lamb Shawarma', 'Arabic', 18, 'USD', 'Slow-roasted spiced lamb wrapped in pita with garlic sauce and pickles.', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80', false],
  ['Hummus & Falafel', 'Arabic', 15, 'USD', 'Creamy chickpea hummus with crispy falafel, tahini, and warm pita bread.', 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=800&q=80', false],
  ['Kebab Platter', 'Arabic', 26, 'USD', 'Beef and chicken kebabs with grilled peppers, onions, and herb rice.', 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80', false],
  ['Butter Chicken', 'Indian', 22, 'USD', 'Tender chicken in a rich, creamy tomato sauce with fenugreek and aromatic spices.', 'https://images.unsplash.com/photo-1588166524941-3b5a88622eb5?w=800&q=80', false],
  ['Biryani Royal', 'Indian', 24, 'USD', 'Layered basmati rice with marinated chicken, saffron, caramelized onions, and raita.', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80', false],
  ['Paneer Tikka', 'Indian', 18, 'USD', 'Grilled cottage cheese marinated in spiced yogurt with mint chutney.', 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=80', false],
  ['Dal Makhani', 'Indian', 16, 'USD', 'Slow-cooked black lentils in creamy butter sauce with garlic naan.', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80', false],
  ['Tiramisu', 'Desserts', 14, 'USD', 'Classic Italian layered dessert with espresso-soaked ladyfingers, mascarpone cream, and cocoa.', 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80', true],
  ['Classic Martini', 'Cocktails', 16, 'USD', 'Premium gin or vodka with dry vermouth, garnished with an olive or lemon twist.', 'https://images.unsplash.com/photo-1577665014173-53394003b59b?w=800&q=80', false],
  ['Old Fashioned', 'Cocktails', 18, 'USD', 'Bourbon with sugar, bitters, and an orange peel over a large ice cube.', 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80', false],
  ['Mojito Classic', 'Cocktails', 14, 'USD', 'White rum muddled with fresh mint, lime juice, sugar, and soda water.', 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80', false],
  ['Espresso Martini', 'Cocktails', 16, 'USD', 'Vodka with freshly brewed espresso, coffee liqueur, and simple syrup.', 'https://images.unsplash.com/photo-1575023782549-62ca0d244b39?w=800&q=80', false],
  ['Berry Bliss', 'Mocktails', 10, 'USD', 'Fresh muddled berries, mint, lime juice, and sparkling water over ice.', 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&q=80', false],
  ['Sunset Cooler', 'Mocktails', 10, 'USD', 'Mango, passion fruit, and ginger ale with a splash of lime and mint.', 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80', false],
  ['Virgin Pina Colada', 'Mocktails', 12, 'USD', 'Creamy coconut milk blended with fresh pineapple and crushed ice.', 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&q=80', false],
  ['Blue Lagoon', 'Mocktails', 10, 'USD', 'Blue curacao syrup, lemonade, and soda with a cherry garnish.', 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=800&q=80', false],
  ['Chardonnay', 'Wines', 14, 'USD', 'Crisp and buttery California Chardonnay with notes of vanilla and oak.', 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=800&q=80', false],
  ['Cabernet Sauvignon', 'Wines', 16, 'USD', 'Full-bodied red wine with dark fruit flavors and a smooth finish.', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80', false],
  ['Prosecco', 'Wines', 12, 'USD', 'Sparkling Italian wine with crisp apple and pear notes, perfect for celebrations.', 'https://images.unsplash.com/photo-1559251606-c623743a6d76?w=800&q=80', false],
  ['Heineken', 'Beers', 8, 'USD', 'Premium Dutch lager with a balanced, refreshing taste.', 'https://images.unsplash.com/photo-1586994930631-4bd3a01b4c2d?w=800&q=80', false],
  ['Stella Artois', 'Beers', 9, 'USD', 'Belgian pilsner with a crisp, hoppy flavor and golden color.', 'https://images.unsplash.com/photo-1608270586620-1b9ff704e0e0?w=800&q=80', false],
  ['Blue Moon', 'Beers', 9, 'USD', 'Belgian-style wheat ale with orange peel and coriander, served with an orange slice.', 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?w=800&q=80', false],
];

async function seed() {
  const client = await pool.connect();
  try {
    console.log('Connected to PostgreSQL');
    await client.query('DELETE FROM menu_items');
    console.log('Cleared existing menu data');

    for (const item of menuData) {
      await client.query(
        'INSERT INTO menu_items (name, category, price, currency, description, image, is_featured) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        item
      );
    }
    console.log(`Seeded ${menuData.length} menu items`);
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  } finally {
    client.release();
  }
}

seed();
