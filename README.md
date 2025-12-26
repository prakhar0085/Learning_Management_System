# 🎓 Learning Management System (LMS)

> A modern, full-stack Learning Management System that empowers educators to create and sell courses while providing students with an intuitive learning experience powered by AI-enhanced search.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-19.1.0-blue)](https://reactjs.org/)
🌐 **Live Demo:** [Live Demo ](http://51.20.148.95:5173/)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)


---

## ✨ Features

### For Students
- 🔍 **AI-Powered Search** - Find courses using natural language queries powered by Google Gemini AI
- 📚 **Course Enrollment** - Browse and enroll in courses across multiple categories and difficulty levels
- 🎥 **Video Learning** - Stream course lectures with a custom video player
- ⭐ **Review System** - Rate and review courses to help other students make informed decisions
- 👤 **Personal Dashboard** - Track enrolled courses, progress, and manage your profile
- 🔐 **Secure Authentication** - JWT-based auth with Google OAuth integration
- 💳 **Seamless Payments** - Multiple payment options via Razorpay (UPI, Cards, Wallets)

### For Educators
- 📝 **Course Creation** - Build comprehensive courses with multiple lectures and rich content
- 💰 **Monetization** - Set prices and sell courses through integrated payment processing
- 📊 **Course Management** - Full CRUD operations for courses and lectures
- 🖼️ **Media Upload** - Upload thumbnails and videos with Cloudinary integration
- 📈 **Student Analytics** - Track enrollments and course performance metrics
- ✏️ **Content Editor** - Markdown support for course descriptions and lecture content

### Technical Highlights
- ⚡ Fast and responsive UI with **React 19** and **Vite**
- 🎨 Beautiful design with **Tailwind CSS**
- 🔄 Real-time state management with **Redux Toolkit**
- 💳 Secure payments via **Razorpay**
- ☁️ Cloud storage with **Cloudinary**
- 🤖 AI-enhanced search capabilities with **Google Gemini**
- 🐳 **Dockerized** for easy deployment
- 🚀 **CI/CD** pipeline with GitHub Actions
- ☁️ Deployed on **AWS EC2**

---

## 🏗️ Tech Stack

### Backend
- **Runtime:** Node.js (v16+)
- **Framework:** Express.js 5.1.0
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT + bcryptjs + Google OAuth
- **Payment Gateway:** Razorpay
- **AI Integration:** Google Generative AI (Gemini)
- **Cloud Storage:** Cloudinary
- **Email Service:** Nodemailer
- **Security:** express-rate-limit, cookie-parser, CORS
- **File Upload:** Multer

### Frontend
- **Framework:** React 19.1.0
- **Build Tool:** Vite 6.3.5
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM 7.6.2
- **Styling:** Tailwind CSS 4.1.10
- **HTTP Client:** Axios
- **Auth:** Firebase
- **UI Components:** React Icons, React Spinners, React Toastify
- **Data Visualization:** Recharts
- **Markdown Rendering:** React Markdown with remark-gfm

### DevOps & Infrastructure
- **Containerization:** Docker
- **CI/CD:** GitHub Actions
- **Hosting:** AWS EC2
- **Version Control:** Git & GitHub

---

## 🏛️ Architecture

### System Architecture
![Architecture_Diagram](LMS_Architecture.jpg).



### MVC Architecture (Backend)

```
server/
├── models/          # Database schemas (User, Course, Lecture, Order, Review)
├── controllers/     # Business logic & request handlers
├── routes/          # API endpoints & routing
├── middlewares/     # Auth, validation, error handling
├── configs/         # Database, Cloudinary, Razorpay, Email configs
└── services/        # External API integrations
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local or Atlas account) - [Get Started](https://www.mongodb.com/cloud/atlas)
- **npm** or **yarn** package manager
- **Docker** (optional, for containerized deployment) - [Download](https://www.docker.com/)

### Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/prakhar0085/Learning_Management_System.git
cd Learning_Management_System
```

#### 2️⃣ Install Backend Dependencies

```bash
cd server
npm install
```

#### 3️⃣ Install Frontend Dependencies

```bash
cd ../client
npm install
```

#### 4️⃣ Configure Environment Variables

Create `.env` files in both `client` and `server` directories. 

#### 5️⃣ Start the Application

**Option A: Run Locally**

```bash
# Terminal 1 - Start Backend Server
cd server
npm run dev
# Server runs on http://localhost:8000

# Terminal 2 - Start Frontend Development Server
cd client
npm run dev
# Client runs on http://localhost:5173
```

**Option B: Run with Docker**

```bash
# From project root directory
docker-compose up --build

# Access the application
# Frontend: http://localhost:5173
# Backend: http://localhost:8000
```

#### 6️⃣ Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

---

## 🔐 Environment Variables

### Backend (.env in `server/` directory)

```env
# Server Configuration
PORT=8000

# Database
MONGODB_URL=your_mongodb_connection_string

# JWT Authentication
JWT_SECRET=your_jwt_secret_key

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Configuration (Nodemailer)
EMAIL=your_email@gmail.com
EMAIL_PASS=your_app_specific_password

# Razorpay Payment Gateway
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend (.env in `client/` directory)

```env
# API Configuration
VITE_API_URL=http://localhost:8000/api

# Firebase Configuration
VITE_FIREBASE_APIKEY=your_firebase_api_key
VITE_FIREBASE_AUTHDOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECTID=your_firebase_project_id
VITE_FIREBASE_STORAGEBUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGINGSENDERID=your_firebase_messaging_sender_id
VITE_FIREBASE_APPID=your_firebase_app_id

# Razorpay (Frontend)
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```
---

## 📁 Project Structure

```
Learning_Management_System/
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions CI/CD pipeline
├── client/                        # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   ├── customHooks/          # Custom React hooks
│   │   ├── pages/                # Page components
│   │   │   ├── admin/           # Admin-specific pages
│   │   │   ├── EditProfile.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── ViewCourse.jsx
│   │   ├── redux/               # Redux store & slices
│   │   ├── App.jsx              # Main app component
│   │   └── main.jsx             # Entry point
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                        # Backend Node.js application
│   ├── configs/                  # Configuration files
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   ├── email.js
│   │   └── razorpay.js
│   ├── controllers/              # Route controllers
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── lectureController.js
│   │   ├── orderController.js
│   │   ├── reviewController.js
│   │   └── userController.js
│   ├── middlewares/              # Custom middleware
│   │   ├── auth.middleware.js
│   │   ├── errorHandler.js
│   │   └── rateLimiter.js
│   ├── models/                   # Mongoose models
│   │   ├── userModel.js
│   │   ├── courseModel.js
│   │   ├── lectureModel.js
│   │   ├── orderModel.js
│   │   └── reviewModel.js
│   ├── routes/                   # API routes
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── lectureRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── reviewRoutes.js
│   │   └── userRoutes.js
│   ├── services/                 # Business logic & external services
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── index.js                  # Entry point
│   └── package.json
├── docker-compose.yml             # Docker orchestration
├── .gitignore
└── README.md
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | ❌ |
| POST | `/auth/login` | Login user | ❌ |
| POST | `/auth/logout` | Logout user | ✅ |
| GET | `/auth/profile` | Get user profile | ✅ |
| POST | `/auth/forgot-password` | Request password reset | ❌ |
| POST | `/auth/reset-password` | Reset password | ❌ |

### Course Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/courses` | Get all courses | ❌ |
| GET | `/courses/:id` | Get course by ID | ❌ |
| POST | `/courses` | Create new course | ✅ (Admin) |
| PUT | `/courses/:id` | Update course | ✅ (Admin) |
| DELETE | `/courses/:id` | Delete course | ✅ (Admin) |
| GET | `/courses/search` | AI-powered search | ❌ |

### Lecture Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/lectures/:courseId` | Get lectures for course | ✅ |
| POST | `/lectures` | Create new lecture | ✅ (Admin) |
| PUT | `/lectures/:id` | Update lecture | ✅ (Admin) |
| DELETE | `/lectures/:id` | Delete lecture | ✅ (Admin) |

### Order/Payment Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/orders/create` | Create Razorpay order | ✅ |
| POST | `/orders/verify` | Verify payment | ✅ |
| GET | `/orders/history` | Get user's order history | ✅ |

### Review Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/reviews/:courseId` | Get course reviews | ❌ |
| POST | `/reviews` | Create review | ✅ |
| PUT | `/reviews/:id` | Update review | ✅ |
| DELETE | `/reviews/:id` | Delete review | ✅ |

---

## 🚢 Deployment

### CI/CD Pipeline (GitHub Actions)

The project includes an automated CI/CD pipeline that:

1. **Triggers on**: Push to `main` or `dev` branches
2. **Build & Lint**: 
   - Installs dependencies for client and server
   - Runs ESLint checks
   - Verifies Docker builds
3. **Deploy**:
   - Connects to AWS EC2 via SSH
   - Pulls latest code from GitHub
   - Redeploys using `docker-compose up -d --build`

### Manual Deployment to AWS EC2

#### Prerequisites
- AWS EC2 instance with Docker installed
- Security groups configured to allow ports 5173 and 8000
- SSH access to the instance

#### Steps

1. **SSH into your EC2 instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-public-ip
   ```

2. **Clone the repository**
   ```bash
   git clone https://github.com/prakhar0085/Learning_Management_System.git
   cd Learning_Management_System
   ```

3. **Set up environment variables**
   ```bash
   # Create .env files in client/ and server/ directories
   nano server/.env
   nano client/.env
   ```

4. **Build and run with Docker**
   ```bash
   docker-compose up -d --build
   ```

5. **Access the application**
   ```
   http://your-ec2-public-ip:5173
   ```

### Environment-Specific Configuration

For production deployment, update the following:

**Client `.env`:**
```env
VITE_API_URL=http://your-ec2-public-ip:8000/api
```

**Server `.env`:**
- Use production MongoDB URI
- Use production Razorpay and Cloudinary credentials
- Set strong JWT_SECRET

---

## 🎯 Key Features Explained

### 1. AI-Powered Search with Google Gemini

The platform uses Google Gemini AI to enable semantic search, allowing users to find courses using natural language queries:

```javascript
// Example: User searches "I want to build mobile apps"
// AI maps intent to relevant courses like:
// - "React Native Development"
// - "Flutter for Beginners"
// - "iOS Development with Swift"
```

**Why it matters:** Traditional keyword search fails when course titles don't match exact search terms. AI search understands intent and context.

### 2. Secure Authentication Flow

- **JWT Tokens** stored in httpOnly cookies (XSS protection)
- **Google OAuth** integration for social login
- **Password Reset** via email with time-limited tokens
- **Rate Limiting** to prevent brute-force attacks

### 3. Razorpay Payment Integration

Supports multiple payment methods:
- UPI (Google Pay, PhonePe, Paytm)
- Credit/Debit Cards
- Net Banking
- Digital Wallets

### 4. Cloudinary Media Management

- Automatic image optimization
- CDN delivery for fast loading
- Video streaming support
- Responsive image transformations

---

## 🧪 Testing

### Run Tests Locally

```bash
# Backend linting
cd server
npm run lint

# Frontend linting
cd client
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```




## 📞 Support

If you have any questions or need help with setup, please:
- Open an [Issue](https://github.com/prakhar0085/Learning_Management_System/issues)
- Contact via email: [prakhartiwari942@gmail.com]

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

Made with ❤️ by [Prakhar Tiwari](https://github.com/prakhar0085)

</div>
