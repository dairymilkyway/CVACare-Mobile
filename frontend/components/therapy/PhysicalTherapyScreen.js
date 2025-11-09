import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const PhysicalTherapyScreen = ({ onBack }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const cardAnims = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  useEffect(() => {
    // Fade in and slide up animation for header
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Staggered animation for cards
    const cardAnimations = cardAnims.map((anim, index) => 
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        delay: index * 150,
        useNativeDriver: true,
      })
    );

    Animated.stagger(100, cardAnimations).start();
  }, []);

  const services = [
    {
      id: 1,
      icon: '💪',
      title: 'Strength Building',
      description: 'Targeted exercises to rebuild muscle strength and endurance',
      color: '#FFD700',
    },
    {
      id: 2,
      icon: '🎯',
      title: 'Pain Management',
      description: 'Techniques to reduce and manage chronic or acute pain',
      color: '#FF6B9D',
    },
    {
      id: 3,
      icon: '🔄',
      title: 'Mobility Restoration',
      description: 'Improve range of motion and functional movement',
      color: '#4A90E2',
    },
    {
      id: 4,
      icon: '⚡',
      title: 'Injury Recovery',
      description: 'Comprehensive rehabilitation programs for faster recovery',
      color: '#FFB347',
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Physical Therapy</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section with Animation */}
        <Animated.View 
          style={[
            styles.headerSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.iconHeader}>🏃</Text>
          <Text style={styles.mainTitle}>Physical Therapy</Text>
          <Text style={styles.subtitle}>
            Restore movement, reduce pain, and improve your physical function
          </Text>
        </Animated.View>

        {/* Welcome Card */}
        <Animated.View 
          style={[
            styles.welcomeCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.welcomeTitle}>Welcome to Physical Therapy Services</Text>
          <Text style={styles.welcomeText}>
            Our physical therapy program is designed to help you recover from injuries, manage chronic conditions, and enhance your overall mobility and quality of life.
          </Text>
        </Animated.View>

        {/* Services Grid */}
        <View style={styles.servicesGrid}>
          {services.map((service, index) => (
            <Animated.View
              key={service.id}
              style={[
                styles.serviceCard,
                {
                  opacity: cardAnims[index],
                  transform: [
                    {
                      translateY: cardAnims[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      }),
                    },
                    {
                      scale: cardAnims[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.9, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              <View style={[styles.iconContainer, { backgroundColor: service.color + '20' }]}>
                <Text style={styles.serviceIcon}>{service.icon}</Text>
              </View>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceDescription}>{service.description}</Text>
            </Animated.View>
          ))}
        </View>

        {/* Action Buttons */}
        <Animated.View 
          style={[
            styles.actionButtons,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <TouchableOpacity style={styles.scheduleButton} activeOpacity={0.8}>
            <Text style={styles.scheduleButtonText}>Schedule an Appointment</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.viewSessionsButton} activeOpacity={0.8}>
            <Text style={styles.viewSessionsButtonText}>View My Sessions</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 34, // Same width as back button for centering
  },

  // Content Styles
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 30,
  },

  // Header Section
  headerSection: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
  iconHeader: {
    fontSize: 50,
    marginBottom: 15,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },

  // Welcome Card
  welcomeCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#C9302C',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },

  // Services Grid
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  serviceCard: {
    width: (width - 60) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceIcon: {
    fontSize: 36,
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  serviceDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },

  // Action Buttons
  actionButtons: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  scheduleButton: {
    backgroundColor: '#C9302C',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  scheduleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewSessionsButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#C9302C',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  viewSessionsButtonText: {
    color: '#C9302C',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PhysicalTherapyScreen;
