import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SummaryScreen({ route }: any) {
  const { userData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trip Summary</Text>
      <Text>Name: {userData.name}</Text>
      <Text>Destination: {userData.destination}</Text>
      <Text>Start Date: {userData.startDate}</Text>
      <Text>End Date: {userData.endDate}</Text>
      <Text>Preferences: {userData.preferences.join(', ')}</Text>
      <Text>Google Calendar Sync: {userData.googleCalendarSync ? 'Yes' : 'No'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});