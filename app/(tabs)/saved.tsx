import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, MapPin, Share2, BookMarked } from 'lucide-react-native';
import SavedTripCard from '@/components/SavedTripCard';

export default function SavedScreen() {
  // Mock saved trips data
  const savedTrips = [
    {
      id: '1',
      destination: 'Las Vegas',
      dates: 'Jun 15-18, 2024',
      image: 'https://images.pexels.com/photos/415999/pexels-photo-415999.jpeg',
      description: 'A vibrant 3-day Las Vegas getaway featuring world-class entertainment, dining, and attractions.',
      saved: true,
    },
    {
      id: '2',
      destination: 'New York City',
      dates: 'Jul 10-15, 2024',
      image: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg',
      description: 'Explore the Big Apple with visits to iconic landmarks, world-class museums, and incredible food experiences.',
      saved: true,
    },
    {
      id: '3',
      destination: 'San Francisco',
      dates: 'Aug 5-9, 2024',
      image: 'https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg',
      description: 'Discover the charm of San Francisco with visits to the Golden Gate Bridge, Fisherman\'s Wharf, and more.',
      saved: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Trips</Text>
        <Text style={styles.headerSubtitle}>Your upcoming adventures</Text>
      </View>

      <ScrollView style={styles.tripsList} showsVerticalScrollIndicator={false}>
        {savedTrips.length > 0 ? (
          savedTrips.map((trip) => (
            <SavedTripCard key={trip.id} trip={trip} />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <BookMarked size={64} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>No saved trips yet</Text>
            <Text style={styles.emptyText}>Your saved trips will appear here</Text>
            <TouchableOpacity style={styles.planButton}>
              <Text style={styles.planButtonText}>Plan a Trip</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
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
  tripsList: {
    paddingHorizontal: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 120,
  },
  emptyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  planButton: {
    backgroundColor: '#1A73E8',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  planButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});