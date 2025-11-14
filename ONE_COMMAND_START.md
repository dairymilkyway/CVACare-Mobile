# 🚀 ONE COMMAND TO RULE THEM ALL

## Before (Multiple Commands ❌)

You had to run each service separately:

```powershell
# Terminal 1
cd backend
npm start

# Terminal 2  
cd backend
.\start-gait-service.ps1

# Terminal 3
cd backend
.\start-therapy-server.ps1
```

**Problem**: Too many terminals to manage! 😫

---

## Now (Single Command ✅)

Just run ONE command:

```powershell
cd backend
.\start-all.ps1
```

**Result**: 3 services automatically start in separate windows! 🎉

---

## What `start-all.ps1` Does

### ✅ Pre-Flight Checks
1. Verifies you're in the backend directory
2. Shows your local IP address for mobile connectivity
3. Checks if Python virtual environments exist (creates if missing)
4. Verifies Node.js dependencies are installed
5. Checks if ports 5000, 5001, 5002 are available
6. Offers to kill conflicting processes if needed

### 🚀 Service Startup
Starts 3 services in separate PowerShell windows:

**Window 1: Node.js API Server (Port 5000)**
- Main backend API
- Authentication
- User management
- Admin dashboard

**Window 2: Python Gait Analysis (Port 5001)**
- Gait analysis service
- Physical therapy tracking

**Window 3: Python Therapy Exercises (Port 5002)**
- Fluency exercises CRUD
- Language exercises (Expressive & Receptive)
- Articulation exercises
- Exercise management for therapists

### 📊 Status Summary
After startup, you'll see:
```
========================================
  All Services Running!
========================================

Services are running in separate PowerShell windows:

  [1] Node.js API Server
     Local: http://localhost:5000
     Network: http://192.168.1.64:5000

  [2] Python Gait Analysis
     Local: http://localhost:5001
     Network: http://192.168.1.64:5001

  [3] Python Therapy Exercises
     Local: http://localhost:5002
     Network: http://192.168.1.64:5002

Quick Tests:
  curl http://localhost:5000/api/gait/health
  curl http://localhost:5001/health
  curl http://localhost:5002/api/therapy/health

Mobile App Configuration:
  Main API: http://192.168.1.64:5000
  Gait Analysis: http://192.168.1.64:5001
  Therapy Exercises: http://192.168.1.64:5002
```

---

## 🎯 Complete Workflow (Simple!)

### 1️⃣ First Time Setup (One-time)

```powershell
# Install Node.js dependencies
cd backend
npm install

# The start-all.ps1 script will auto-create Python venvs
# if they don't exist, but you can manually create them:
cd therapy-exercises
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
cd ..

cd gait-analysis
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
cd ..
```

### 2️⃣ Update Mobile App Configuration

Edit `frontend/services/api.js` with your IP:
```javascript
const API_URL = 'http://YOUR_IP:5000/api';
const THERAPY_API_URL = 'http://YOUR_IP:5002/api';
```

Find your IP:
```powershell
ipconfig  # Look for IPv4 Address
```

### 3️⃣ Start Everything

**Backend (One Command):**
```powershell
cd backend
.\start-all.ps1
```

**Frontend:**
```powershell
cd frontend
npm start
# Press 'a' for Android or 'i' for iOS
```

### 4️⃣ Test & Use

✅ Register as therapist  
✅ Login  
✅ Access therapist dashboard  
✅ Seed exercises  
✅ Manage therapy exercises  

---

## 🛑 Stopping Services

Just press **Ctrl+C** in each of the 3 PowerShell windows.

Or close all PowerShell windows manually.

---

## 🐛 Troubleshooting

### Port Already in Use?
The script will detect this and ask if you want to kill the process:
```
[WARN] Port 5000 is already in use
  Kill the process and continue? (y/n)
```
Type `y` and press Enter.

### Python venv Missing?
The script auto-creates it! Just wait for setup to complete.

### IP Address Mismatch?
The script shows your current IP and warns if your `.env` uses `localhost`:
```
[WARN] Using 'localhost' won't work on mobile devices!
  Update .env to: GAIT_ANALYSIS_URL=http://192.168.1.64:5001
```

### Service Won't Start?
Check the individual PowerShell window for error messages.

---

## 📁 What Gets Created

After running `start-all.ps1`, you'll have:

```
backend/
├── gait-analysis/
│   └── venv/              ← Auto-created if missing
├── therapy-exercises/
│   └── venv/              ← Auto-created if missing
├── node_modules/          ← Verified/installed
└── 3 PowerShell Windows   ← Services running
```

---

## 🎉 Benefits

✅ **One command** instead of 3+  
✅ **Auto-setup** of Python environments  
✅ **Port conflict** detection  
✅ **IP address** validation  
✅ **Clear status** reporting  
✅ **Easy testing** with curl commands  
✅ **Network URLs** for mobile access  

---

## 💡 Pro Tips

1. **Keep the PowerShell windows open** - Don't close them while developing
2. **Check the summary** - It shows all URLs you need
3. **Use the test commands** - Verify services are running
4. **Update mobile config** - Use the Network URLs, not localhost
5. **One-time setup** - After initial setup, just run `.\start-all.ps1`

---

**That's it! Now you can start all backend services with just ONE command! 🚀**
