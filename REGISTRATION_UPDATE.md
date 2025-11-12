# Mobile Registration Update

## Overview
Updated the mobile registration screen to match the comprehensive multi-step registration flow from the web version (`CVAPed_Web Finish/Register.jsx`).

## Key Changes

### 1. Multi-Step Registration Flow
The registration process is now divided into 4 steps:

**Step 1: Basic Information**
- First Name
- Last Name
- Email
- Password
- Confirm Password

**Step 2: Therapy Type Selection**
- Speech Therapy (for pediatric speech and language development)
- Physical Therapy (for stroke recovery and rehabilitation)

**Step 3: Patient Type Selection**
- Myself (I'm seeking therapy for myself)
- My Child (only shown for Speech Therapy)
- A Dependent (for someone I care for)

**Step 4: Additional Information** (conditional based on selections)

**For Speech Therapy + Child:**
- Child Information:
  - Child's First Name
  - Child's Last Name
  - Date of Birth (MM/DD/YYYY)
  - Gender (dropdown)
- Parent/Guardian Information:
  - Parent's First Name
  - Parent's Last Name
  - Parent's Email
  - Parent's Phone
  - Relationship with Child
  - "Copy my information" checkbox

**For Physical Therapy:**
- Patient Information:
  - Patient's First Name
  - Patient's Last Name
  - Gender (dropdown)
  - "Copy my information" checkbox (if not selecting "Myself")

### 2. New Features

#### Progress Indicator
- Visual dots showing current step (1-4)
- Active step highlighted in red

#### Navigation
- **Back button**: Returns to previous step
- **Next button**: Proceeds to next step after validation
- **Register button**: Appears on final step to submit

#### Smart Copy Functionality
- "Copy my information" checkbox for parent/patient fields
- Auto-fills first name, last name, and email from account info

#### Visual Improvements
- Option cards with icons for therapy/patient type selection
- Selected cards highlighted with red border and light red background
- Professional typography and spacing
- Consistent with CVAPed branding

### 3. Validation Logic

**Step 1 Validation:**
- All fields required
- Passwords must match
- Password minimum 6 characters

**Step 2 Validation:**
- Therapy type must be selected

**Step 3 Validation:**
- Patient type must be selected

**Step 4 Validation:**
- For Speech Therapy + Child: All child and parent/guardian fields required
- For Physical Therapy: All patient fields required

### 4. Registration Data Structure

The registration now sends comprehensive data to the backend:

```javascript
{
  firstName,
  lastName,
  email,
  password,
  therapyType, // 'speech' or 'physical'
  patientType, // 'myself', 'child', or 'dependent'
  
  // Conditional fields for speech therapy + child
  childFirstName,
  childLastName,
  childDateOfBirth,
  childGender,
  parentFirstName,
  parentLastName,
  parentEmail,
  parentPhone,
  relationshipWithChild,
  
  // Conditional fields for physical therapy
  patientFirstName,
  patientLastName,
  patientGender
}
```

## Installation Required

Install the new Picker dependency:

```bash
cd frontend
npm install
```

Then rebuild the development build:

```bash
npx expo run:android
```

## Backend Requirements

The backend `authController.js` needs to be updated to handle the new registration fields:
- Accept `firstName` and `lastName` instead of just `name`
- Store therapy type and patient type
- Store conditional fields based on therapy/patient selections

## UI Components Used

- **TextInput**: For text input fields
- **Picker**: For gender dropdown selection
- **TouchableOpacity**: For option cards and buttons
- **Ionicons**: For icons (checkboxes, therapy icons, navigation arrows)
- **ScrollView**: To handle keyboard and long forms
- **KeyboardAvoidingView**: For proper keyboard behavior

## Icons Used

- `chatbubbles-outline`: Speech Therapy
- `walk-outline`: Physical Therapy
- `person-outline`: Myself
- `happy-outline`: My Child
- `people-outline`: A Dependent
- `checkbox` / `square-outline`: Checkbox states
- `arrow-back` / `arrow-forward`: Navigation
- `logo-google`: Google Sign-In

## Testing Checklist

- [ ] Step 1: Basic information validation works
- [ ] Step 2: Therapy type selection works
- [ ] Step 3: Patient type selection works (child option only shows for speech therapy)
- [ ] Step 4a: Child + parent fields show for speech therapy + child
- [ ] Step 4b: Patient fields show for physical therapy
- [ ] "Copy my information" checkbox works correctly
- [ ] Back button navigation works
- [ ] Next button validation works
- [ ] Final registration submits all data
- [ ] Google Sign-In still works on step 1
- [ ] Progress dots update correctly

## Notes

- Google Sign-In option only appears on Step 1
- The registration flow matches the web version exactly
- All styling uses CVAPed's red theme (#C9302C)
- Mobile-optimized with proper touch targets and spacing
