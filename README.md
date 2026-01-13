# 🥅 Goal - Sports Indoor Club Management System

Goal is a modern, full-featured indoor club management system built with the MERN stack. It allows users to explore and book sports courts, apply coupons, manage their bookings, and make secure payments, while admins can manage the full system including courts, members, announcements, and more.

----

## 🖼️ Screenshot

![HobbyHub Screenshot](https://i.ibb.co/39kN4Mtq/Whats-App-Image-1.jpg) <!-- Replace with actual image URL -->

---
---
# Getting Started Locally

# git clone https://github.com/Abdulaliarafat/Goal-sports-client
 
 --
# cd Goal-sports-client
# npm install
# npm run dev


## 🌍 Live Site

🔗 **Frontend:** [https://goal-sports-booking.netlify.app/](https://goal-sports-booking.netlify.app/)  
🔗 **Backend:** [https://assignment-12-server-red-theta.vercel.app/](https://assignment-12-server-red-theta.vercel.app/) <!-- change if needed -->
<!-- change if needed -->

---

## 👨‍💼 Admin Credentials

- **Email:** `arafat@gmail.com`  
- **Password:** `123456`

---
## 📄 Pages Overview

| Page | Description |
|------|-------------|
| `/` | Home page with rotating banner, about section, location map, and featured coupons |
| `/courts` | Browse and book indoor courts (with filtering and slot/time selection) |
| `/login` | Secure login for users and admins |
| `/register` | User registration with Firebase |
| `/dashboard` | Role-based dashboards (User / Member / Admin) |
| `*` | Custom 404 Page Not Found |

---
---

## 🔥 Key Features

- 🔐 Firebase authentication (Register/Login)
- 📍 Role-based route protection (User, Member, Admin)
- 🏟️ View & Book courts with time slot selection
- ⏳ Booking approval system (Pending → Approved → Confirmed)
- 💳 Secure payment via Stripe
- 🎟️ Coupon system with auto-expiry and discount
- 📣 Announcements from admin for all users
- 📊 Admin dashboard to manage courts, bookings, members, coupons
- 🧾 Payment history and booking summaries for users
- 📱 Responsive layout with modern UI/UX

---

## 🧪 Tech Stack

| Layer         | Technology Used | Badges |
|---------------|------------------|--------|
| **Frontend**  | React, React Router, Tailwind CSS, DaisyUI | ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-0EA5E9?style=for-the-badge&logo=tailwind-css&logoColor=white) ![DaisyUI](https://img.shields.io/badge/DaisyUI-%23F4D03F?style=for-the-badge&logo=tailwind-css&logoColor=white) |
| **Backend**   | Node.js, Express.js, MongoDB | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) |
| **Auth**      | Firebase | ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black) |
| **Payments**  | Stripe | ![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white) |
| **State Mgt** | React Query | ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white) |
| **UI Effects**| Framer Motion, SweetAlert2 | ![Framer Motion](https://img.shields.io/badge/Framer_Motion-EF476F?style=for-the-badge&logo=framer&logoColor=white) ![SweetAlert2](https://img.shields.io/badge/SweetAlert2-FF5C8D?style=for-the-badge&logo=alert&logoColor=white) |
| **Deploy**    | Netlify (Frontend), Vercel/Render (Backend) | ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white) |


## 🔐 Authentication & Security

- 🔒 Firebase-based Email/Password Authentication
- 👤 Role-based Authorization (User, Member, Admin)
- 🔐 Secure Route Protection with `PrivateRoute` and `AdminRoute`
- 🚫 Automatic redirection for unauthorized access
- 🛡️ Backend verifies roles before executing sensitive actions
- 💬 SweetAlert2 prompts for confirmations and alerts

---
## 📦 Dependencies

```bash
"@headlessui/react"
"@heroicons/react"
"@tanstack/react-query"
"axios"
"daisyui"
"firebase"
"framer-motion"
"react"
"react-dom"
"react-hook-form"
"react-icons"
"react-router-dom"
"react-toastify"
"swiper"
"vite"
"TanStackQuery"
