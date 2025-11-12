# 🏃 Gait Analysis Frontend Setup

## What Was Added

### 1. New Files Created:

**`frontend/services/gaitApi.js`**
- API service for gait analysis backend communication
- Endpoints: health check, analyze gait, real-time analysis, user history
- Uses your backend URL: `http://192.168.1.64:5000/api`

**`frontend/components/therapy/GaitAnalysisScreen.js`**
- Complete gait analysis screen with sensor recording
- Real-time data collection from accelerometer and gyroscope
- Analysis results display with metrics (steps, cadence, speed, symmetry, stability)
- Beautiful UI with animations

### 2. Modified Files:

**`frontend/components/therapy/PhysicalTherapyScreen.js`**
- Added navigation to GaitAnalysisScreen
- When users click "Use My Mobile Device" → Opens GaitAnalysisScreen
- Seamless screen transition

## 📦 Required Package Installation

You need to install Expo Sensors to access accelerometer and gyroscope:

```bash
cd frontend
npx expo install expo-sensors
```

## 🎯 How It Works

### User Flow:
1. User navigates to **Physical Therapy** screen
2. Clicks **"Use My Mobile Device"**
3. **GaitAnalysisScreen** opens with instructions
4. User taps **Start Recording** button
5. Phone sensors collect accelerometer & gyroscope data
6. User walks for 30+ seconds
7. User taps **Stop Recording**
8. Data is sent to backend: `POST /api/gait/analyze`
9. Results display with 6 key metrics

### Data Flow:
```
Mobile Sensors (Expo) 
    ↓
Frontend (GaitAnalysisScreen)
    ↓
gaitApi.js 
    ↓
Node.js Backend (Port 5000) - /api/gait/analyze
    ↓
Python Flask Service (Port 5001) - processes with numpy/scipy
    ↓
Analysis Results (steps, cadence, symmetry, stability, etc.)
    ↓
Display in Frontend
```

## 🔧 Configuration Check

### Backend `.env` - Already Set:
```properties
GAIT_ANALYSIS_URL=http://192.168.1.64:5001
```

### Frontend `services/gaitApi.js` - Already Configured:
```javascript
const API_URL = 'http://192.168.1.64:5000/api';
```

**Important:** Both use the same IP address (192.168.1.64) which is correct for testing on your physical device.

## 📱 Testing the Integration

### Step 1: Start Backend Services
```powershell
cd backend
.\start-all.ps1
```
This starts both Node.js (5000) and Python (5001) services.

### Step 2: Start Frontend
```powershell
cd frontend
npx expo start
```

### Step 3: Test on Device
1. Open app on your phone (same WiFi network)
2. Navigate to: **Therapy → Physical Therapy → Use My Mobile Device**
3. Grant sensor permissions when prompted
4. Follow on-screen instructions to record walking data

## 🎨 Features Included

### GaitAnalysisScreen Features:

**Recording:**
- ✅ Real-time sensor data collection (10Hz sampling rate)
- ✅ Visual timer showing recording duration
- ✅ Sample count display
- ✅ Pulsing animation on record button
- ✅ Minimum 10 seconds recording requirement

**Analysis:**
- ✅ Loading indicator during processing
- ✅ 6 key metrics displayed:
  - Step Count
  - Cadence (steps/minute)
  - Walking Speed (m/s)
  - Symmetry Index (0-100%)
  - Stability Score (0-100%)
  - Step Length (meters)

**User Actions:**
- ✅ New Analysis button (reset and record again)
- ✅ Save Results button (ready for database integration)
- ✅ Back navigation to Physical Therapy screen

## 🔐 Permissions Required

The app will automatically request these permissions on first use:
- **Accelerometer** - For detecting movement patterns
- **Gyroscope** - For detecting rotation and balance

## 🐛 Troubleshooting

### Sensor Access Error
If you get "Failed to access device sensors":
1. Check app permissions in phone settings
2. Restart the Expo app
3. Make sure you're testing on a physical device (sensors don't work in simulator)

### Connection Error
If analysis fails:
1. Verify backend is running (`.\start-all.ps1`)
2. Test backend health: `curl http://192.168.1.64:5000/api/gait/health`
3. Make sure phone is on same WiFi network as computer
4. Check firewall isn't blocking ports 5000/5001

### No Data Collected
If recording shows 0 samples:
1. Make sure you granted sensor permissions
2. Try restarting the app
3. Check phone isn't in power saving mode (can limit sensor access)

## 📊 Sample Data Format

The sensors collect data in this format:

```javascript
{
  accelerometer: [
    { x: 0.5, y: 0.3, z: 9.8, timestamp: 1699876543210 },
    { x: 0.6, y: 0.4, z: 9.7, timestamp: 1699876543310 },
    // ... more readings
  ],
  gyroscope: [
    { x: 0.1, y: 0.2, z: 0.3, timestamp: 1699876543210 },
    { x: 0.2, y: 0.3, z: 0.4, timestamp: 1699876543310 },
    // ... more readings
  ]
}
```

## 🚀 Next Steps (Future Enhancements)

- [ ] Save results to MongoDB (user history)
- [ ] Add user authentication context
- [ ] Display historical analysis comparison
- [ ] Add charts/graphs for visual analysis
- [ ] Implement progress tracking over time
- [ ] Add export results to PDF feature
- [ ] Create therapy recommendations based on analysis

## ✅ Quick Checklist

Before testing:
- [ ] Backend services running (`.\start-all.ps1`)
- [ ] `expo-sensors` installed in frontend
- [ ] Phone on same WiFi as computer
- [ ] App running on physical device (not simulator)
- [ ] Sensor permissions granted

---

**Ready to test!** Navigate to Physical Therapy → Use My Mobile Device and start analyzing your gait! 🚶‍♂️
