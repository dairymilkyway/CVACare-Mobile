# ✅ CVACare Mobile Setup Checklist

Use this checklist to track your setup progress!

## 📦 Prerequisites

- [ ] Node.js installed (check with `node --version`)
- [ ] npm installed (check with `npm --version`)
- [ ] MongoDB installed locally OR MongoDB Atlas account created
- [ ] Mailtrap account created at https://mailtrap.io
- [ ] Expo account created at https://expo.dev
- [ ] EAS CLI installed (`npm install -g eas-cli`)
- [ ] Git repository cloned to local machine

## 🔧 Backend Configuration

- [ ] Navigated to `backend` folder
- [ ] Ran `npm install` in backend folder
- [ ] `.env` file exists in backend folder
- [ ] Updated `MONGODB_URI` in `.env` (with your MongoDB connection string)
- [ ] Updated `JWT_SECRET` in `.env` (changed to a secure random string)
- [ ] Updated `MAILTRAP_USER` in `.env` (from Mailtrap dashboard)
- [ ] Updated `MAILTRAP_PASS` in `.env` (from Mailtrap dashboard)
- [ ] Tested backend server with `npm run dev`
- [ ] Backend server starts without errors
- [ ] Can access http://localhost:5000 in browser (shows API running message)

## 🌐 Network Configuration

- [ ] Found my computer's local IP address (using `ipconfig`)
- [ ] My IP Address: `___________________` (write it down!)
- [ ] Confirmed phone and computer are on the same WiFi network
- [ ] WiFi Network Name: `___________________`
- [ ] Added firewall rule to allow port 5000 (if needed)

## 📱 Frontend Configuration

- [ ] Navigated to `frontend` folder
- [ ] Ran `npm install` in frontend folder
- [ ] Opened `frontend/services/api.js` file
- [ ] Updated `API_URL` with my computer's IP address
- [ ] Example: `const API_URL = 'http://192.168.1.100:5000/api';`
- [ ] Saved the file
- [ ] Logged into EAS with `eas login`

## 🏗️ Building the App

- [ ] Decided which build profile to use:
  - [ ] Development build (`--profile development`)
  - [ ] Preview build (`--profile preview`)
- [ ] Ran build command: `eas build --profile development --platform android`
- [ ] Build completed successfully
- [ ] Downloaded APK from EAS build page
- [ ] Transferred APK to phone

## 📲 Installing & Testing

- [ ] Enabled "Install from Unknown Sources" on phone (if needed)
- [ ] Installed APK on phone
- [ ] App opens without crashing
- [ ] Backend server is running on computer
- [ ] Tested registration flow
- [ ] Received OTP email in Mailtrap inbox
- [ ] Successfully verified OTP
- [ ] Successfully logged in
- [ ] App works correctly!

## 🐛 Troubleshooting (if needed)

- [ ] Checked backend logs for errors
- [ ] Verified API URL is correct in `api.js`
- [ ] Confirmed both devices on same network
- [ ] Tried pinging computer from phone
- [ ] Checked Windows Firewall settings
- [ ] Cleared app data and reinstalled
- [ ] Rebuilt app with correct configuration

## 🎯 Optional: Production Deployment

- [ ] Backend deployed to cloud service (Heroku, Render, Railway, etc.)
- [ ] Got public backend URL: `___________________`
- [ ] Updated `api.js` with production URL
- [ ] Rebuilt app for production
- [ ] Tested app with production backend

---

## 📝 Notes & Issues

Write any issues or notes here:

```
Issue 1: _________________________________________________
Solution: ________________________________________________

Issue 2: _________________________________________________
Solution: ________________________________________________

Issue 3: _________________________________________________
Solution: ________________________________________________
```

---

## 🆘 Quick Reference

### Important Files:
- Backend config: `backend/.env`
- API URL: `frontend/services/api.js`
- Build config: `frontend/eas.json`

### Important Commands:
```powershell
# Start backend
cd backend
npm run dev

# Build APK
cd frontend
eas build --profile development --platform android

# Start Expo dev server (for testing)
cd frontend
npx expo start
```

### My Configuration:
- Computer IP: `___________________`
- Backend Port: `5000`
- API URL: `http://___________________:5000/api`
- MongoDB: Local / Atlas (circle one)
- Build Profile: Development / Preview (circle one)

---

**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

Current Status: _____________

Last Updated: _____________
