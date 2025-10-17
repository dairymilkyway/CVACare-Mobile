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

const LoginScreen = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login pressed', { email, password });
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

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email or Username"
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

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>LOGIN</Text>
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Doesn't have an account? </Text>
              <TouchableOpacity onPress={onRegister}>
                <Text style={styles.registerLink}>Register Now</Text>
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
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 40,
  },
  logo: {
    width: width * 1,
    height: height * 0.35,
    transform: [{ scale: 1.75 }],
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
  loginButton: {
    backgroundColor: '#C9302C',
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  registerText: {
    fontSize: 15,
    color: '#333333',
  },
  registerLink: {
    fontSize: 15,
    color: '#6B9AC4',
    fontWeight: '600',
  },
});

export default LoginScreen;
