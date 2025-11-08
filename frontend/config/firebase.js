import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: '292803901437-fk6kg98k8gj8e61k39osqlvf03cq3aer.apps.googleusercontent.com', // From google-services.json
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

export { GoogleSignin };
