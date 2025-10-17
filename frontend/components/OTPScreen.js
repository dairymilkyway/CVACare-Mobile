import React, { useState, useRef } from 'react';
import {
  View,
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

const OTPScreen = ({ onVerify, onResend, email }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleOtpChange = (text, index) => {
    // Only allow numbers
    if (text && !/^\d+$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    console.log('Verifying OTP:', otpCode);
    onVerify(otpCode);
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    onResend();
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
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Verify Your Account</Text>
            <Text style={styles.subtitle}>
              We've sent a verification code to
            </Text>
            <Text style={styles.email}>{email || 'your email'}</Text>
          </View>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={[
                  styles.otpInput,
                  digit ? styles.otpInputFilled : null,
                ]}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>

          <TouchableOpacity 
            style={[
              styles.verifyButton,
              otp.every(d => d) ? null : styles.verifyButtonDisabled
            ]} 
            onPress={handleVerify}
            disabled={!otp.every(d => d)}
          >
            <Text style={styles.verifyButtonText}>VERIFY</Text>
          </TouchableOpacity>

          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't receive the code? </Text>
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendLink}>Resend Code</Text>
            </TouchableOpacity>
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
    paddingTop: 80,
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '600',
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    gap: 12,
  },
  otpInput: {
    width: 50,
    height: 60,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    borderRadius: 12,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2C3E50',
    backgroundColor: '#FFFFFF',
  },
  otpInputFilled: {
    borderColor: '#C9302C',
    backgroundColor: '#FFF5F5',
  },
  verifyButton: {
    backgroundColor: '#C9302C',
    paddingVertical: 18,
    paddingHorizontal: 100,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  verifyButtonDisabled: {
    backgroundColor: '#D0D0D0',
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  resendText: {
    fontSize: 15,
    color: '#666666',
  },
  resendLink: {
    fontSize: 15,
    color: '#6B9AC4',
    fontWeight: '600',
  },
});

export default OTPScreen;
