# ⚡ NextGen AI Chatbot

NextGen is a full-stack AI-powered chatbot web application built using React, Node.js, and MongoDB.
It supports real-time chat, user authentication, chat history, and multilingual responses.

---

## 🚀 Features

### 🔐 Authentication

* User Signup & Login
* Password hashing using bcrypt
* Session stored in localStorage

### 💬 Chat System

* AI chatbot using OpenRouter API
* Context-based conversation
* Typing animation
* Auto-scroll chat UI

### 🧠 Chat History

* Stores chats in MongoDB
* Load previous chats
* Delete chats
* Click any chat to reopen

### 🌍 Multi-language Support

* Detects language automatically
* Supports:

  * English
  * Bengali
  * Hindi
* Translates responses dynamically

### 👤 User Profile

* Displays user name
* Logout system
* Change password feature

### 🎨 UI/UX

* Dark modern UI
* Glassmorphism design
* Toast notification (no alerts)
* Responsive layout

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Axios
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas

### AI Integration

* OpenRouter API

---

## 📦 Dependencies

### 🔧 Backend

Install:

```bash id="b1"
npm install express cors dotenv bcrypt mongodb
```

| Package | Purpose               |
| ------- | --------------------- |
| express | Server framework      |
| cors    | Cross-origin requests |
| dotenv  | Environment variables |
| bcrypt  | Password hashing      |
| mongodb | Database connection   |

---

### 💻 Frontend

Install:

```bash id="b2"
npm install axios franc
```

| Package | Purpose            |
| ------- | ------------------ |
| axios   | API calls          |
| franc   | Language detection |

---

### ⚙️ Default (Vite)

* react
* react-dom
* vite

---

## 📁 Project Structure

```bash id="b3"
NEXTGEN/
│
├── backend/
│   ├── config/db.js
│   ├── models/
│   │   ├── Chat.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── chat.js
│   ├── services/openrouter.js
│   ├── .env
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatBox.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Chat.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Project

```bash id="b4"
git clone https://github.com/Surajit6428/NextGen.git
cd NextGen
```

---

## 🔧 Backend Setup

```bash id="b5"
cd backend
npm install
```

Create `.env` file:

```env id="b6"
MONGO_URI=your_mongodb_uri
OPENROUTER_API_KEY=your_api_key
```

Run server:

```bash id="b7"
node server.js
```

Backend runs on:

```
http://localhost:5000
```

---

## 💻 Frontend Setup

```bash id="b8"
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🌐 API Endpoints

### 🔐 Auth

* POST `/api/auth/signup`
* POST `/api/auth/login`
* GET `/api/auth/user/:id`
* POST `/api/auth/change-password`

### 💬 Chat

* POST `/api/chat`
* GET `/api/chat/history/:userId`
* DELETE `/api/chat/:id`

---

## 🔒 Security

* Password hashing (bcrypt)
* User-specific data access
* Secure password update

---

## 📸 Screenshots

(Add your screenshots here)

---

## 💡 Future Improvements

* JWT Authentication
* Profile avatar upload
* Voice assistant
* Chat rename feature
* Mobile app

---

## 👨‍💻 Author

**Surajit Bhowmik**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
