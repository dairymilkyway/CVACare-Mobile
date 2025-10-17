import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const RegisterScreen = ({ onLogin, onRegisterSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Handle registration logic here
    console.log('Register pressed', { fullName, email, password, confirmPassword });
    // After successful registration, navigate to OTP screen
    if (onRegisterSuccess) {
      onRegisterSuccess(email);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/cvalogotext.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Create Your Account</Text>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#B0B0B0"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />

            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#B0B0B0"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#B0B0B0"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#B0B0B0"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
              <Text style={styles.registerButtonText}>REGISTER</Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={onLogin}>
                <Text style={styles.loginLink}>Login Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: width * 0.8,
    height: height * 0.3,
    transform: [{ scale: 1.75 }],
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#D0D0D0',
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,
    color: '#333333',
  },
  registerButton: {
    backgroundColor: '#C9302C',
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  loginText: {
    fontSize: 15,
    color: '#333333',
  },
  loginLink: {
    fontSize: 15,
    color: '#6B9AC4',
    fontWeight: '600',
  },
});

export default RegisterScreen;
