import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const TherapyScreen = ({ onBack }) => {
  const [selectedTherapy, setSelectedTherapy] = useState(null);

  const therapyTypes = [
    {
      id: 1,
      name: 'Physical Therapy',
      icon: require('../assets/adaptive-icon.png'), // Placeholder - replace later
      description: 'Specialized treatment to restore movement, reduce pain, and improve physical function. Our expert therapists help you recover from injuries, manage chronic conditions, and enhance your overall mobility.',
      features: [
        'Movement Restoration',
        'Pain Management',
        'Injury Recovery',
        'Strength Building',
      ],
      buttonText: 'Select Physical Therapy',
      buttonColor: '#C9302C',
    },
    {
      id: 2,
      name: 'Speech Therapy',
      icon: require('../assets/adaptive-icon.png'), // Placeholder - replace later
      description: 'Comprehensive speech therapy programs designed to improve communication skills for children. Choose from three specialized therapy types tailored to specific needs.',
      subheading: 'Available Therapy Types:',
      therapyTypes: [
        {
          name: 'Articulation Therapy:',
          description: 'Sound production and pronunciation improvement',
        },
        {
          name: 'Language Therapy:',
          description: 'Receptive and expressive language development',
        },
        {
          name: 'Fluency Therapy:',
          description: 'Stuttering reduction and speech rate control',
        },
      ],
      buttonText: 'Explore Speech Therapy Options',
      buttonColor: '#6B9AC4',
    },
  ];

  const handleTherapyPress = (therapy) => {
    setSelectedTherapy(selectedTherapy?.id === therapy.id ? null : therapy);
  };

  const handleTherapySelect = (therapyType) => {
    console.log('Selected therapy:', therapyType);
    // Navigate to booking or details
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Therapy Services</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Choose Your Therapy Type</Text>
          <Text style={styles.subtitle}>Select the therapy service you need</Text>
        </View>

        <View style={styles.therapyGrid}>
          {therapyTypes.map((therapy) => (
            <View key={therapy.id} style={styles.therapyItemContainer}>
              <TouchableOpacity
                style={styles.therapyCard}
                onPress={() => handleTherapyPress(therapy)}
                activeOpacity={0.7}
              >
                <View style={styles.iconContainer}>
                  <View style={styles.iconCircle}>
                    <Image 
                      source={therapy.icon} 
                      style={styles.therapyIcon}
                      resizeMode="contain"
                    />
                  </View>
                </View>
                <Text style={styles.therapyName}>{therapy.name}</Text>
              </TouchableOpacity>

              {/* Detail Card - Shows when therapy is tapped */}
              {selectedTherapy?.id === therapy.id && (
                <View style={styles.detailCard}>
                  <Text style={styles.detailDescription}>{therapy.description}</Text>
                  
                  {therapy.subheading && (
                    <Text style={styles.detailSubheading}>{therapy.subheading}</Text>
                  )}
                  
                  {therapy.features && (
                    <View style={styles.featuresContainer}>
                      {therapy.features.map((feature, index) => (
                        <View key={index} style={styles.featureItem}>
                          <Text style={styles.checkmark}>✓</Text>
                          <Text style={styles.featureText}>{feature}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                  
                  {therapy.therapyTypes && (
                    <View style={styles.therapyTypesContainer}>
                      {therapy.therapyTypes.map((type, index) => (
                        <View key={index} style={styles.therapyTypeItem}>
                          <Text style={styles.therapyTypeName}>{type.name}</Text>
                          <Text style={styles.therapyTypeDesc}>{type.description}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                  
                  <TouchableOpacity
                    style={[styles.selectButton, { backgroundColor: therapy.buttonColor }]}
                    onPress={() => handleTherapySelect(therapy.name)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.selectButtonText}>{therapy.buttonText}</Text>
                  </TouchableOpacity>
                </View>
              )}
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

  // Title Section
  titleSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
  },

  // Therapy Grid
  therapyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 30,
  },
  therapyItemContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  therapyCard: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    marginBottom: 15,
  },
  iconCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#C9302C',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  therapyIcon: {
    width: 120,
    height: 120,
  },
  therapyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
  },

  // Detail Card Styles
  detailCard: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  detailDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    marginBottom: 15,
    textAlign: 'left',
  },
  detailSubheading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
    marginTop: 10,
  },

  // Features (for Physical Therapy)
  featuresContainer: {
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkmark: {
    fontSize: 18,
    color: '#27AE60',
    marginRight: 10,
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },

  // Therapy Types (for Speech Therapy)
  therapyTypesContainer: {
    marginBottom: 15,
  },
  therapyTypeItem: {
    marginBottom: 12,
  },
  therapyTypeName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  therapyTypeDesc: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },

  // Select Button
  selectButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  selectButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TherapyScreen;
