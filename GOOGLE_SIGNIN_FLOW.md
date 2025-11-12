# Google Sign-In Flow - Complete Implementation

## Overview
This document explains the complete Google Sign-In flow with profile completion for users who sign up/sign in with Google.

## Flow Diagram

```
User clicks "Sign in with Google"
          ↓
Force account selection (GoogleSignin.signOut() first)
          ↓
User selects Google account
          ↓
Send ID token to backend (/api/auth/google)
          ↓
Backend checks: Does user need profile completion?
          ├─── YES (needsProfileCompletion: true)
          │         ↓
          │    Navigate to ProfileCompletionScreen
          │         ↓
          │    User completes 3-step form:
          │    Step 1: Select Therapy Type (Speech/Physical)
          │    Step 2: Select Patient Type (Myself/Child/Dependent)
          │    Step 3: Fill Additional Info (based on selections)
          │         ↓
          │    Submit to backend (/api/auth/complete-profile)
          │         ↓
          │    Navigate to HomePage
          │
          └─── NO (needsProfileCompletion: false)
                    ↓
               Navigate directly to HomePage
```

## Files Modified

### 1. App.js
**Changes:**
- Added `ProfileCompletionScreen` import
- Added state: `showProfileCompletion`, `googleUserData`
- Added handler: `handleGoogleSignIn(data)` - receives Google user data and shows profile completion screen
- Added handler: `handleProfileComplete(data)` - receives completed profile data and navigates to home
- Passed `onGoogleSignIn` prop to LoginScreen and RegisterScreen
- Added ProfileCompletionScreen render with proper props (`token`, `userData`, `onComplete`)

**New Navigation Flow:**
```javascript
// When Google Sign-In needs profile completion:
LoginScreen/RegisterScreen 
  → handleGoogleSignIn(response.data) 
  → setShowProfileCompletion(true)
  → ProfileCompletionScreen

// When profile is completed:
ProfileCompletionScreen 
  → handleProfileComplete(response.data)
  → setShowHome(true)
  → HomePage
```

### 2. LoginScreen.js
**Changes:**
- Added `onGoogleSignIn` prop to component parameters
- Updated `handleGoogleSignIn()`:
  - Added `GoogleSignin.signOut()` before `signIn()` to force account picker
  - Added check for `response.needsProfileCompletion`
  - If true: calls `onGoogleSignIn(response.data)` to navigate to ProfileCompletionScreen
  - If false: calls `onLoginSuccess(response.data)` to go directly to HomePage

### 3. RegisterScreen.js
**Changes:**
- Added `onGoogleSignIn` prop to component parameters
- Updated `handleGoogleSignIn()`:
  - Added `GoogleSignin.signOut()` before `signIn()` to force account picker
  - Added check for `response.needsProfileCompletion`
  - If true: calls `onGoogleSignIn(response.data)` to navigate to ProfileCompletionScreen
  - If false: shows success alert and calls `onLogin(response.data)`

## Backend Integration

### Backend Response Format

**When user needs profile completion:**
```json
{
  "success": true,
  "needsProfileCompletion": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@gmail.com",
      "googleId": "google_id_here",
      "isVerified": true
      // Note: therapyType and patientType are null/undefined
    }
  }
}
```

**When user already has complete profile:**
```json
{
  "success": true,
  "needsProfileCompletion": false,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@gmail.com",
      "googleId": "google_id_here",
      "therapyType": "speech",
      "patientType": "child",
      "isVerified": true
      // All required profile fields are filled
    }
  }
}
```

## User Experience

### Scenario 1: New Google User
1. User clicks "Continue with Google" on Login or Register screen
2. Account picker appears (can select any Google account)
3. User selects account → Google authentication
4. App receives response with `needsProfileCompletion: true`
5. **ProfileCompletionScreen appears automatically**
6. User completes 3-step form (Therapy Type → Patient Type → Additional Info)
7. Form submits to backend `/api/auth/complete-profile`
8. Success → Navigate to HomePage

### Scenario 2: Returning Google User
1. User clicks "Continue with Google" on Login or Register screen
2. Account picker appears (can select any Google account)
3. User selects account → Google authentication
4. App receives response with `needsProfileCompletion: false`
5. **Directly navigate to HomePage** (skip profile completion)

## Key Features

✅ **Account Selection**: Always shows Google account picker (no auto-login)
✅ **Profile Completion Detection**: Backend automatically detects if user needs to complete profile
✅ **Seamless Flow**: No manual navigation needed - app automatically routes user
✅ **Data Persistence**: Profile data saved to MongoDB via `/api/auth/complete-profile`
✅ **Token Security**: JWT token passed securely through navigation flow

## Testing Checklist

- [ ] Test Google Sign-In with brand new Google account
  - Should show ProfileCompletionScreen
  - Complete profile form
  - Verify data saved to database
  - Verify navigation to HomePage after completion

- [ ] Test Google Sign-In with existing user (complete profile)
  - Should skip ProfileCompletionScreen
  - Navigate directly to HomePage

- [ ] Test Google Sign-In account picker
  - Sign out and sign in again
  - Verify account picker appears
  - Can select different Google account

- [ ] Test profile completion validation
  - Try to proceed without selecting therapy type
  - Try to proceed without filling required fields
  - Verify validation errors appear

## Next Steps

1. **Test the complete flow** with a new Google account
2. **Verify database** that profile data is saved correctly
3. **Add AsyncStorage** to persist login state (optional)
4. **Add logout functionality** to test multiple accounts

## Notes

- Google OAuth requires valid `google-services.json` file
- Backend must have Google OAuth Client ID configured
- ProfileCompletionScreen reuses the same 3-step form structure as RegisterScreen
- The `needsProfileCompletion` flag is determined by checking if `therapyType` and `patientType` exist in the user document
