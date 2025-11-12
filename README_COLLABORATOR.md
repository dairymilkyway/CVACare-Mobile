# 🎯 CVACare Mobile - Collaborator Setup

Welcome! This guide will help you set up the project and build the app on your phone.

## 📚 Documentation Files

I've created several guides to help you:

### 🚀 **START HERE:**
1. **`QUICK_START.md`** ⭐ - Quick visual guide (5 minutes read)
2. **`COLLABORATOR_SETUP_GUIDE.md`** - Complete detailed instructions
3. **`SETUP_CHECKLIST.md`** - Track your progress

### 🛠️ **Helper Scripts:**
- **`validate-setup.ps1`** - Check if everything is configured correctly
- **`update-api-url.ps1`** - Automatically update API URL with your IP
- **`quick-start.ps1`** - Start backend and build options easily

### 📖 **Additional Documentation:**
- `backend/README.md` - Backend setup details
- `backend/API_TEST_GUIDE.md` - Test API endpoints

---

## ⚡ Quick Setup (3 Steps)

### 1️⃣ Configure Backend (5 min)

```powershell
# Get your IP address
ipconfig

# Install dependencies
cd backend
npm install

# Edit backend\.env with:
# - Your MongoDB URI
# - Your Mailtrap credentials
# - A secure JWT secret

# Start backend
npm run dev
```

### 2️⃣ Update Frontend API URL (2 min)

**Easy way:**
```powershell
.\update-api-url.ps1
```

**Manual way:**  
Edit `frontend\services\api.js` and change:
```javascript
const API_URL = 'http://YOUR_IP_ADDRESS:5000/api';
```

### 3️⃣ Build & Install (20 min)

```powershell
cd frontend
npm install
eas login
eas build --profile development --platform android
```

Download APK and install on phone!

---

## ✅ Validate Your Setup

Before building, run this to check everything:

```powershell
.\validate-setup.ps1
```

---

## 🆘 Common Issues

### "Network Error" in app
- ✅ Backend running? (`cd backend; npm run dev`)
- ✅ API URL correct in `api.js`?
- ✅ Phone and computer on same WiFi?
- ✅ Firewall allowing port 5000?

### MongoDB connection failed
- ✅ MongoDB running? (if local)
- ✅ Connection string correct in `.env`?
- ✅ IP whitelisted? (if MongoDB Atlas)

### OTP not received
- ✅ Mailtrap credentials correct in `.env`?
- ✅ Check Mailtrap inbox online

---

## 📱 App Features

This app includes:
- ✨ User registration with email OTP verification
- 🔐 Google Sign-In authentication
- 🏥 Physical therapy exercises
- 💬 Speech therapy modules
- 🔒 Secure JWT authentication

---

## 🌐 Development vs Production

### Development (localhost/IP):
```javascript
const API_URL = 'http://192.168.1.100:5000/api';
```
- Works only on same WiFi network
- Good for testing during development

### Production (real server):
```javascript
const API_URL = 'https://your-app.herokuapp.com/api';
```
- Works anywhere with internet
- Need to deploy backend to cloud service first

---

## 📞 Need Help?

1. Read `QUICK_START.md` for visual guide
2. Check `COLLABORATOR_SETUP_GUIDE.md` for detailed steps
3. Run `.\validate-setup.ps1` to find issues
4. Contact project owner

---

## 🎯 Project Structure

```
CVACare-Mobile/
├── backend/              # Node.js API server
│   ├── .env             # ⚠️ Configure this!
│   ├── server.js        # Main server file
│   ├── controllers/     # Business logic
│   ├── models/          # Database models
│   └── routes/          # API routes
│
├── frontend/            # React Native app
│   ├── services/
│   │   └── api.js      # ⚠️ Update API URL here!
│   ├── components/      # React components
│   ├── config/         # App configuration
│   └── android/        # Android build files
│
└── Helper Scripts:
    ├── QUICK_START.md
    ├── validate-setup.ps1
    ├── update-api-url.ps1
    └── quick-start.ps1
```

---

## 🚀 Ready to Start?

1. Open `QUICK_START.md` and follow the 3 tasks
2. Run `.\validate-setup.ps1` to check your setup
3. Use `.\quick-start.ps1` to start everything easily

**Good luck! 🎉**
