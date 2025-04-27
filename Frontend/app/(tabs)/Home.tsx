import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import GeminiChat from '../../components/GeminiChat';
import { useRouter } from 'expo-router';

export default function Home() {
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();
  
  const handleTripComplete = (data: any) => {
    console.log("Collected User Data:", data);
    setUserData(data);
  };
  const handleSubmit = () => {
    if (userData) {
      router.push({
        pathname: '/SummaryScreen',
        params: {
          userData: JSON.stringify(userData)  // Pass as string, safer for URL params
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <GeminiChat onComplete={handleTripComplete} />
      {userData && (
            <View style={styles.buttonContainer}>
            <Button title="Submit Trip Data" onPress={handleSubmit} color="#007AFF"/>
            </View>
      )}
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  buttonContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
