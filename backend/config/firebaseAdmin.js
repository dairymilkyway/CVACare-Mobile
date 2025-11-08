const admin = require('firebase-admin');
const path = require('path');

let firebaseAdmin = null;

/**
 * Initialize Firebase Admin SDK
 * This will create/update users in Firebase Authentication
 */
function initializeFirebaseAdmin() {
  if (firebaseAdmin) {
    return firebaseAdmin;
  }

  try {
    // Path to service account key (will be downloaded from Firebase Console)
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || 
                                path.join(__dirname, 'serviceAccountKey.json');

    // Check if service account file exists
    const fs = require('fs');
    if (!fs.existsSync(serviceAccountPath)) {
      console.warn('⚠️  Firebase Admin: Service account key not found at:', serviceAccountPath);
      console.warn('⚠️  Users will NOT be synced to Firebase Authentication');
      console.warn('⚠️  See FIREBASE_ADMIN_SETUP.md for instructions');
      return null;
    }

    // Initialize Firebase Admin
    const serviceAccount = require(serviceAccountPath);
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });

    firebaseAdmin = admin;
    console.log('✅ Firebase Admin SDK initialized successfully');
    return firebaseAdmin;
  } catch (error) {
    console.error('❌ Firebase Admin initialization error:', error.message);
    console.warn('⚠️  Users will NOT be synced to Firebase Authentication');
    return null;
  }
}

/**
 * Create or update a user in Firebase Authentication
 * @param {Object} userData - User data to create/update
 * @returns {Promise<Object>} Firebase user record or null
 */
async function createOrUpdateFirebaseUser(userData) {
  const admin = initializeFirebaseAdmin();
  
  if (!admin) {
    console.warn('⚠️  Firebase Admin not initialized, skipping user sync');
    return null;
  }

  try {
    const { uid, email, name, picture, isVerified } = userData;

    // Try to update existing user first
    try {
      const userRecord = await admin.auth().updateUser(uid, {
        email: email,
        displayName: name,
        photoURL: picture || null,
        emailVerified: isVerified || false
      });
      
      console.log('✅ Updated Firebase Auth user:', email);
      return userRecord;
    } catch (updateError) {
      // User doesn't exist, create new one
      if (updateError.code === 'auth/user-not-found') {
        const userRecord = await admin.auth().createUser({
          uid: uid,
          email: email,
          displayName: name,
          photoURL: picture || null,
          emailVerified: isVerified || false
        });
        
        console.log('✅ Created Firebase Auth user:', email);
        return userRecord;
      } else {
        throw updateError;
      }
    }
  } catch (error) {
    console.error('❌ Firebase Auth user creation/update error:', error.message);
    // Don't throw - we don't want to break the main flow if Firebase sync fails
    return null;
  }
}

/**
 * Delete a user from Firebase Authentication
 * @param {string} uid - User ID
 * @returns {Promise<boolean>} Success status
 */
async function deleteFirebaseUser(uid) {
  const admin = initializeFirebaseAdmin();
  
  if (!admin) {
    return false;
  }

  try {
    await admin.auth().deleteUser(uid);
    console.log('✅ Deleted Firebase Auth user:', uid);
    return true;
  } catch (error) {
    console.error('❌ Firebase Auth user deletion error:', error.message);
    return false;
  }
}

module.exports = {
  initializeFirebaseAdmin,
  createOrUpdateFirebaseUser,
  deleteFirebaseUser
};
