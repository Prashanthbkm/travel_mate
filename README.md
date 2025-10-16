# TravelMate 🌍✈️

Your ultimate travel companion for seamless journey planning and exploration.

[![TravelMate](https://img.shields.io/badge/TravelMate-Ready%20to%20Travel-blue)](https://github.com/Prashanthbkm/travel_mate) 
[![React](https://img.shields.io/badge/React-18.2.0-61dafb)](https://reactjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.0+-6DB33F)](https://spring.io/projects/spring-boot)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-646cff)](https://vitejs.dev/)
[![H2 Database](https://img.shields.io/badge/H2-Database-orange)](https://www.h2database.com/)

---

## 🚀 Features

### ✨ Core Features
- 🌍 **Destination Explorer** – Discover amazing travel destinations
- ✈️ **Trip Planning** – Create detailed itineraries
- 💰 **Expense Tracker** – Manage your travel budget
- 👥 **Travel Community** – Connect with fellow travelers
- 🌱 **Carbon Calculator** – Track environmental impact
- 📅 **Itinerary Editor** – Plan trips with ease

### 🎨 User Experience
- **Dark/Light Mode** – Choose your preferred theme
- **Responsive Design** – Works on all devices
- **Real-time Dashboard** – Personalized travel insights
- **Interactive Maps** – Visualize your travel plans
- **Social Integration** – Share experiences with friends

---

## 🛠️ Technology Stack

### Frontend
- React 18  
- Vite  
- React Router  
- CSS3  
- React Icons  
- Axios  

### Backend
- Spring Boot 3.x  
- Spring Security  
- Spring Data JPA  
- H2 Database (development)  
- JWT Authentication  
- RESTful APIs  

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16+)  
- Java 17+  
- Maven 3.6+  

### Quick Start

#### 1️⃣ Clone the repository
```bash
git clone https://github.com/Prashanthbkm/travel_mate.git
cd travel_mate
2️⃣ Backend Setup (Spring Boot)
# Navigate to backend directory
cd travel_mate_backend

# Run Spring Boot application
mvn spring-boot:run


Backend will start at: http://localhost:8080

3️⃣ Frontend Setup (React)
# Open a new terminal and navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev


Frontend will start at: http://localhost:5173

Database Access

H2 Console: http://localhost:8080/h2-console

JDBC URL: jdbc:h2:mem:testdb

Username: sa

Password: password

🏗️ Project Structure
Backend (travel_mate_backend/)
src/main/java/com/travelmate/
├── controller/      # REST Controllers
├── service/         # Business logic
├── repository/      # Data access
├── model/           # Entity classes
├── security/        # JWT & security config
└── config/          # Application config
src/main/resources/
└── application.properties
pom.xml

Frontend (frontend/)
public/               # Static assets
src/
├── components/       # Reusable components
│   ├── Header/
│   ├── Footer/
│   ├── Dashboard/
│   └── Features/
├── pages/            # Page components
├── api/              # API integration
├── styles/           # CSS
└── utils/            # Utility functions
package.json
vite.config.js

🔌 API Endpoints
Authentication

POST /api/auth/signup – User registration

POST /api/auth/login – User login

GET /api/auth/me – Get current user

Dashboard

GET /api/dashboard – Dashboard data

GET /api/user/stats – User statistics

GET /api/activities/recent – Recent activities

Features

GET /api/expenses – Get expenses

POST /api/expenses – Add expense

GET /api/posts – Get community posts

POST /api/posts – Create post

POST /api/carbon/calculate – Carbon footprint

GET /api/itineraries – User itineraries

🔧 Configuration
Backend Application Properties
server.port=8080
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.username=sa
spring.datasource.password=password
spring.h2.console.enabled=true
spring.web.cors.allowed-origins=http://localhost:5173

Frontend Environment

Create .env in frontend root:

VITE_API_BASE_URL=http://localhost:8080

🚀 Deployment
Backend Deployment
cd travel_mate_backend
mvn clean package
java -jar target/travel-mate-backend-1.0.0.jar

Frontend Deployment
cd frontend
npm run build

Production Database
spring.datasource.url=jdbc:mysql://localhost:3306/travel_mate
spring.datasource.username=your_username
spring.datasource.password=your_password

🧪 Testing
Backend
cd travel_mate_backend
mvn test

Frontend
cd frontend
npm test

📄 License

This project is licensed under the Apache License 2.0
See LICENSE
 for details.

👨‍💻 Author

Prashanth B K M

GitHub: @Prashanthbkm

LinkedIn: Prashanth B K M

Email: prashanthbkm09@gmail.com

🔮 Future Enhancements

Mobile app (React Native)

Real-time chat feature

AI-powered trip recommendations

Integration with travel APIs (flights, hotels)

Offline functionality

Multi-language support

<div align="center"> 🌟 If you find this project helpful, give it a star! Happy Travels! ✈️🌎 </div> ```
