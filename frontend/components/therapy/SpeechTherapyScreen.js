import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ArticulationTherapyScreen from './speech/ArticulationTherapyScreen';
import LanguageTherapyScreen from './speech/LanguageTherapyScreen';
import FluencyTherapyScreen from './speech/FluencyTherapyScreen';

const { width } = Dimensions.get('window');

const SpeechTherapyScreen = ({ onBack }) => {
  console.log('SpeechTherapyScreen rendered');
  
  const [selectedTherapy, setSelectedTherapy] = useState(null);

  const handleBeginAssessment = (therapyType) => {
    setSelectedTherapy(therapyType);
  };

  const handleBackFromTherapy = () => {
    setSelectedTherapy(null);
  };

  // Show specific therapy screen if selected
  if (selectedTherapy === 'articulation') {
    return <ArticulationTherapyScreen onBack={handleBackFromTherapy} />;
  }
  if (selectedTherapy === 'language') {
    return <LanguageTherapyScreen onBack={handleBackFromTherapy} />;
  }
  if (selectedTherapy === 'fluency') {
    return <FluencyTherapyScreen onBack={handleBackFromTherapy} />;
  }

  const therapyTypes = [
    {
      id: 1,
      letter: 'A',
      title: 'Articulation Therapy',
      subtitle: 'SOUND PRODUCTION & PRONUNCIATION',
      description: 'Clinical speech sound therapy focused on improving articulation accuracy and phonological development through systematic assessment and intervention.',
      color: '#C9302C',
      type: 'articulation',
      features: [
        'Standardized pronunciation assessments',
        'Multi-trial recording and evaluation system',
        'Consonant and vowel pronunciation scoring metrics',
        'Real-time accuracy feedback sessions',
        'Comprehensive progress monitoring',
        'Professional therapist review interface',
      ],
    },
    {
      id: 2,
      letter: 'L',
      title: 'Language Therapy',
      subtitle: 'RECEPTIVE & EXPRESSIVE LANGUAGE',
      description: 'Comprehensive language intervention program designed to support receptive development, comprehension skills, and expressive language use through structured therapeutic activities.',
      color: '#4A90E2',
      type: 'language',
      features: [
        'Receptive language assessment tasks',
        'Expressive language evaluation protocols',
        'Grammar and syntax development exercises',
        'Quantitative response analysis',
        'Semantic and syntactic scoring system',
        'Age-appropriate intervention progression',
      ],
    },
    {
      id: 3,
      letter: 'F',
      title: 'Fluency Therapy',
      subtitle: 'FLUENCY DISORDERS & SPEECH RATE CONTROL',
      description: 'Evidence-based fluency intervention program designed to address stuttering behaviors, improve speech flow through systematic desensitization and fluency-shaping techniques.',
      color: '#F4A460',
      type: 'fluency',
      features: [
        'Structured reading and speaking tasks',
        'Quantitative speech rate analysis (WPM)',
        'Dysfluency pattern identification',
        'Real-time biofeedback visualization',
        'Fluency enhancement metrics',
        'Systematic progress documentation',
      ],
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Speech Therapy</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.mainTitle}>Speech Therapy Types</Text>
          <Text style={styles.subtitle}>Choose the type of speech therapy you need</Text>
        </View>

        {/* Therapy Cards */}
        <View style={styles.cardsContainer}>
          {therapyTypes.map((therapy) => (
            <View key={therapy.id} style={styles.therapyCard}>
              {/* Letter Badge */}
              <View style={styles.letterBadgeContainer}>
                <View style={[styles.letterBadge, { borderColor: therapy.color }]}>
                  <Text style={[styles.letterText, { color: therapy.color }]}>
                    {therapy.letter}
                  </Text>
                </View>
              </View>

              {/* Card Content */}
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{therapy.title}</Text>
                <Text style={[styles.cardSubtitle, { color: therapy.color }]}>
                  {therapy.subtitle}
                </Text>
                
                <Text style={styles.cardDescription}>{therapy.description}</Text>

                {/* Program Features */}
                <Text style={styles.featuresTitle}>PROGRAM FEATURES:</Text>
                <View style={styles.featuresList}>
                  {therapy.features.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                      <View style={[styles.bullet, { backgroundColor: therapy.color }]} />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                {/* Begin Assessment Button */}
                <TouchableOpacity 
                  style={[styles.assessmentButton, { backgroundColor: therapy.color }]}
                  onPress={() => handleBeginAssessment(therapy.type)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.assessmentButtonText}>BEGIN ASSESSMENT</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
  },

  // Cards Container
  cardsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  // Therapy Card
  therapyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },

  // Letter Badge
  letterBadgeContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  letterBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterText: {
    fontSize: 32,
    fontWeight: 'bold',
  },

  // Card Content
  cardContent: {
    padding: 20,
    paddingTop: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 6,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 15,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
    marginBottom: 20,
    textAlign: 'left',
  },

  // Features
  featuresTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  featuresList: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingLeft: 5,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    marginRight: 10,
  },
  featureText: {
    flex: 1,
    fontSize: 12,
    color: '#555',
    lineHeight: 20,
  },

  // Assessment Button
  assessmentButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  assessmentButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default SpeechTherapyScreen;
