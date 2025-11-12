# 🚀 Quick Start - Run Both Backend Services

## One Command to Run Everything

```powershell
cd backend
.\start-all.ps1
```

That's it! This single command will:
- ✅ Check if Python virtual environment exists (creates it if needed)
- ✅ Check if axios is installed (installs it if needed)
- ✅ Check if ports 5000 and 5001 are available
- ✅ Start Python Gait Analysis Service (Port 5001)
- ✅ Start Node.js API Server (Port 5000)
- ✅ Show you your local IP address for mobile access

## What You'll See

Two PowerShell windows will open:

**Window 1: Python Gait Analysis Service**
```
🚶 Gait Analysis Service
Port: 5001
Listening on: 0.0.0.0 (all interfaces)
```

**Window 2: Node.js API Server**
```
📱 CVACare Backend
Server running on port 5000
MongoDB connected
```

## First Time Setup

The script automatically handles setup, but if you want to manually install:

```powershell
# Install Node.js dependencies
npm install

# Create Python virtual environment and install dependencies
python -m venv gait-analysis\venv
.\gait-analysis\venv\Scripts\Activate.ps1
pip install -r gait-analysis\requirements.txt
```

## Environment Configuration

Make sure your `.env` file has the correct IP address:

```properties
# Use your actual local IP, not localhost!
GAIT_ANALYSIS_URL=http://192.168.1.64:5001
```

To find your IP:
```powershell
ipconfig
```
Look for IPv4 Address under your Wi-Fi adapter.

## Testing

After starting services, test them:

```powershell
# Test Node.js
curl http://localhost:5000/api/gait/health

# Test Python service directly
curl http://localhost:5001/health

# Test from mobile device (use your IP)
curl http://192.168.1.64:5000/api/gait/health
```

## Mobile App Configuration

Update your frontend API URL to use your local IP:

**In `frontend/services/api.js`:**
```javascript
const API_URL = 'http://192.168.1.64:5000';  // Use your IP
```

## Stopping Services

Press `Ctrl+C` in each PowerShell window to stop the services.

Or close the windows.

## Troubleshooting

### Port Already in Use
The script will ask if you want to kill the existing process automatically.

### Virtual Environment Not Found
The script will create it automatically on first run.

### Can't Connect from Mobile
1. Verify both services are running (check the PowerShell windows)
2. Make sure your phone is on the same Wi-Fi network
3. Check Windows Firewall isn't blocking ports 5000 and 5001
4. Verify `.env` has your correct local IP address

### Python Dependencies Error
```powershell
cd gait-analysis
.\venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install -r requirements.txt
```

## Services Architecture

```
Mobile App
    ↓
Node.js API (Port 5000)
    ↓ (forwards /api/gait/* requests)
Python Gait Service (Port 5001)
    ↓ (processes with numpy/scipy)
Returns analysis results
```

## Available Endpoints

### Node.js API (Port 5000)
- `GET /api/auth/...` - Authentication endpoints
- `GET /api/gait/health` - Gait service health check (proxy)
- `POST /api/gait/analyze` - Analyze gait session (proxy)
- `POST /api/gait/realtime` - Real-time analysis (proxy)
- `GET /api/gait/history/:userId` - User history (proxy)

### Python Gait Service (Port 5001)
- `GET /health` - Health check
- `POST /api/gait/analyze` - Process gait data
- `POST /api/gait/realtime` - Real-time processing
- `GET /api/gait/history/:userId` - Get user history

---

**Need help?** Check the PowerShell windows for detailed logs and error messages.
