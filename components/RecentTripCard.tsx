import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Calendar, ArrowRight } from 'lucide-react-native';

interface RecentTripCardProps {
  trip: {
    id: string;
    destination: string;
    dates: string;
    image: string;
  };
}

export default function RecentTripCard({ trip }: RecentTripCardProps) {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: trip.image }} style={styles.image} />
      <View style={styles.content}>
        <View>
          <Text style={styles.destination}>{trip.destination}</Text>
          <View style={styles.dateContainer}>
            <Calendar size={14} color="#6B7280" style={styles.icon} />
            <Text style={styles.dates}>{trip.dates}</Text>
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
    height: 120,
  },
  content: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  destination: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
  },
  dates: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
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