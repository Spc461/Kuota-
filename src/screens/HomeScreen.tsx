import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface HomeScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

export default function HomeScreen({ navigation }: HomeScreenProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.subtitleText}>You are now logged in</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Firebase Status</Text>
          <Text style={styles.cardText}>Disabled for development</Text>
          <Text style={styles.cardSubtext}>
            Native modules are not loaded to prevent crashes
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>App Features</Text>
          <Text style={styles.cardText}>✓ Navigation working</Text>
          <Text style={styles.cardText}>✓ Screens rendering</Text>
          <Text style={styles.cardText}>✓ User interaction</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Development Mode</Text>
          <Text style={styles.infoText}>
            This app is running without Firebase dependencies.
            {"\n\n"}
            To enable Firebase:
            {"\n"}1. Configure native build properly
            {"\n"}2. Add Firebase credentials
            {"\n"}3. Uncomment Firebase initialization code
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.logoutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  cardSubtext: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976d2',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
