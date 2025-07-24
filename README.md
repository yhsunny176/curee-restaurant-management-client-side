# CUREE Restaurant Project

## 1. Introduction
CUREE is a modern restaurant web application designed to streamline food ordering, sharing, and management for both customers and restaurant owners. The goal is to provide a seamless experience for discovering, purchasing, and managing food items online. This website helps users by offering easy food browsing, secure ordering, and efficient management of personal food items and orders.

**Live Website:** https://curee-web.web.app

## 2. Features & Pages
The project consists of several interactive pages:

| Page Name      | Description |
| -------------- | ----------- |
| Home           | Landing page with featured foods, banners, and navigation. |
| All Foods      | Browse all available food items, search and filter. |
| Gallery        | View food images in a lightbox gallery. |
| Add Food       | Authenticated users can add new food items. |
| My Foods       | Authenticated users can view and update their own added foods. |
| Food Detail    | Detailed view of a selected food item. |
| Order Food     | Securely purchase a food item (authenticated only). |
| My Orders      | View and manage your own orders. |
| Login/Register | Authentication pages for user sign-in and registration. |

**Page Details:**
- **Home:** Highlights top food items, banners, and navigation links.
- **All Foods:** Displays all foods with search functionality.
- **Gallery:** Interactive gallery of food images.
- **Add Food:** Form for adding new food items (requires login).
- **My Foods:** List and update foods added by the logged-in user.
- **Food Details:** Shows details of a selected food item.
- **Order Food:** Allows users to buy food securely.
- **My Orders:** Shows user's order history and allows order deletion.
- **Login/Register:** User authentication via email/password or Google.

## 3. How to Run This Project

### Prerequisites
- Node.js & npm installed
- Firebase project setup (for authentication & hosting)
- MongoDB database (for server)

### Client Side (React)
1. Navigate to the client folder:
   ```bash
   cd b11a11-client-side-yhsunny176
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Access the app at `http://localhost:5173`

### Server Side (Node.js/Express)
1. Navigate to the server folder:
   ```bash
   cd ../b11a11-server-side-yhsunny176
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file (MongoDB URI, Firebase Admin credentials).
4. Start the server:
   ```bash
   npm run dev
   ```
5. Server runs at `http://localhost:5000`

## 4. Packages Used

| Package Name                | Purpose |
|-----------------------------|---------|
| react                       | Core UI library |
| react-router                | Routing between pages |
| axios                       | HTTP requests |
| firebase                    | Authentication & hosting |
| @tanstack/react-query       | Data fetching & caching |
| sweetalert2, react-toastify | User notifications |
| moment                      | Date formatting |
| swiper, react-fast-marquee  | UI carousels & sliders |
| lucide-react, react-icons   | Icon libraries |
| yet-another-react-lightbox  | Gallery lightbox |
| tailwindcss, daisyui        | Styling & UI components |
| @hugeicons/react            | Additional icons & class management |

**Server Side:**

| Package Name      | Purpose |
|-------------------|---------|
| express           | Web server framework |
| cors              | Cross-origin requests |
| dotenv            | Environment variables |
| mongodb           | Database driver |
| firebase-admin    | Server-side authentication |
| nodemon           | Development auto-reload |
| cookie-parser     | Cookie handling |
| jsonwebtoken      | JWT handling |

## 5. Authentication & Security
- **Authentication:** Uses Firebase Authentication for secure login/registration (email/password & Google OAuth).
- **JWT Security:** Client stores JWT tokens; server verifies tokens for protected routes.
- **Protected Routes:** Only authenticated users can add foods, purchase, or view personal data.
- **Role-based Access:** Users can only update/delete their own foods/orders.
- **Input Validation:** Forms validate user input for security and data integrity.
- **CORS:** Server restricts allowed origins for API access.

## 6. Conclusion
CUREE Restaurant Project is a full-stack web application that provides a secure, user-friendly platform for food sharing and ordering. It demonstrates modern React, Firebase, and Node.js/Express best practices, with robust authentication and a clean, responsive UI. Perfect for learning or deploying a restaurant management solution.