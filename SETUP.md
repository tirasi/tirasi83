# 🚀 Quick Setup Guide - Cosmic Watch

## Prerequisites
- Docker Desktop installed and running
- 4GB RAM available
- Ports 3000 and 8000 available

## Setup Steps

### Option 1: Using Batch Scripts (Windows - Easiest)

1. **Start the application:**
   ```
   Double-click: start.bat
   ```

2. **Wait for containers to build** (2-3 minutes first time)

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

4. **Stop the application:**
   ```
   Double-click: stop.bat
   ```

### Option 2: Using Command Line

1. **Navigate to project directory:**
   ```bash
   cd tirasi83
   ```

2. **Start containers:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application** (same URLs as above)

4. **Stop containers:**
   ```bash
   Press Ctrl+C
   docker-compose down
   ```

## Verification

Run the test script to verify everything is working:
```
Double-click: test.bat
```

Or manually check:
- Backend health: http://localhost:8000/health
- Frontend: http://localhost:3000
- API docs: http://localhost:8000/docs

## Troubleshooting

### Port Already in Use
```bash
# Stop existing containers
docker-compose down

# Check what's using the port
netstat -ano | findstr :3000
netstat -ano | findstr :8000

# Kill the process or change ports in docker-compose.yml
```

### Containers Won't Start
```bash
# Clean up and rebuild
docker-compose down -v
docker-compose up --build --force-recreate
```

### Database Issues
```bash
# Reset database
docker-compose down -v
docker-compose up
```

## Default Test Account

After starting, you can register a new account or use:
- Email: test@example.com
- Password: test123

(Note: You'll need to register this account first)

## NASA API Key

The app uses DEMO_KEY by default (limited to 30 requests/hour).

To use your own key:
1. Get a free key from: https://api.nasa.gov/
2. Create `.env` file:
   ```
   NASA_API_KEY=your_key_here
   ```
3. Restart containers

## Features to Demo

1. **Registration/Login** - Create account and login
2. **Dashboard** - View live NEO feed from NASA
3. **Asteroid Details** - Click any asteroid for detailed info
4. **Watchlist** - Add asteroids to your watchlist
5. **Risk Analysis** - See hazard classification and risk scores
6. **Alerts** - View upcoming close approach events

## Architecture

```
┌─────────────┐         ┌─────────────┐
│   Browser   │────────▶│   Nginx     │
│ :3000       │         │  (Frontend) │
└─────────────┘         └──────┬──────┘
                               │
                               │ /api/*
                               ▼
                        ┌─────────────┐
                        │   FastAPI   │
                        │  (Backend)  │
                        │   :8000     │
                        └──────┬──────┘
                               │
                               ▼
                        ┌─────────────┐
                        │   SQLite    │
                        │  (Volume)   │
                        └─────────────┘
```

## Docker Commands Reference

```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild
docker-compose up --build

# Reset everything
docker-compose down -v
docker-compose up --build
```

## Support

For issues, check:
1. Docker Desktop is running
2. Ports 3000 and 8000 are free
3. No firewall blocking
4. Sufficient disk space (2GB+)

## Hackathon Checklist

✅ Docker containerization  
✅ Multi-stage builds  
✅ docker-compose.yml  
✅ Health checks  
✅ Volume persistence  
✅ Network isolation  
✅ Environment variables  
✅ Easy setup (one command)  
✅ Production-ready nginx  
✅ API documentation  

---

**Ready to launch! 🚀**
