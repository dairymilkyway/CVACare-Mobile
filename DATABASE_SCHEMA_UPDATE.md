# Database Schema Update - firstName/lastName & Role Field

## Overview
Updated the User model and authentication controllers to match the web version database schema:
1. **Replace `name` field with `firstName` and `lastName`** for consistency
2. **Add `role` field** that automatically defaults to `'patient'` for all new registrations

---

## Changes Made

### 1. User Model (`backend/models/User.js`)

#### ✅ Removed:
```javascript
name: {
  type: String,
  required: [true, 'Please provide a name'],
  trim: true,
  maxlength: [50, 'Name cannot be more than 50 characters']
}
```

#### ✅ Added:
```javascript
firstName: {
  type: String,
  required: [true, 'Please provide a first name'],
  trim: true,
  maxlength: [50, 'First name cannot be more than 50 characters']
},
lastName: {
  type: String,
  required: [true, 'Please provide a last name'],
  trim: true,
  maxlength: [50, 'Last name cannot be more than 50 characters']
},
role: {
  type: String,
  enum: ['patient', 'therapist', 'admin'],
  default: 'patient'
}
```

---

### 2. Auth Controller (`backend/controllers/authController.js`)

#### **register() function:**
- ✅ Now accepts `firstName` and `lastName` instead of `name`
- ✅ Validates both fields are required
- ✅ Automatically sets `role: 'patient'` for all new registrations
- ✅ Sends OTP email with full name: `${firstName} ${lastName}`

**Updated Request Body:**
```javascript
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "therapyType": "speech",
  "patientType": "child",
  // ... other fields
}
```

**Database Document:**
```javascript
{
  "_id": "...",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "role": "patient", // ← Automatically set
  "therapyType": "speech",
  "patientType": "child",
  "isVerified": false,
  // ... other fields
}
```

#### **verifyOTP() function:**
- ✅ Returns `firstName`, `lastName`, and `role` in response

**Response:**
```json
{
  "success": true,
  "message": "Email verified successfully",
  "data": {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "patient",
    "isVerified": true,
    "token": "jwt_token"
  }
}
```

#### **login() function:**
- ✅ Returns `firstName`, `lastName`, and `role` in response

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "patient",
    "isVerified": true,
    "token": "jwt_token"
  }
}
```

#### **googleAuth() function:**
- ✅ Splits Google's `name` into `firstName` and `lastName`
- ✅ Sets `role: 'patient'` for new Google sign-ups
- ✅ Updates existing users who don't have firstName/lastName
- ✅ Returns `firstName`, `lastName`, and `role` in response

**For Existing Users:**
```javascript
// If user doesn't have firstName/lastName, splits from name
if (!user.firstName || !user.lastName) {
  const nameParts = name.split(' ');
  user.firstName = nameParts[0];
  user.lastName = nameParts.slice(1).join(' ') || nameParts[0];
}
```

**For New Google Users:**
```javascript
// Creates user with firstName and lastName from Google name
const nameParts = name.split(' ');
const firstName = nameParts[0];
const lastName = nameParts.slice(1).join(' ') || nameParts[0];

user = await User.create({
  firstName,
  lastName,
  email,
  googleId,
  picture,
  role: 'patient', // ← Default role
  isVerified: true,
  password: '...'
});
```

#### **completeProfile() function:**
- ✅ Returns `firstName`, `lastName`, and `role` in response

---

### 3. ProfileCompletionScreen (`frontend/components/ProfileCompletionScreen.js`)

#### ✅ Updated to use firstName/lastName directly:
```javascript
// OLD (splitting name)
const userName = userData?.name || '';
const nameParts = userName.split(' ');
const userFirstName = nameParts[0];
const userLastName = nameParts.slice(1).join(' ') || nameParts[0];

// NEW (direct access)
const userFirstName = userData?.firstName || '';
const userLastName = userData?.lastName || '';
```

**Benefits:**
- No need to split names anymore
- More accurate for users with complex names
- Consistent with backend data structure

---

## Database Migration Notes

### For Existing Users:
If you have existing users in the database with the old `name` field, you have two options:

#### Option 1: Manual Migration Script
Run this MongoDB script to migrate existing users:
```javascript
db.users.find({ name: { $exists: true } }).forEach(user => {
  const nameParts = user.name.split(' ');
  db.users.updateOne(
    { _id: user._id },
    {
      $set: {
        firstName: nameParts[0],
        lastName: nameParts.slice(1).join(' ') || nameParts[0],
        role: user.role || 'patient'
      },
      $unset: { name: "" }
    }
  );
});
```

#### Option 2: Automatic Migration (Google Sign-In)
- Existing Google users will be automatically updated when they sign in
- The `googleAuth()` function checks for missing firstName/lastName and fills them from the name

---

## API Response Changes

### All API endpoints now return:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "role": "patient"
}
```

### Instead of:
```json
{
  "name": "John Doe"
}
```

---

## Frontend Impact

### RegisterScreen.js (Already Updated ✅)
- Already sends `firstName` and `lastName` in registration request
- No changes needed

### LoginScreen.js (No Changes Needed ✅)
- Receives `firstName`, `lastName`, `role` in login response
- Handles data properly

### ProfileCompletionScreen.js (Updated ✅)
- Now uses `userData.firstName` and `userData.lastName` directly
- Auto-fill feature works correctly

---

## Testing Checklist

- [ ] Test new registration with email/password
  - Verify `firstName`, `lastName`, and `role: 'patient'` saved to database
  
- [ ] Test OTP verification
  - Verify response contains `firstName`, `lastName`, `role`
  
- [ ] Test login
  - Verify response contains `firstName`, `lastName`, `role`
  
- [ ] Test Google Sign-In (new user)
  - Verify name split into `firstName` and `lastName`
  - Verify `role: 'patient'` is set
  
- [ ] Test Google Sign-In (existing user)
  - Verify existing user updated if firstName/lastName missing
  
- [ ] Test Profile Completion
  - Verify auto-fill uses `firstName` and `lastName` correctly

---

## Summary

✅ **Database Schema Updated:**
- `name` → `firstName` + `lastName`
- Added `role` field (default: `'patient'`)

✅ **All Backend Endpoints Updated:**
- `/api/auth/register` - Accepts and saves firstName/lastName, sets role
- `/api/auth/verify-otp` - Returns firstName/lastName, role
- `/api/auth/login` - Returns firstName/lastName, role
- `/api/auth/google` - Handles name splitting, sets role
- `/api/auth/complete-profile` - Returns firstName/lastName, role

✅ **Frontend Updated:**
- ProfileCompletionScreen uses firstName/lastName directly
- RegisterScreen already sends firstName/lastName

✅ **Benefits:**
- Consistent with web version database
- Better name handling (no splitting required)
- Role-based access ready for future features
- Cleaner, more maintainable code
