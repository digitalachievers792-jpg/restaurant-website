# Royal Oak - Premium Restaurant & Bar Website

A premium, fully animated restaurant and bar website built with modern web technologies.

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- GSAP (GreenSock Animation Platform) for scroll animations
- Font Awesome 6 for icons
- Google Fonts (Playfair Display, Poppins)

### Backend
- Node.js + Express.js
- MongoDB with Mongoose ODM
- Nodemailer for email notifications

## Features

- **Premium Design**: Dark theme with gold accents, elegant typography
- **Full Animations**: GSAP-powered scroll animations, parallax effects, particle backgrounds
- **Responsive**: Fully responsive across mobile, tablet, and desktop
- **Dynamic Menu**: Menu items fetched from backend API with category filtering
- **Reservation System**: Online booking form with database storage
- **Contact Form**: Store inquiries and send email notifications
- **Admin Panel**: Manage menu items (add, edit, delete)
- **Dark/Light Mode**: Theme toggle with persistence
- **Multi-language**: Language selector (EN, AR, FR, ES)
- **Floating Contact**: WhatsApp and call buttons
- **Loading Animation**: Premium loader on page entry
- **Testimonials Slider**: Auto-rotating customer reviews

## Project Structure

```
restaurant-website/
├── frontend/          # Client-side files
│   ├── index.html
│   ├── about.html
│   ├── menu.html
│   ├── gallery.html
│   ├── reservation.html
│   ├── contact.html
│   ├── css/
│   ├── js/
│   └── images/
├── backend/           # Server-side API
│   ├── server.js
│   ├── config/
│   ├── models/
│   ├── routes/
│   └── controllers/
├── admin-panel/       # Management dashboard
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)

### Backend Setup
```bash
cd backend
npm install
```
Edit `.env` with your MongoDB URI and email credentials.

```bash
npm run dev
```

### Frontend
Open any HTML file in `frontend/` directly in a browser, or serve via a static server.

## API Endpoints

| Method | Endpoint              | Description            |
|--------|-----------------------|------------------------|
| GET    | /api/menu             | Get all menu items     |
| GET    | /api/menu?category=X  | Filter by category     |
| GET    | /api/menu/:id         | Get single item        |
| POST   | /api/menu             | Create menu item       |
| PUT    | /api/menu/:id         | Update menu item       |
| DELETE | /api/menu/:id         | Delete menu item       |
| POST   | /api/reservations     | Create reservation     |
| GET    | /api/reservations     | Get reservations       |
| POST   | /api/contact          | Submit contact form    |
| GET    | /api/contact          | Get contact messages   |
| GET    | /api/health           | Health check           |

## Admin Panel
Open `admin-panel/index.html` to manage menu items. Supports offline mode with localStorage fallback.

## Currency Display
Customizable currency symbols per menu item (USD, EUR, GBP, AED, PKR, INR).
