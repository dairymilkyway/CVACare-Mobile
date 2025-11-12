# CVACare Mobile - Collaborator Setup Guide

## 🎯 Overview
This guide will help you set up the CVACare Mobile project as a collaborator, configure the backend API for real-time access (not localhost), and create development builds.

---

## 📋 Prerequisites

Before starting, ensure you have:
- ✅ Node.js installed (v14 or higher)
- ✅ MongoDB installed locally OR MongoDB Atlas account
- ✅ Mailtrap account (for email OTP testing)
- ✅ Android Studio (for Android development)
- ✅ Expo CLI installed globally: `npm install -g expo-cli`
- ✅ EAS CLI installed globally: `npm install -g eas-cli`
- ✅ Git repository cloned

---

## 🚀 Step-by-Step Setup

### PART 1: Backend Setup (API Server)

#### Step 1: Install Backend Dependencies
```powershell
cd c:\Users\ludwi\CVAPed_Mobile\CVACare-Mobile\backend
npm install
```

#### Step 2: Configure Environment Variables

The `.env` file already exists. You need to update it with real credentials:

**Required Changes in `backend\.env`:**

1. **MongoDB URI** - Choose one option:
   
   **Option A: Local MongoDB**
   ```env
   MONGODB_URI=mongodb://localhost:27017/cvacare
   ```
   
   **Option B: MongoDB Atlas (Recommended for real-time access)**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cvacare?retryWrites=true&w=majority
   ```

2. **JWT Secret** - Change this to a secure random string:
   ```env
   JWT_SECRET=change_this_to_a_long_random_secure_string_12345
   ```

3. **Mailtrap Credentials** - Get from https://mailtrap.io:
   ```env
   MAILTRAP_HOST=sandbox.smtp.mailtrap.io
   MAILTRAP_PORT=2525
   MAILTRAP_USER=your_actual_mailtrap_username
   MAILTRAP_PASS=your_actual_mailtrap_password
   ```

#### Step 3: Get Your Computer's Local IP Address

Run this command in PowerShell:
```powershell
ipconfig
```

Look for your IPv4 Address (usually looks like `192.168.x.x` or `10.x.x.x`)

**Example output:**
```
Wireless LAN adapter Wi-Fi:
   IPv4 Address. . . . . . . . . . . : 192.168.1.100
