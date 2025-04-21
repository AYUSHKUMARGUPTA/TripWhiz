import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MapPin } from 'lucide-react-native';

interface DestinationCardProps {
  destination: {
    id: string;
    name: string;
    image: string;
    description: string;
  };
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: destination.image }} style={styles.image} />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.name}>{destination.name}</Text>
        <View style={styles.descriptionContainer}>
          <MapPin size={14} color="#FFFFFF" style={styles.icon} />
          <Text style={styles.description}>{destination.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 240,
    height: 320,
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 4,
  },
  description: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});