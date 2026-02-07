# 🏗️ Cosmic Watch - System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
│                      http://localhost:3000                      │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP Requests
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DOCKER NETWORK (Bridge)                      │
│                      asteroid-network                           │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │         FRONTEND CONTAINER (asteroid-frontend)            │ │
│  │                                                           │ │
│  │  ┌─────────────────────────────────────────────────┐     │ │
│  │  │              NGINX (Port 80)                    │     │ │
│  │  │  - Serves React static files                    │     │ │
│  │  │  - Handles routing (try_files)                  │     │ │
│  │  │  - Proxies /api/* to backend                    │     │ │
│  │  └────────────────┬────────────────────────────────┘     │ │
│  │                   │                                       │ │
│  │                   │ Proxy /api/*                          │ │
│  │                   │                                       │ │
│  └───────────────────┼───────────────────────────────────────┘ │
│                      │                                         │
│                      │ Internal Network                        │
│                      │ http://backend:8000                     │
│                      ▼                                         │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │         BACKEND CONTAINER (asteroid-backend)              │ │
│  │                                                           │ │
│  │  ┌─────────────────────────────────────────────────┐     │ │
│  │  │           FastAPI (Port 8000)                   │     │ │
│  │  │                                                 │     │ │
│  │  │  ┌──────────────────────────────────────┐      │     │ │
│  │  │  │      API Endpoints                   │      │     │ │
│  │  │  │  - /auth (Authentication)            │      │     │ │
│  │  │  │  - /neos (Asteroid Data)             │      │     │ │
│  │  │  │  - /alerts (Notifications)           │      │     │ │
│  │  │  └──────────────┬───────────────────────┘      │     │ │
│  │  │                 │                              │     │ │
│  │  │  ┌──────────────▼───────────────────────┐      │     │ │
│  │  │  │      Business Logic Layer            │      │     │ │
│  │  │  │  - NASA API Service                  │      │     │ │
│  │  │  │  - Risk Analysis Engine              │      │     │ │
│  │  │  │  - Authentication Service            │      │     │ │
│  │  │  └──────────────┬───────────────────────┘      │     │ │
│  │  │                 │                              │     │ │
│  │  │  ┌──────────────▼───────────────────────┐      │     │ │
│  │  │  │      Data Access Layer               │      │     │ │
│  │  │  │  - SQLAlchemy ORM                    │      │     │ │
│  │  │  │  - User Model                        │      │     │ │
│  │  │  │  - Watchlist Model                   │      │     │ │
│  │  │  └──────────────┬───────────────────────┘      │     │ │
│  │  └─────────────────┼──────────────────────────────┘     │ │
│  │                    │                                     │ │
│  │                    │ SQLAlchemy                          │ │
│  │                    ▼                                     │ │
│  │  ┌─────────────────────────────────────────────────┐    │ │
│  │  │         SQLite Database (Volume)                │    │ │
│  │  │         /app/asteroid.db                        │    │ │
│  │  │  - users table                                  │    │ │
│  │  │  - watchlist table                              │    │ │
│  │  └─────────────────────────────────────────────────┘    │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                             │
                             │ External API Call
                             ▼
                  ┌──────────────────────┐
                  │   NASA NeoWs API     │
                  │  api.nasa.gov        │
                  └──────────────────────┘
```

---

## Component Details

### 1. Frontend Container (Nginx + React)

**Technology Stack:**
- React 18 (UI Framework)
- React Router (Client-side routing)
- Axios (HTTP client)
- Framer Motion (Animations)
- Nginx (Web server)

**Responsibilities:**
- Serve static React build files
- Handle client-side routing
- Proxy API requests to backend
- Manage user sessions (localStorage)

**Port Mapping:**
- Internal: 80
- External: 3000

**Key Files:**
- `/usr/share/nginx/html/*` - React build
- `/etc/nginx/conf.d/default.conf` - Nginx config

---

### 2. Backend Container (FastAPI + Python)

**Technology Stack:**
- FastAPI (Web framework)
- Uvicorn (ASGI server)
- SQLAlchemy (ORM)
- Pydantic (Data validation)
- Python-Jose (JWT)
- Passlib (Password hashing)

**Responsibilities:**
- REST API endpoints
- User authentication (JWT)
- NASA API integration
- Risk analysis calculations
- Database operations

**Port Mapping:**
- Internal: 8000
- External: 8000

**API Structure:**
```
/auth
  POST /register - Create new user
  POST /login - Authenticate user
  GET /profile - Get user details

/neos
  GET /feed - Get asteroid feed
  GET /{id} - Get asteroid details
  POST /{id}/watch - Add to watchlist
  DELETE /{id}/watch - Remove from watchlist

/alerts
  GET / - Get user alerts
  GET /watchlist - Get watchlist items
```

---

### 3. Database (SQLite + Volume)

**Technology:**
- SQLite (Embedded database)
- Docker Volume (Persistence)

**Schema:**
```sql
users
  - id (Primary Key)
  - email (Unique)
  - hashed_password
  - full_name
  - created_at

watchlist
  - id (Primary Key)
  - user_id (Foreign Key)
  - asteroid_id
  - asteroid_name
  - added_at
```

**Volume:**
- Name: backend-data
- Mount: /app
- Persistence: Survives container restarts

---

## Data Flow

### User Registration Flow
```
Browser → Nginx → FastAPI → SQLAlchemy → SQLite
  1. User submits form
  2. Nginx proxies to /api/auth/register
  3. FastAPI validates data (Pydantic)
  4. Password hashed (bcrypt)
  5. User saved to database
  6. Response sent back
```

### Authentication Flow
```
Browser → Nginx → FastAPI → SQLite → JWT Token
  1. User submits credentials
  2. FastAPI validates against database
  3. JWT token generated
  4. Token stored in localStorage
  5. Token sent with subsequent requests
```

### NEO Data Flow
```
Browser → Nginx → FastAPI → NASA API → Risk Analysis → Response
  1. User requests asteroid data
  2. FastAPI checks cache/database
  3. If needed, calls NASA API
  4. Risk analysis performed
  5. Data formatted and returned
  6. Frontend displays results
```

### Watchlist Flow
```
Browser → Nginx → FastAPI → SQLite
  1. User adds asteroid to watchlist
  2. JWT token validated
  3. Watchlist entry created
  4. Database updated
  5. Confirmation returned
```

---

## Network Architecture

### Docker Network (asteroid-network)
- **Type:** Bridge
- **Driver:** bridge
- **Isolation:** Services isolated from host
- **Communication:** Internal DNS resolution

**Service Discovery:**
- Frontend can reach backend via `http://backend:8000`
- Backend can reach frontend via `http://frontend:80`
- External access via port mapping

---

## Security Architecture

### 1. Authentication Layer
```
JWT Token → Middleware → Protected Routes
  - Token validation
  - User identification
  - Permission checking
```

### 2. Password Security
```
Plain Password → bcrypt → Hashed Password → Database
  - Salt generation
  - Multiple rounds
  - Secure storage
```

### 3. CORS Configuration
```
Frontend (3000) → CORS Middleware → Backend (8000)
  - Allowed origins
  - Credential support
  - Method restrictions
```

### 4. Environment Variables
```
.env → Docker Compose → Container Environment
  - Secret keys
  - API keys
  - Database URLs
```

---

## Deployment Architecture

### Multi-Stage Build (Frontend)
```
Stage 1: Builder
  - Node 18 Alpine
  - Install dependencies
  - Build React app
  - Output: /app/build

Stage 2: Production
  - Nginx Alpine
  - Copy build from Stage 1
  - Copy nginx config
  - Serve static files
```

### Multi-Stage Build (Backend)
```
Stage 1: Builder
  - Python 3.12 Slim
  - Install dependencies
  - Output: /root/.local

Stage 2: Production
  - Python 3.12 Slim
  - Copy dependencies from Stage 1
  - Copy application code
  - Run Uvicorn server
```

---

## Health Check Architecture

### Backend Health Check
```
Docker → Python Script → HTTP Request → /health endpoint
  - Interval: 30 seconds
  - Timeout: 10 seconds
  - Retries: 3
  - Start period: 40 seconds
```

### Service Dependencies
```
Frontend depends_on Backend (healthy)
  - Backend must pass health check
  - Frontend waits for backend
  - Ensures proper startup order
```

---

## Volume Architecture

### Backend Data Volume
```
Host → Docker Volume → Container /app
  - Persistent storage
  - Survives container restarts
  - Contains asteroid.db
  - Backup-friendly
```

---

## Scaling Considerations

### Horizontal Scaling
```
Load Balancer
    ├── Frontend Instance 1
    ├── Frontend Instance 2
    └── Frontend Instance 3
         ↓
    Backend Load Balancer
         ├── Backend Instance 1
         ├── Backend Instance 2
         └── Backend Instance 3
              ↓
         Shared Database
```

### Vertical Scaling
- Increase container resources
- Optimize database queries
- Cache NASA API responses
- Use Redis for sessions

---

## Monitoring Points

### Health Endpoints
- `GET /health` - Backend health
- `GET /` - Backend root
- `http://frontend:80` - Frontend availability

### Logs
- `docker-compose logs backend` - Backend logs
- `docker-compose logs frontend` - Nginx logs
- Application logs in containers

### Metrics
- Response times
- Error rates
- API call counts
- Database query performance

---

## Technology Choices Rationale

### Why FastAPI?
- ✅ High performance (async)
- ✅ Automatic API documentation
- ✅ Type validation (Pydantic)
- ✅ Modern Python features

### Why React?
- ✅ Component-based architecture
- ✅ Large ecosystem
- ✅ Virtual DOM performance
- ✅ Easy state management

### Why Nginx?
- ✅ High performance
- ✅ Low resource usage
- ✅ Excellent reverse proxy
- ✅ Static file serving

### Why SQLite?
- ✅ Zero configuration
- ✅ Embedded database
- ✅ Perfect for hackathon
- ✅ Easy to backup

### Why Docker?
- ✅ Consistent environments
- ✅ Easy deployment
- ✅ Isolation
- ✅ Scalability

---

**This architecture provides:**
- 🚀 Fast performance
- 🔒 Security
- 📈 Scalability
- 🛠️ Maintainability
- 📦 Easy deployment
