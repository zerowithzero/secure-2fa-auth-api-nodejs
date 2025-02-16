# 🔐 Secure Authentication API (Node.js + JWT + OAuth2 + 2FA)

A **secure authentication API** using **Node.js, Express, JWT, Google OAuth2, and Two-Factor Authentication (2FA)**.

## 🚀 Features
✅ **User Authentication** (Register, Login)  
✅ **Google OAuth 2.0 Login**  
✅ **JWT Token Authentication**  
✅ **Two-Factor Authentication (2FA)** with OTP & QR Code
✅ **Secure Routes** for logged-in users  
✅ **Password Hashing with bcrypt**  
✅ **Proper Error Handling & Security Measures**  

---

## 📂 Folder Structure
```
secure-auth-api-nodejs/
│── config/              # Passport & OAuth Configurations
│── models/              # Mongoose User Model
│── routes/              # API Routes (Auth, Users, Protected)
│── middleware/          # Authentication Middleware
│── controllers/         # Business Logic (User handling)
│── .env                 # Environment Variables
│── server.js            # Main Express App
│── package.json         # Dependencies & Scripts
│── README.md            # Project Documentation
```

---

## 🚀 Quick Setup Guide  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/your-username/secure-auth-api-nodejs.git
cd secure-auth-api-nodejs
```

### 2️⃣ Install Dependencies  
```bash
npm install
```

### 3️⃣ Setup Environment Variables  
Create a **.env** file in the root directory and add:  
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
EMAIL_SERVICE=email_service_for_2fa
EMAIL_USER=your_email
EMAIL_PASS=your_email_password (App Password)
```

### 4️⃣ Start the Server  
```bash
npm run dev
```
🚀 Your API will now run on **http://localhost:5000**  

---

## 🔗 API Endpoints  

### **User Authentication**  
| Method | Endpoint             | Description                 |
|--------|----------------------|-----------------------------|
| POST   | `/api/auth/register` | Register a new user        |
| POST   | `/api/auth/login`    | Login and get JWT token    |

### **Google Authentication**  
| Method | Endpoint                | Description                     |
|--------|-------------------------|---------------------------------|
| GET    | `/api/auth/google`       | Redirects to Google Login      |
| GET    | `/api/auth/google/callback` | Google OAuth callback         |

### **Protected Routes (JWT Required)**  
| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| GET    | `/api/profile`    | Test Protected Route |

---

## 🛡 Security Features Implemented  
✅ **JWT Tokens** with expiration  
✅ **Password Hashing** using bcrypt  
✅ **Two-Factor Authentication (2FA)** via email OTP  
✅ **Session Management** for Google OAuth  
✅ **Error Handling & Input Validation**  

---

## 🏗 About the Development
This project serves as a **pre-built secure authentication template** for developers seeking a hassle-free and **ready-to-use** authentication system. It eliminates the need to worry about security concerns, token management, or OAuth integration, allowing developers to **focus on building their application** rather than spending time on authentication implementation. 

This template is designed to be **scalable, secure, and easy to integrate**, making it the perfect choice for projects requiring a strong authentication system without the complexity.

---

## 📜 License  
This project is licensed under the **MIT License**.  

🔗 **Live Demo:** _Coming Soon_ 🚀  
💬 **Need Help?** Create an issue or reach out! 🎯
