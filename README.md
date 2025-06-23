# 🏡 FindHome - Property Booking and Management Platform

A full-stack application that enables users to rent or buy properties, and owners to list and manage properties. Features include authentication, payments via Stripe, reviews, panoramic room views, wishlist, and admin dashboards.

---

## 🚀 Features

### 🔒 User & Owner Authentication

- JWT-based authentication for both users and property owners
- Role-based access
- Password reset via email (OTP link)

### 🏡 Property Management

- Owners can upload property details with images
- Upload multiple panoramic views
- Update or delete listings
- Real-time property booking status

### 🗓️ Booking System

- Book properties for rent or purchase
- Optional rental duration (short, medium, long-term)
- Users can view bookings in their dashboard
- Email booking confirmation

### 💳 Payment Integration

- Stripe payment support for property booking
- Stores payment metadata with property and user info

### 🌟 Wishlist

- Users can add/remove properties to/from wishlist
- View count and details of all favorite properties

### 📝 Reviews

- Authenticated users can leave reviews after booking
- Reviews stored and displayed per property

---

## 🧱 Tech Stack

| Frontend | Backend           | Database | Payment | Auth       |
| -------- | ----------------- | -------- | ------- | ---------- |
| React.js | Node.js + Express | MongoDB  | Stripe  | JWT (Auth) |

---

## 📂 Project Structure (Backend)

```
├── config/
│   └── db.js
├── controllers/
│   ├── jwtHelper.js
│   ├── jwtOwnerHelper.js
│   └── resetController.js
├── middleware/
│   ├── ownerProfileUpload.js
│   ├── panoramicUpload.js
├── models/
│   ├── user.js
│   ├── owner.js
│   ├── homeSchema.js
│   ├── bookingScema.js
│   ├── paymentSchema.js
│   ├── favorite.js
│   └── propertySchema.js
├── routes/
│   ├── userRegistration.js
│   ├── ownerRegistration.js
│   ├── home.js
│   ├── posthome.js
│   ├── homeBooking.js
│   ├── propertyBooking.js
│   ├── review.js
│   ├── favorite.js
│   ├── checkWishList.js
│   ├── cancelBooking.js
│   ├── deleteProperty.js
│   ├── homeUpdate.js
│   ├── panoramicUpload.js
│   ├── login.js
│   ├── ownerLogin.js
│   ├── resetPasswordUser.js
│   ├── resetPasswordOwner.js
│   └── manageCustomer.js
├── uploads/
│   └── panoramic-uploads-pics/
├── server.js
└── .env
```

---

## 🔧 Environment Variables (.env)

Create a `.env` file in the root of your backend with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
GMAIL_NAME=your_email@gmail.com
APP_PASS_GOOGLE=your_gmail_app_password
```

---

## 🛠️ Installation & Setup

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/findhome.git
cd findhome
```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Run the server

```bash
npm run dev  # or node server.js
```

### 4. Frontend (Optional)

If using React frontend:

```bash
cd client
npm install
npm run dev
```

---

## 📬 API Endpoints (Sample)

| Route                  | Method | Description                   |
| ---------------------- | ------ | ----------------------------- |
| `/list/register`       | POST   | Owner registration with image |
| `/user/register`       | POST   | User registration             |
| `/login`               | POST   | User login                    |
| `/owner/login`         | POST   | Owner login                   |
| `/home/post`           | POST   | Post a new home               |
| `/home/info/:id`       | GET    | Get full home details         |
| `/reserve/:id`         | POST   | Book a home                   |
| `/property/book`       | POST   | Buy/rent property request     |
| `/payment`             | POST   | Create Stripe Payment Intent  |
| `/owner/properties`    | GET    | Get all owner properties      |
| `/owner/manage`        | GET    | Get all bookings for owner    |
| `/review`              | POST   | Post a review                 |
| `/favorite`            | POST   | Add property to wishlist      |
| `/find-wish-list`      | GET    | Get wishlist count + IDs      |
| `/owner/delete/:id`    | DELETE | Delete a property             |
| `/owner/update/:id`    | PATCH  | Update property field         |
| `/owner/panoramic/:id` | PATCH  | Upload panoramic images       |

---

## 🧰 Author

**Dwiden Brahma**

> FindHome Project · MERN Stack Developer
> [GitHub](https://github.com/Dwidenbrahma)

---

Frontend (Vercel): [https://findhome-frontend.vercel.app](https://findhome-frontend-naqjhk7u4-dwidens-projects.vercel.app/)  
Frontend (GitHub): [FindHome Backend](https://github.com/Dwidenbrahma/findhome-frontend)
