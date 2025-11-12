# Bottom Navigation & Profile Screen Update

## Summary of Changes

### 1. Bottom Navigation Updated (BottomNav.js)

#### ✅ Removed Tab:
- **Appointments** tab has been removed

#### ✅ Updated Tab Order (4 tabs total):
1. **Home** - `home-outline` / `home` icon
2. **Therapy** - `brain-outline` / `brain` icon (changed from fitness/heart)
3. **Health** - `heart-outline` / `heart` icon
4. **Profile** - `person-outline` / `person` icon

#### Changes Made:
- Removed the "Appointments" navigation item
- Changed Therapy icon from `fitness` to `brain`
- Maintained CVAPed brand color (#C9302C) for active states

---

### 2. New ProfileScreen Component Created

#### ✨ Features:

**Profile Header Section:**
- Profile picture display (from Google or placeholder with person icon)
- User's full name display (firstName + lastName)
- Role badge showing user role (Patient/Therapist/Admin)
- Camera button when in edit mode (for future profile picture upload)

**Personal Information Card:**
- Editable fields:
  - First Name
  - Last Name
  - Phone Number
- Non-editable field:
  - Email Address (with helper text explaining it cannot be changed)
- Edit mode toggle with pencil icon in header
- Save/Cancel buttons when editing

**Therapy Information Card** (conditional):
- Only shows if user has therapy data
- Displays:
  - Therapy Type (Speech Therapy / Physical Therapy)
  - Patient Type (Myself / Child / Dependent)
- Read-only information

**Account Settings Card:**
- Change Password option
- Notifications settings
- Privacy & Security settings
- All with chevron icons indicating navigation

**Logout Button:**
- Red branded button with logout icon
- Confirmation dialog before logout
- Handles Google Sign-Out if user signed in with Google
- Calls `onLogout` callback to return to landing page

**Additional Features:**
- Professional design with cards and proper spacing
- Loading states for save operations
- App version display at bottom
- Responsive layout
- Proper error handling
- CVAPed brand colors throughout

---

### 3. HomePage Updated

#### ✅ Integration Changes:
- Added `ProfileScreen` import
- Added `showProfile` state
- Added `onLogout` prop to receive logout handler from App.js
- Updated `handleTabPress` to show ProfileScreen when profile tab clicked
- Added `handleProfileBack` to return to home from profile
- Profile screen now properly integrated with navigation flow

---

### 4. App.js Updated

#### ✅ Logout Flow:
- Added `handleLogout` function that:
  - Clears user data (`userData` and `googleUserData`)
  - Returns user to landing page
  - Logs logout action
- Passed `onLogout={handleLogout}` to HomePage component

---

## User Flow

### Viewing Profile:
1. User clicks **Profile** tab in bottom navigation
2. ProfileScreen appears with user information
3. Shows personal info, therapy info (if available), and settings options

### Editing Profile:
1. User clicks **edit icon** (pencil) in header
2. Form fields become editable (except email)
3. User modifies firstName, lastName, or phone
4. User clicks **Save Changes** (shows loading spinner)
5. Success alert shown and edit mode exits

### Logging Out:
1. User clicks **Logout** button
2. Confirmation dialog appears: "Are you sure you want to logout?"
3. User confirms logout
4. Google Sign-Out executed (if applicable)
5. User data cleared
6. Returns to landing page

---

## Design Highlights

### Professional Look:
✅ Clean card-based layout
✅ Consistent spacing and padding
✅ Proper elevation/shadows for depth
✅ CVAPed brand colors (#C9302C)
✅ Icon-based navigation
✅ Clear visual hierarchy

### User Experience:
✅ Edit mode toggle
✅ Clear save/cancel actions
✅ Loading indicators
✅ Confirmation dialogs
✅ Helper text for disabled fields
✅ Responsive design

### Branding:
✅ CVAPed red (#C9302C) for primary actions
✅ Professional gray tones for secondary content
✅ Consistent with existing app design
✅ Clear iconography with Ionicons

---

## API Integration Points

The ProfileScreen has placeholder comments for future API integration:

```javascript
// TODO: Implement API call to update profile
// const response = await authAPI.updateProfile(userData.token, {
//   firstName,
//   lastName,
//   phone
// });
```

### Required API Endpoint:
**PUT /api/auth/update-profile**
- Authorization: Bearer token
- Body: `{ firstName, lastName, phone }`
- Returns updated user data

---

## Testing Checklist

- [ ] Bottom nav shows 4 tabs: Home, Therapy, Health, Profile
- [ ] Therapy tab icon is brain (not heart/fitness)
- [ ] Clicking Profile tab shows ProfileScreen
- [ ] Profile displays user's firstName, lastName, email
- [ ] Profile shows role badge (Patient)
- [ ] Profile shows therapy info if user has therapyType/patientType
- [ ] Edit button enables editing mode
- [ ] Email field is disabled with helper text
- [ ] Save Changes button works (with loading state)
- [ ] Cancel button resets form and exits edit mode
- [ ] Logout button shows confirmation dialog
- [ ] Logout clears session and returns to landing page
- [ ] Google users are signed out from Google on logout
- [ ] Back button returns to home with correct tab selected

---

## File Structure

```
frontend/
├── components/
│   ├── BottomNav.js          ✅ Updated (4 tabs, brain icon)
│   ├── HomePage.js            ✅ Updated (profile integration)
│   ├── ProfileScreen.js       ✨ NEW (professional profile UI)
│   └── ...
├── App.js                     ✅ Updated (logout handler)
```

---

## Next Steps (Future Enhancements)

1. **Profile Picture Upload**
   - Implement camera/gallery selection
   - Image upload to server
   - Update user picture in database

2. **Change Password**
   - Create password change screen
   - Implement password validation
   - API endpoint for password update

3. **Notifications Settings**
   - Toggle push notifications
   - Email notification preferences
   - Therapy reminder settings

4. **Privacy & Security**
   - Privacy policy page
   - Terms of service
   - Data export/deletion options

5. **Update Profile API**
   - Create backend endpoint
   - Validate input data
   - Return updated user object
   - Update token if needed

---

## Summary

✅ **Bottom Navigation**: Reduced to 4 tabs with proper icons
✅ **Therapy Icon**: Changed to brain icon
✅ **Profile Screen**: Professional design with all required features
✅ **User Info Display**: Shows firstName, lastName, email, role, therapy info
✅ **Edit Functionality**: Toggle edit mode with save/cancel
✅ **Logout**: Full logout flow with Google sign-out and confirmation
✅ **CVAPed Branding**: Maintained throughout the design
✅ **Professional Look**: Card-based, clean, modern UI

The profile screen is now ready for use and future API integration! 🎉
