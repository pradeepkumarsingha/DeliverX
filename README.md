# 🚚 DeliverX – Delivery Management System

DeliverX is a full-stack **MERN-based delivery management system** designed to simulate real-world e-commerce and logistics workflows.  
The project focuses heavily on **backend logic**, **order lifecycle management**, and **seller-side pickup using OTP verification**.

This project was built to gain deep practical experience in **Node.js, Express, MongoDB, and React**.

---

## 🔥 Key Features

### 👤 User Side
- User authentication using JWT
- Browse products
- Add and remove products from cart
- Place orders
- Track order status

### 🏪 Seller Side
- Seller authentication
- View orders assigned to seller
- Mark orders as **Packed**
- Generate **OTP for pickup**
- Verify OTP during pickup
- Update order status to **Out for Delivery**

### ⚙️ Backend Highlights
- RESTful API architecture
- Secure role-based access (User / Seller)
- OTP-based pickup verification system
- Order lifecycle handling
- MongoDB schema design with relationships

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Tools & Utilities
- Git & GitHub
- VS Code
- Postman

---

## 📂 Project Structure

DeliverX/
│
├── client/ # React frontend
│ ├── src/
│ ├── public/
│ └── package.json
│
├── Server/ # Node.js backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── index.js
│
├── .gitignore
├── package.json
└── README.md


---

## 🚀 Getting Started

###  Clone the Repository
```bash
git clone https://github.com/your-username/DeliverX.git
cd DeliverX
```

## Backend Setup
cd Server
npm install

## Frontend Setup
cd client
npm install
npm run dev

## 🔐 Environment Variables
The following variables are required:

PORT

MONGO_URI

JWT_SECRET

⚠️ Do not push .env files to GitHub

## 🔁 Order Lifecycle Flow
```
Order Placed
     ↓
Packed (Seller)
     ↓
Ready for Pickup (OTP Generated)
     ↓
Pickup Verified (OTP Match)
     ↓
Out for Delivery
```
## 🤝 Contributing
Contributions and suggestions are welcome.
Fork the repository and create a pull request.

##📄 License
This project is built for learning and educational purposes.

## 👨‍💻 Author

**Pradeep Kumar Singha**  
B.Tech Student | MERN Stack Developer  

Passionate about building real-world applications with Node.js, Express, MongoDB, and React.  
Interested in backend engineering, system design, and scalable web applications.

