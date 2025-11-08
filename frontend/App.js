import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreenExpo from 'expo-splash-screen';
import SplashScreen from './components/SplashScreen';
import LandingPage from './components/LandingPage';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import OTPScreen from './components/OTPScreen';
import HomePage from './components/HomePage';
import './config/firebase'; // Initialize Google Sign-In configuration

// Keep the splash screen visible while we fetch resources
SplashScreenExpo.preventAutoHideAsync();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showLanding, setShowLanding] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userData, setUserData] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreenExpo.hideAsync();
      }
    }

    prepare();
  }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const handleGetStarted = () => {
    setShowLanding(false);
    setShowLogin(true);
  };

  const handleRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleBackToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleRegisterSubmit = (email) => {
    setUserEmail(email);
    setShowRegister(false);
    setShowOTP(true);
  };

  const handleVerifyOTP = (userData) => {
    console.log('OTP Verified, user data:', userData);
    // Store user data and token (implement AsyncStorage later)
    // Redirect to login screen after successful verification
    setShowOTP(false);
    setShowLogin(true);
  };

  const handleLoginSuccess = (data) => {
    console.log('Login successful, user data:', data);
    // Store user data and token
    setUserData(data);
    setShowLogin(false);
    setShowHome(true);
  };

  if (!appIsReady || showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (showLanding) {
    return (
      <>
        <LandingPage onGetStarted={handleGetStarted} />
        <StatusBar style="auto" />
      </>
    );
  }

  if (showLogin) {
    return (
      <>
        <LoginScreen 
          onRegister={handleRegister}
          onLoginSuccess={handleLoginSuccess}
        />
        <StatusBar style="auto" />
      </>
    );
  }

  if (showRegister) {
    return (
      <>
        <RegisterScreen 
          onLogin={handleBackToLogin}
          onRegisterSuccess={handleRegisterSubmit}
        />
        <StatusBar style="auto" />
      </>
    );
  }

  if (showOTP) {
    return (
      <>
        <OTPScreen 
          email={userEmail}
          onVerify={handleVerifyOTP}
        />
        <StatusBar style="auto" />
      </>
    );
  }

  if (showHome) {
    return (
      <>
        <HomePage userData={userData} />
        <StatusBar style="auto" />
      </>
    );
  }

  return (
    <>
      {/* Main app content will go here */}
      <StatusBar style="auto" />
    </>
  );
}
