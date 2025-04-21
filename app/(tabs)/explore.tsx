import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin, Star } from 'lucide-react-native';
import ExploreCard from '@/components/ExploreCard';

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock popular destinations data
  const popularDestinations = [
    {
      id: '1',
      name: 'Las Vegas, NV',
      image: 'https://images.pexels.com/photos/415999/pexels-photo-415999.jpeg',
      rating: 4.8,
      reviewCount: 2453,
    },
    {
      id: '2',
      name: 'New York City, NY',
      image: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg',
      rating: 4.9,
      reviewCount: 4327,
    },
    {
      id: '3',
      name: 'San Francisco, CA',
      image: 'https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg',
      rating: 4.7,
      reviewCount: 1842,
    },
    {
      id: '4',
      name: 'Miami, FL',
      image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg',
      rating: 4.6,
      reviewCount: 1523,
    },
    {
      id: '5',
      name: 'Chicago, IL',
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      rating: 4.5,
      reviewCount: 1328,
    },
  ];

  // Categories for filtering
  const categories = [
    'All', 'Popular', 'Beaches', 'Mountains', 'Cities', 'National Parks'
  ];

  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
        <Text style={styles.headerSubtitle}>Discover amazing destinations</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#6B7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search destinations"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              activeCategory === category && styles.activeCategoryButton,
            ]}
            onPress={() => setActiveCategory(category)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                activeCategory === category && styles.activeCategoryButtonText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.destinationList} showsVerticalScrollIndicator={false}>
        {popularDestinations.map((destination) => (
          <ExploreCard key={destination.id} destination={destination} />
        ))}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeCategoryButton: {
    backgroundColor: '#1A73E8',
    borderColor: '#1A73E8',
  },
  categoryButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B5563',
  },
  activeCategoryButtonText: {
    color: '#FFFFFF',
  },
  destinationList: {
    paddingHorizontal: 16,
  },
});