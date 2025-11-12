# 🚀 Quick Start Guide - CVACare Mobile (Collaborator)

## 📌 What You Need to Do

You have **3 main tasks** to get the app running on your phone:

### 1️⃣ Configure Backend (API Server) ⏱️ 5 minutes
### 2️⃣ Update API URL in Frontend ⏱️ 2 minutes  
### 3️⃣ Build & Install App ⏱️ 20 minutes

---

## 🎯 Task 1: Configure Backend

### Step 1: Get Your IP Address
```powershell
ipconfig
```
Look for **IPv4 Address** (like `192.168.1.100`) and **write it down**!

### Step 2: Update Backend .env File

Open: `backend\.env`

Change these lines:
```env
# If using MongoDB Atlas (recommended):
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/cvacare

# Change this to something secure:
JWT_SECRET=my_super_secret_key_change_this_12345

# Get from https://mailtrap.io (free account):
MAILTRAP_USER=your_mailtrap_username_here
MAILTRAP_PASS=your_mailtrap_password_here
```

### Step 3: Start Backend
```powershell
cd backend
npm install
npm run dev
```

✅ You should see: "Server running in development mode on port 5000"

**Keep this window open!**

---

## 🎯 Task 2: Update API URL

### Easy Way: Run the Script
```powershell
# From project root directory:
.\update-api-url.ps1
```
The script will detect your IP and update the file automatically!

### Manual Way:

Open: `frontend\services\api.js`

Find this line:
```javascript
const API_URL = 'http://192.168.0.251:8080/api';
```

Change to YOUR IP address (from Step 1):
```javascript
const API_URL = 'http://YOUR_IP_HERE:5000/api';
// Example: const API_URL = 'http://192.168.1.100:5000/api';
```

**Save the file!**

---

## 🎯 Task 3: Build & Install App

### Step 1: Login to EAS
```powershell
npm install -g eas-cli
eas login
```

### Step 2: Build APK
```powershell
cd frontend
npm install
eas build --profile development --platform android
```

This will:
- Upload your code to EAS servers ☁️
- Build APK in the cloud 🔨
- Give you download link 📥
- **Takes 10-20 minutes ⏰**

### Step 3: Install on Phone

1. EAS will give you a **QR code** or **download link**
2. Download APK to your phone
3. Install it (allow "Unknown Sources" if needed)
4. Open the app!

---

## ✅ Testing the App

### Before Testing - Make Sure:
1. ✅ Backend server is running (the window from Task 1)
2. ✅ Phone and computer are on **same WiFi network**
3. ✅ API URL in `api.js` has your correct IP address

### Test Registration:
1. Open app on phone
2. Register new user
3. Check Mailtrap inbox for OTP code
4. Enter OTP in app
5. Login!

---

## 🔥 Common Issues & Quick Fixes

### ❌ "Network Error" or "Cannot connect"

**Fix:**
```powershell
# 1. Check both on same WiFi
# 2. Allow port through firewall:
netsh advfirewall firewall add rule name="CVACare" dir=in action=allow protocol=TCP localport=5000

# 3. Restart backend server
cd backend
npm run dev
```

### ❌ "MongoDB connection failed"

**Fix:**
- If using local MongoDB: start it with `mongod`
- If using MongoDB Atlas: check your connection string in `.env`
- MongoDB Atlas: whitelist your IP (or use `0.0.0.0/0` for testing)

### ❌ "OTP not received"

**Fix:**
- Check Mailtrap credentials in `backend\.env`
- Login to Mailtrap and check inbox there
- Look at backend logs for errors

### ❌ App crashes on startup

**Fix:**
```powershell
# 1. Make sure API URL is correct
# 2. Rebuild app
cd frontend
eas build --profile development --platform android

# 3. Reinstall APK
```

---

## 📖 Detailed Documentation

For more details, check these files in the project:
- 📄 `COLLABORATOR_SETUP_GUIDE.md` - Complete step-by-step guide
- 📄 `SETUP_CHECKLIST.md` - Printable checklist
- 📄 `backend/README.md` - Backend documentation
- 📄 `backend/API_TEST_GUIDE.md` - API testing guide

---

## 🛠️ Helpful Scripts

Run these from the project root:

### Quick Start (starts backend + shows options):
```powershell
.\quick-start.ps1
```

### Update API URL automatically:
```powershell
.\update-api-url.ps1
```

### Start backend only:
```powershell
.\quick-start.ps1 -BackendOnly
```

---

## 🌐 What About Production?

If you want to use a **real server** instead of localhost:

1. **Deploy backend** to Heroku/Render/Railway
2. **Get public URL** (e.g., `https://cvacare-api.herokuapp.com`)
3. **Update `api.js`:**
   ```javascript
   const API_URL = 'https://cvacare-api.herokuapp.com/api';
   ```
4. **Rebuild app** with EAS

This way the app works anywhere, not just on same WiFi!

---

## 📞 Need Help?

1. Check backend terminal logs
2. Read `COLLABORATOR_SETUP_GUIDE.md`
3. Test API with `API_TEST_GUIDE.md`
4. Contact project owner

---

## 🎯 Your Configuration

Fill this out as you go:

```
My Computer IP Address: ___________________
Backend Port: 5000
API URL: http://___________________:5000/api
WiFi Network: ___________________
MongoDB: Local / Atlas (circle one)

✅ Backend running: YES / NO
✅ API URL updated: YES / NO
✅ App built: YES / NO
✅ App installed: YES / NO
✅ App working: YES / NO
```

---

**Good luck! You got this! 💪**