```

Write down this IP address - you'll need it!

#### Step 4: Update Backend Server Port (Optional)

If you want to change the port from 5000 to something else (e.g., 8080):

Edit `backend\.env`:
```env
PORT=8080
```

#### Step 5: Start the Backend Server

```powershell
cd c:\Users\ludwi\CVAPed_Mobile\CVACare-Mobile\backend
npm run dev
```

You should see:
```
MongoDB connected
Server running in development mode on port 5000 (or 8080)
```

**Keep this terminal window open!** The backend needs to run continuously.

---

### PART 2: Frontend Setup (Mobile App)

#### Step 6: Install Frontend Dependencies

Open a **NEW** PowerShell window:
```powershell
cd c:\Users\ludwi\CVAPed_Mobile\CVACare-Mobile\frontend
npm install
```

#### Step 7: Update API Configuration (CRITICAL!)

Edit `frontend\services\api.js` and change the API_URL to your computer's IP address:

**Before (localhost - won't work on phone):**
```javascript
const API_URL = 'http://192.168.0.251:8080/api';
```

**After (use YOUR IP address from Step 3):**
```javascript
const API_URL = 'http://YOUR_IP_ADDRESS:5000/api';
// Example: const API_URL = 'http://192.168.1.100:5000/api';
```

⚠️ **Important Notes:**
- Replace `YOUR_IP_ADDRESS` with the actual IP from Step 3
- Use port `5000` (or whatever you set in backend .env)
- Make sure your phone and computer are on the **same WiFi network**
- If you changed the backend PORT to 8080, use that instead of 5000

#### Step 8: Login to EAS

```powershell
eas login
```

Enter your Expo account credentials (or create one if you don't have it)

#### Step 9: Build Development APK

There are two options:

**Option A: Development Build (Recommended for testing)**
```powershell
cd c:\Users\ludwi\CVAPed_Mobile\CVACare-Mobile\frontend
eas build --profile development --platform android
```

**Option B: Preview Build (For sharing with others)**
```powershell
eas build --profile preview --platform android
```

This will:
1. Upload your code to EAS servers
2. Build the APK in the cloud
3. Give you a download link when complete (takes 10-20 minutes)

#### Step 10: Install the APK on Your Phone

Once the build completes:
1. You'll get a download link (or QR code)
2. Download the APK to your phone
3. Install it (you may need to allow installation from unknown sources)

---

### PART 3: Running & Testing

#### Step 11: Ensure Backend is Running

In your first PowerShell window, the backend should still be running:
```
Server running in development mode on port 5000
```

If it stopped, restart it:
```powershell
cd c:\Users\ludwi\CVAPed_Mobile\CVACare-Mobile\backend
npm run dev
```

#### Step 12: Test the App

1. **Open the app on your phone**
2. **Try registering a new user:**
   - Name: Test User
   - Email: test@example.com
   - Password: Test123!

3. **Check Mailtrap inbox** for the OTP code
4. **Verify OTP** in the app
5. **Login** with your credentials

---

## 🔧 Troubleshooting

### Issue: "Network Error" or "Cannot connect to API"

**Solutions:**
1. ✅ Check both phone and computer are on the **same WiFi network**
2. ✅ Verify the IP address in `api.js` is correct
3. ✅ Ensure backend server is running
4. ✅ Check Windows Firewall - allow port 5000 (or your custom port)
5. ✅ Try pinging your computer from another device

**Allow port through Windows Firewall:**
```powershell
# Run as Administrator
netsh advfirewall firewall add rule name="CVACare Backend" dir=in action=allow protocol=TCP localport=5000
```

### Issue: MongoDB connection failed

**Solutions:**
- If using local MongoDB, start it: `mongod`
- If using MongoDB Atlas, check your connection string in `.env`
- Verify your IP is whitelisted in MongoDB Atlas (set to 0.0.0.0/0 for testing)

### Issue: OTP emails not sending

**Solutions:**
- Check Mailtrap credentials in `backend\.env`
- Verify Mailtrap account is active
- Check backend logs for email errors

### Issue: App crashes on startup

**Solutions:**
- Rebuild the app with correct API URL
- Check `google-services.json` is present in `frontend\android\app\`
- Clear app data and reinstall

---

## 🌐 For Production/Real Server Deployment

If you want to deploy the backend to a real server (Heroku, Render, Railway, etc.):

1. **Deploy backend to a hosting service**
2. **Get the public URL** (e.g., `https://your-app.herokuapp.com`)
3. **Update `frontend\services\api.js`:**
   ```javascript
   const API_URL = 'https://your-app.herokuapp.com/api';
   ```
4. **Rebuild the app** with EAS

---

## 📝 Quick Reference

### Important Files to Modify:
- `backend\.env` - Backend configuration
- `frontend\services\api.js` - API endpoint URL

### Important Commands:
```powershell
# Start backend
cd backend
npm run dev

# Build development APK
cd frontend
eas build --profile development --platform android

# Build preview APK
eas build --profile preview --platform android
```

### Your Configuration:
- **Computer IP Address:** `_____________` (fill this in!)
- **Backend Port:** `5000` (or custom)
- **API URL:** `http://____:5000/api`

---

## ✅ Checklist

Before testing, ensure:
- [ ] Backend dependencies installed (`npm install` in backend folder)
- [ ] `.env` file configured with MongoDB URI, JWT secret, Mailtrap credentials
- [ ] Backend server is running (`npm run dev`)
- [ ] Frontend dependencies installed (`npm install` in frontend folder)
- [ ] `api.js` updated with your computer's IP address
- [ ] Phone and computer on same WiFi network
- [ ] Firewall allows the backend port
- [ ] APK built and installed on phone
- [ ] Mailtrap account set up and working

---

## 🆘 Need Help?

1. Check the backend logs in the terminal
2. Check the app logs using React Native Debugger
3. Test API endpoints using the `API_TEST_GUIDE.md`
4. Contact the project owner

Good luck! 🚀
