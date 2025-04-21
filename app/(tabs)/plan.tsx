import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Calendar, Clock, MapPin, SendHorizontal as SendHorizonal } from 'lucide-react-native';
import TripSuggestionCard from '@/components/TripSuggestionCard';

export default function PlanScreen() {
  const [tripQuery, setTripQuery] = useState('');
  const [isPlanning, setIsPlanning] = useState(false);
  const [tripPlan, setTripPlan] = useState(null);

  // Sample trip suggestions for UI demonstration
  const tripSuggestions = [
    "I'm going to Las Vegas for 3 days",
    "Weekend trip to New York City",
    "Family vacation in Orlando for a week",
    "Business trip to San Francisco + weekend"
  ];

  // Function to simulate AI trip planning
  const planTrip = () => {
    if (!tripQuery) return;
    
    setIsPlanning(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      // Mock trip planning response
      setTripPlan({
        destination: 'Las Vegas',
        duration: '3 days',
        summary: 'A vibrant 3-day Las Vegas getaway featuring world-class entertainment, dining, and attractions.',
        days: [
          {
            day: 1,
            activities: [
              { 
                type: 'Food', 
                name: 'Breakfast at Bouchon Bistro', 
                description: 'Start with a French breakfast at this Thomas Keller restaurant in the Venetian.',
                timeSlot: '8:00 AM - 9:30 AM'
              },
              { 
                type: 'Attraction', 
                name: 'Explore the Strip', 
                description: 'Walk the famous Las Vegas Boulevard to see iconic hotels and attractions.',
                timeSlot: '10:00 AM - 1:00 PM'
              },
              { 
                type: 'Food', 
                name: 'Lunch at Gordon Ramsay Burger', 
                description: 'Try gourmet burgers created by the celebrity chef.',
                timeSlot: '1:30 PM - 3:00 PM'
              },
              { 
                type: 'Attraction', 
                name: 'Bellagio Fountains', 
                description: 'Watch the spectacular water show outside the Bellagio hotel.',
                timeSlot: '3:30 PM - 4:30 PM'
              },
              { 
                type: 'Food', 
                name: 'Dinner at Picasso', 
                description: 'Fine dining surrounded by original Picasso artworks.',
                timeSlot: '7:00 PM - 9:00 PM'
              },
              { 
                type: 'Entertainment', 
                name: 'Cirque du Soleil Show', 
                description: 'End your day with a world-class performance.',
                timeSlot: '9:30 PM - 11:30 PM'
              },
            ]
          },
          // Additional days would be included here
        ],
        videos: [
          {
            title: 'Top 10 Things to Do in Las Vegas',
            url: 'https://www.youtube.com/watch?v=example1',
            thumbnail: 'https://images.pexels.com/photos/941871/pexels-photo-941871.jpeg'
          },
          {
            title: 'Las Vegas Food Tour 2024',
            url: 'https://www.youtube.com/watch?v=example2',
            thumbnail: 'https://images.pexels.com/photos/604969/pexels-photo-604969.jpeg'
          }
        ]
      });
      
      setIsPlanning(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Plan Your Trip</Text>
          <Text style={styles.headerSubtitle}>Let AI create your perfect itinerary</Text>
        </View>

        <View style={styles.queryContainer}>
          <View style={styles.inputContainer}>
            <MapPin size={20} color="#6B7280" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Where are you going?"
              value={tripQuery}
              onChangeText={setTripQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <TouchableOpacity 
            style={[styles.planButton, !tripQuery ? styles.planButtonDisabled : null]}
            onPress={planTrip}
            disabled={!tripQuery || isPlanning}
          >
            {isPlanning ? (
              <Text style={styles.planButtonText}>Planning...</Text>
            ) : (
              <>
                <Text style={styles.planButtonText}>Plan Trip</Text>
                <SendHorizonal size={18} color="#FFFFFF" style={styles.sendIcon} />
              </>
            )}
          </TouchableOpacity>
        </View>

        {!tripPlan ? (
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>Try these examples:</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {tripSuggestions.map((suggestion, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.suggestionItem}
                  onPress={() => setTripQuery(suggestion)}
                >
                  <Search size={16} color="#6B7280" style={styles.suggestionIcon} />
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ) : (
          <ScrollView style={styles.planContainer} showsVerticalScrollIndicator={false}>
            <TripSuggestionCard trip={tripPlan} />
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#1F2937',
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  queryContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
  },
  planButton: {
    backgroundColor: '#1A73E8',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  planButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  planButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  sendIcon: {
    marginLeft: 8,
  },
  suggestionsContainer: {
    paddingHorizontal: 16,
    flex: 1,
  },
  suggestionsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  suggestionIcon: {
    marginRight: 12,
  },
  suggestionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B5563',
  },
  planContainer: {
    paddingHorizontal: 16,
    flex: 1,
  },
});