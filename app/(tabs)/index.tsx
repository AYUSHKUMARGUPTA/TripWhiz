import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin, ArrowRight } from 'lucide-react-native';
import DestinationCard from '@/components/DestinationCard';
import RecentTripCard from '@/components/RecentTripCard';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock featured destinations
  const featuredDestinations = [
    {
      id: '1',
      name: 'Las Vegas',
      image: 'https://images.pexels.com/photos/415999/pexels-photo-415999.jpeg',
      description: 'Entertainment Capital of the World',
    },
    {
      id: '2',
      name: 'New York City',
      image: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg',
      description: 'The Big Apple',
    },
    {
      id: '3',
      name: 'San Francisco',
      image: 'https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg',
      description: 'The Golden City',
    },
  ];

  // Mock recent trips
  const recentTrips = [
    {
      id: '1',
      destination: 'Miami',
      dates: 'Jun 15-18, 2024',
      image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg',
    },
    {
      id: '2',
      destination: 'Chicago',
      dates: 'May 5-8, 2024',
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, Traveler!</Text>
          <Text style={styles.subGreeting}>Where to next?</Text>
        </View>

        <TouchableOpacity style={styles.searchBar}>
          <Search size={18} color="#6B7280" />
          <Text style={styles.searchText}>
            "I'm going to Las Vegas for 3 days..."
          </Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Destinations</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <ArrowRight size={16} color="#1A73E8" />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {featuredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Trips</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <ArrowRight size={16} color="#1A73E8" />
            </TouchableOpacity>
          </View>

          {recentTrips.map((trip) => (
            <RecentTripCard key={trip.id} trip={trip} />
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Experiences</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <ArrowRight size={16} color="#1A73E8" />
            </TouchableOpacity>
          </View>

          <View style={styles.experienceContainer}>
            <TouchableOpacity style={styles.experienceCard}>
              <View style={[styles.experienceIcon, { backgroundColor: '#FFE1E6' }]}>
                <Text style={styles.emojiIcon}>🍽️</Text>
              </View>
              <Text style={styles.experienceText}>Food Tours</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.experienceCard}>
              <View style={[styles.experienceIcon, { backgroundColor: '#E0F7FA' }]}>
                <Text style={styles.emojiIcon}>🏞️</Text>
              </View>
              <Text style={styles.experienceText}>Nature</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.experienceCard}>
              <View style={[styles.experienceIcon, { backgroundColor: '#FFF8E1' }]}>
                <Text style={styles.emojiIcon}>🎭</Text>
              </View>
              <Text style={styles.experienceText}>Culture</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.experienceCard}>
              <View style={[styles.experienceIcon, { backgroundColor: '#E8F5E9' }]}>
                <Text style={styles.emojiIcon}>🏄</Text>
              </View>
              <Text style={styles.experienceText}>Adventure</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingTop: 16,
    paddingBottom: 24,
  },
  greeting: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#1F2937',
    marginBottom: 4,
  },
  subGreeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    marginLeft: 8,
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1A73E8',
    marginRight: 4,
  },
  horizontalScroll: {
    paddingLeft: 16,
  },
  experienceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  experienceCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  experienceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  emojiIcon: {
    fontSize: 24,
  },
  experienceText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
  },
});