import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const LandingPage = ({ onGetStarted }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/cvalogonotext.png')}
          style={styles.leftLogo}
          resizeMode="contain"
        />
        <Image
          source={require('../assets/tpmlogo.png')}
          style={styles.rightLogo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.contentContainer}>
        <Image
          source={require('../assets/landingcontent.png')}
          style={styles.contentImage}
          resizeMode="contain"
        />
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>Empowering</Text>
          <Text style={styles.title}>Journeys to Recovery</Text>
          <Text style={styles.description}>
            CVACare provides integrated physical therapy for stroke patients and specialized speech therapy for children, fostering strength, communication, and renewed independence.
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onGetStarted}>
          <Text style={styles.buttonText}>Let's Go!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  leftLogo: {
    width: 80,
    height: 80,
    transform: [{ scale: 2.75 }],
  },
  rightLogo: {
    width: 80,
    height: 80,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  contentImage: {
    width: width,
    height: height * 0.45,
    marginBottom: 10,
  },
  textContainer: {
    paddingHorizontal: 30,
    alignItems: 'center',
    marginTop: -10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 42,
  },
  description: {
    fontSize: 15,
    color: '#333333',
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 22,
    paddingHorizontal: 5,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#E74C3C',
    paddingVertical: 18,
    paddingHorizontal: 80,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LandingPage;
