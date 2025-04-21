import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Calendar, MapPin, Share2, Trash2 } from 'lucide-react-native';
import { useState } from 'react';

interface SavedTripProps {
  trip: {
    id: string;
    destination: string;
    dates: string;
    image: string;
    description: string;
    saved: boolean;
  };
}

export default function SavedTripCard({ trip }: SavedTripProps) {
  const [saved, setSaved] = useState(trip.saved);

  const handleRemove = () => {
    setSaved(false);
    // Implement actual deletion
  };

  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: trip.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.destination}>{trip.destination}</Text>
        
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Calendar size={16} color="#6B7280" style={styles.icon} />
            <Text style={styles.infoText}>{trip.dates}</Text>
          </View>
        </View>
        
        <Text style={styles.description}>{trip.description}</Text>
        
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <MapPin size={16} color="#1A73E8" />
            <Text style={styles.actionText}>View</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Share2 size={16} color="#6B7280" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleRemove}>
            <Trash2 size={16} color="#F43F5E" />
            <Text style={[styles.actionText, styles.removeText]}>Remove</Text>
          </TouchableOpacity>
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
    height: 160,
  },
  content: {
    padding: 16,
  },
  destination: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#1F2937',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    marginRight: 6,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 16,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  removeText: {
    color: '#F43F5E',
  },
});