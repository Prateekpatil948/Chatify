# 💬 Chatify – Real-Time Chat Application

Chatify is a modern, full-stack real-time messaging application built with a clean UI and fast, responsive performance. It supports user authentication, one-to-one chat, online status, and real-time message delivery.

Live Demo: https://chatify1-1z7e.onrender.com/
---

## 🚀 Features

- 🔐 User Authentication (Register / Login)
- 💬 Real-time One-to-One Messaging
- 🟢 Online / Offline User Status
- 📱 Fully Responsive (Mobile + Desktop)
- ⚡ Instant Message Delivery
- 🧩 Clean & Modern UI
- 🗂️ Sidebar with User List
- 🔄 Auto-refresh chat updates

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Zustand (state management)
- Axios
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT Authentication

---

## 📂 Project Structure

Chatify/
│
├── frontend/ # React frontend
│ ├── src/
│ ├── public/
│ └── package.json
│
├── backend/ # Node.js backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── socket/
| ├── .env
│ └── server.js
│
├── .gitignore
├── package.json
└── README.md


---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME 
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET


### Frontend (`frontend/.env`)

VITE_API_BASE_URL=http://localhost:5000


---

## ▶️ How to Run the Project

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/Chatify.git
cd Chatify

2️⃣ Start Backend

cd backend
npm install
npm run dev


Backend will run on:

http://localhost:5000

3️⃣ Start Frontend

cd frontend
npm install
npm run dev

Frontend will run on:

http://localhost:5173

🔌 Real-Time Communication

Chatify uses Socket.IO for:

    Real-time message delivery

    Online user tracking

    Live chat updates without refresh


🌐 Live Demo

🔗 https://chatify1-1z7e.onrender.com
📌 Future Improvements

    Group Chats

    Message Read Receipts

    File & Image Sharing

    Typing Indicators

    Push Notifications

    Dark Mode

👨‍💻 Author

Prateek Patil
Full Stack Developer
⭐ prateekpatil948@gmail.com

If you like this project, give it a ⭐ on GitHub!
