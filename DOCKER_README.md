# Cosmic Watch - Asteroid Tracker Platform

A full-stack web platform for real-time Near-Earth Object (NEO) monitoring using NASA's NeoWs API.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication
- **Real-Time NEO Data**: Live asteroid tracking from NASA API
- **Risk Analysis**: Hazard classification and risk scoring
- **Watchlist**: Save and monitor specific asteroids
- **Alert System**: Dashboard notifications for close approaches
- **Responsive UI**: Space-themed dark mode interface

## 🛠️ Tech Stack

**Backend:**
- FastAPI (Python)
- SQLAlchemy (SQLite)
- JWT Authentication
- NASA NeoWs API Integration

**Frontend:**
- React 18
- React Router
- Axios
- Framer Motion

**DevOps:**
- Docker & Docker Compose
- Multi-stage builds
- Nginx reverse proxy

## 📋 Prerequisites

- Docker (v20.10+)
- Docker Compose (v2.0+)
- NASA API Key (optional, defaults to DEMO_KEY)

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone <repository-url>
cd tirasi83
```

### 2. Configure environment (optional)
```bash
cp .env.example .env
# Edit .env and add your NASA_API_KEY
```

### 3. Build and run with Docker Compose
```bash
docker-compose up --build
```

### 4. Access the application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 🐳 Docker Commands

### Start services
```bash
docker-compose up
```

### Start in detached mode
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### Rebuild containers
```bash
docker-compose up --build
```

### View logs
```bash
docker-compose logs -f
```

### Remove volumes (reset database)
```bash
docker-compose down -v
```

## 📁 Project Structure

```
tirasi83/
├── backend/
│   ├── app/
│   │   ├── api/          # API endpoints
│   │   ├── core/         # Configuration
│   │   ├── models/       # Database models
│   │   └── services/     # Business logic
│   ├── Dockerfile
│   └── requirements.txt
├── cosmic-watch-frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── styles/       # CSS files
│   │   └── api.js        # API client
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── docker-compose.yml
└── .env.example
```

## 🔧 Development

### Backend Development
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend Development
```bash
cd cosmic-watch-frontend
npm install
npm start
```

## 📡 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get user profile

### NEO Data
- `GET /neos/feed` - Get asteroid feed
- `GET /neos/{id}` - Get asteroid details
- `POST /neos/{id}/watch` - Add to watchlist
- `DELETE /neos/{id}/watch` - Remove from watchlist

### Alerts
- `GET /alerts` - Get user alerts
- `GET /alerts/watchlist` - Get watchlist

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NASA_API_KEY | NASA API key | DEMO_KEY |
| SECRET_KEY | JWT secret key | (generated) |
| DATABASE_URL | Database connection | sqlite:///./asteroid.db |
| REACT_APP_API_URL | Backend API URL | http://localhost:8000 |

## 🏗️ Architecture

- **Frontend**: React SPA served by Nginx
- **Backend**: FastAPI REST API
- **Database**: SQLite (persistent volume)
- **Network**: Bridge network for inter-service communication
- **Proxy**: Nginx proxies `/api` requests to backend

## 📊 Health Checks

The backend includes health check endpoints:
- `GET /health` - Service health status
- Docker health checks run every 30s

## 🎯 Hackathon Compliance

✅ Full-stack implementation (React + FastAPI)  
✅ NASA API integration  
✅ User authentication & JWT  
✅ Risk analysis engine  
✅ Alert system  
✅ Docker containerization  
✅ Multi-stage builds  
✅ docker-compose.yml orchestration  
✅ Responsive space-themed UI  

## 📝 License

MIT License

## 👥 Team

Developed for the Interstellar Asteroid Tracker Hackathon
