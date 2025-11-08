# Google Authentication Setup Guide

This guide explains how to use Google Sign-In for authentication in the CVACare Mobile app.

## What's Been Implemented

### Frontend (React Native)
1. **Google Sign-In Integration**
   - Installed `@react-native-google-signin/google-signin` package
   - Configured Google Sign-In with Web Client ID from Firebase
   - Added Google Sign-In buttons to LoginScreen and RegisterScreen
   - Implemented error handling for various sign-in scenarios

2. **Firebase Configuration**
   - Created `frontend/config/firebase.js` with Google Sign-In configuration
   - Web Client ID: `572950312859-gljbij5fh4kk0a4q0j82ar7a0rqimkrb.apps.googleusercontent.com`

3. **API Integration**
   - Added `googleSignIn` method to API service
   - Sends Google ID token to backend for verification

4. **UI Updates**
   - Added "Sign in with Google" button on Login screen
   - Added "Sign up with Google" button on Register screen
   - Google logo and branded styling

### Backend (Node.js/Express)
1. **Google Authentication Endpoint**
   - New route: `POST /api/auth/google`
   - Verifies Google ID token using `google-auth-library`
   - Creates new user if email doesn't exist
   - Returns JWT token for authenticated session

2. **User Model Updates**
   - Added `googleId` field (unique identifier from Google)
   - Added `picture` field (stores Google profile picture URL)
   - Google-authenticated users are auto-verified (no OTP needed)

3. **Backend Package**
   - Installed `google-auth-library` for token verification

### Android Configuration
1. **Google Services**
   - Added `google-services` plugin to build.gradle
   - Copied `google-services.json` to `android/app/` directory
   - Updated package name to match Firebase config: `cvaped.app`

## How to Build and Run

### Step 1: Clean and Rebuild Android
```powershell
# Navigate to android directory
cd d:\VSC\CVACare-Mobile\frontend\android

# Stop any running Gradle daemons
.\gradlew.bat --stop

# Clean the project
.\gradlew.bat clean

# Go back to frontend directory
cd ..
```

### Step 2: Prebuild with Expo
```powershell
# Make sure you're in the frontend directory
cd d:\VSC\CVACare-Mobile\frontend

# Run expo prebuild to regenerate native files
npx expo prebuild --clean
```

### Step 3: Build and Run Development Build
```powershell
# Build and run on Android device/emulator
npx expo run:android
```

### Step 4: Start Backend Server
In a separate terminal:
```powershell
cd d:\VSC\CVACare-Mobile\backend
npm run dev
```

## How Google Sign-In Works

### User Flow:
1. User taps "Sign in with Google" button
2. Google Sign-In modal appears
3. User selects Google account
4. App receives Google ID token
5. App sends ID token to backend
6. Backend verifies token with Google
7. Backend creates/updates user and returns JWT token
8. User is logged in

### First-Time Google Users:
- New account is created automatically
- Email is pre-verified (no OTP needed)
- Random password is generated (not used for Google login)
- Profile picture from Google is stored

### Returning Google Users:
- Existing account is found by email
- User is logged in immediately
- Google ID and picture are updated if needed

## Testing

### Test Scenarios:
1. **New User Sign-Up with Google**
   - Tap "Sign up with Google" on Register screen
   - Select Google account
   - Verify account is created and user is logged in

2. **Existing User Sign-In with Google**
   - Tap "Sign in with Google" on Login screen
   - Select same Google account used previously
   - Verify user is logged in

3. **Mixed Authentication**
   - Register with email/password
   - Later, sign in with Google using same email
   - Google ID should be added to existing account

## Important Notes

### Security:
- ID tokens are verified server-side for security
- Backend validates token with Google before creating session
- JWT tokens are used for subsequent API requests

### Package Name:
- Android package: `cvaped.app`
- Must match Firebase configuration
- All build files updated to use this package name

### Web Client ID:
- From Firebase Console > Project Settings > General
- Type: Web Application (OAuth 2.0 client)
- Required for Google Sign-In on Android

## Troubleshooting

### "DEVELOPER_ERROR"
- Check that Web Client ID in `firebase.js` matches Firebase Console
- Verify `google-services.json` is in `android/app/` directory
- Ensure package name matches in all files

### "SIGN_IN_REQUIRED" or "12501 Error"
- Run `npx expo prebuild --clean` to regenerate native code
- Clear app data and reinstall
- Check SHA-1 fingerprint is added in Firebase Console (for release builds)

### Backend Token Verification Fails
- Check that `GOOGLE_CLIENT_ID` environment variable is set (optional)
- Backend uses hardcoded client ID by default
- Verify token hasn't expired (tokens are short-lived)

### Play Services Not Available
- Google Sign-In requires Google Play Services
- Won't work on emulators without Play Store
- Test on physical device or emulator with Google Play

## Environment Variables

### Backend (.env)
```
# Optional - defaults to hardcoded value if not set
GOOGLE_CLIENT_ID=572950312859-gljbij5fh4kk0a4q0j82ar7a0rqimkrb.apps.googleusercontent.com
```

## API Endpoints

### Google Authentication
```
POST /api/auth/google
Content-Type: application/json

{
  "idToken": "google_id_token_here"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "_id": "user_id",
    "name": "User Name",
    "email": "user@gmail.com",
    "picture": "https://...",
    "isVerified": true,
    "token": "jwt_token"
  }
}
```

## Next Steps

1. **AsyncStorage Integration**
   - Store JWT token and user data locally
   - Auto-login on app restart
   - Implement logout functionality

2. **Profile Picture Display**
   - Show Google profile picture in user profile
   - Use cached images for better performance

3. **Account Linking**
   - Allow users to link Google account to existing email/password account
   - Unlink Google account option

4. **iOS Support**
   - Configure Google Sign-In for iOS
   - Add iOS client ID to Firebase config
   - Update `firebase.js` with iOS configuration

## Files Modified/Created

### Created:
- `frontend/config/firebase.js`
- `frontend/android/app/google-services.json` (copied)
- `GOOGLE_AUTH_SETUP.md` (this file)

### Modified:
- `frontend/package.json` - Added Google Sign-In dependencies
- `frontend/services/api.js` - Added googleSignIn method
- `frontend/components/LoginScreen.js` - Added Google Sign-In button
- `frontend/components/RegisterScreen.js` - Added Google Sign-In button
- `frontend/app.json` - Updated package name and Google services
- `frontend/android/build.gradle` - Added google-services plugin
- `frontend/android/app/build.gradle` - Applied plugin and updated package
- `backend/package.json` - Added google-auth-library
- `backend/controllers/authController.js` - Added googleAuth function
- `backend/routes/authRoutes.js` - Added /google route
- `backend/models/User.js` - Added googleId and picture fields

## Support

For issues or questions:
1. Check Firebase Console for configuration
2. Review logs in both frontend and backend
3. Verify all package names match
4. Ensure google-services.json is up to date
