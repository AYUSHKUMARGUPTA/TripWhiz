import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Star, ArrowRight } from 'lucide-react-native';

interface ExploreCardProps {
  destination: {
    id: string;
    name: string;
    image: string;
    rating: number;
    reviewCount: number;
  };
}

export default function ExploreCard({ destination }: ExploreCardProps) {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: destination.image }} style={styles.image} />
      <View style={styles.content}>
        <View>
          <Text style={styles.name}>{destination.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={16} color="#FBBF24" fill="#FBBF24" style={styles.star} />
            <Text style={styles.rating}>
              {destination.rating} <Text style={styles.reviews}>({destination.reviewCount} reviews)</Text>
            </Text>
          </View>
        </View>
        <View style={styles.viewButton}>
          <ArrowRight size={20} color="#1A73E8" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 4,
  },
  rating: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
  },
  reviews: {
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  viewButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});