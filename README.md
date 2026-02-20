# Xyzon LMS Portal 🎓

A comprehensive Learning Management System (LMS) built with the **MERN Stack** (MongoDB, Express, React, Node.js) and **MySQL**.

## Project Overview
- **Domain**: Full Stack Development, MERN Stack, Web Development
- **Objective**: Create a professional LMS Portal with essential learning management pages and a seamless working flow.

---

## 🏗️ Pages Built
- **Home Page**: Premium landing page with hero sections, statistics, and course categories.
- **Student Login Page**: Secure authentication interface with JWT integration.
- **Student Dashboard**: Personalized view for students to track progress and stats.
- **Course Listing Page**: Global catalog with real-time search and category filtering.
- **Course Detail Page**: High-converting detail view with curriculum and instructor info.

---

## 🔄 Functional Flow
1. **Explore**: User lands on the LMS Home Page and explores available categories.
2. **Access**: User clicks "Explore Courses" to see the full catalog.
3. **Authentication**: User logs in as a student to access the dashboard.
4. **Learning**: After login, the personal Dashboard opens with live progress.
5. **Discovery**: Clicking any course opens the Course Detail page with localized INR (₹) pricing.

---

## 🗓️ Day-wise Roadmap

### Day 1: Setup ⚙️
- Created LMS project structure (Backend & Frontend).
- Setup Node.js/Express environment.
- established MySQL database connection using Sequelize.

### Day 2: Authentication 🔐
- Developed the Student Login Page UI.
- Implemented the Login Backend API with JWT.
- Connected authentication with the live Student database.

### Day 3: LMS Home Page 🏠
- Built a premium LMS Home Page UI using Tailwind CSS.
- Added a responsive navigation structure.

### Day 4: Dashboard 📊
- Created the Student Dashboard UI for progress tracking.
- Developed the Dashboard API to serve student-specific statistics.

### Day 5: Courses Module 📚
- Built the Course Listing Page (Catalog).
- Created and seeded the `AvailableCourses` database table.
- Implemented the API to fetch global course data.

### Day 6: Course Detail 📖
- Designed a high-end Course Detail Page UI.
- Implemented the backend API to serve specific course metadata.
- Integrated dynamic routing to link Catalog cards to Details.

### Day 7: Integration 🔄
- Audited all frontend-backend connections.
- Localized the platform to Indian Rupees (₹) and low-cost pricing.
- Verified the end-to-end user journey: Home → Catalog → Login → Dashboard.

---

## 🛠️ Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Lucide React
- **Backend**: Node.js, Express.js
- **Database**: MySQL (Sequelize ORM)
- **Auth**: JWT (JSON Web Tokens), Bcrypt.js

---

## 🚀 Getting Started
1. **Clone the repo**
2. **Backend**: `cd backend && npm install && node seed.js && npm run dev`
3. **Frontend**: `cd frontend && npm install && npm run dev`
