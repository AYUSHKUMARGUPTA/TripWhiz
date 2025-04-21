import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MapPin, Calendar, Clock, Video, BookMarked, Share2 } from 'lucide-react-native';

interface TripPlanActivity {
  type: string;
  name: string;
  description: string;
  timeSlot: string;
}

interface TripPlanDay {
  day: number;
  activities: TripPlanActivity[];
}

interface TripPlanVideo {
  title: string;
  url: string;
  thumbnail: string;
}

interface TripPlan {
  destination: string;
  duration: string;
  summary: string;
  days: TripPlanDay[];
  videos: TripPlanVideo[];
}

interface TripSuggestionCardProps {
  trip: TripPlan;
}

export default function TripSuggestionCard({ trip }: TripSuggestionCardProps) {
  const [expandedDay, setExpandedDay] = useState(1);
  const [isSaved, setIsSaved] = useState(false);
  
  const toggleSave = () => {
    setIsSaved(!isSaved);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.destination}>{trip.destination}</Text>
          <View style={styles.durationContainer}>
            <Calendar size={16} color="#6B7280" style={styles.icon} />
            <Text style={styles.duration}>{trip.duration}</Text>
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={toggleSave}>
            <BookMarked size={20} color={isSaved ? '#1A73E8' : '#9CA3AF'} fill={isSaved ? '#1A73E8' : 'transparent'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Share2 size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>
      
      <Text style={styles.summary}>{trip.summary}</Text>
      
      <View style={styles.daysContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daysTabsContainer}>
          {trip.days.map((day) => (
            <TouchableOpacity
              key={day.day}
              style={[
                styles.dayTab,
                expandedDay === day.day && styles.activeDayTab
              ]}
              onPress={() => setExpandedDay(day.day)}
            >
              <Text
                style={[
                  styles.dayTabText,
                  expandedDay === day.day && styles.activeDayTabText
                ]}
              >
                Day {day.day}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {trip.days.map((day) => (
          day.day === expandedDay && (
            <View key={day.day} style={styles.dayContentContainer}>
              {day.activities.map((activity, index) => (
                <View key={index} style={styles.activityItem}>
                  <View style={styles.timelineLeft}>
                    <View style={styles.timelineDot} />
                    {index < day.activities.length - 1 && (
                      <View style={styles.timelineLine} />
                    )}
                  </View>
                  
                  <View style={styles.activityContent}>
                    <View style={styles.activityHeader}>
                      <View style={[
                        styles.activityTypeTag,
                        activity.type === 'Food' && styles.foodTag,
                        activity.type === 'Attraction' && styles.attractionTag,
                        activity.type === 'Entertainment' && styles.entertainmentTag,
                      ]}>
                        <Text style={styles.activityTypeText}>{activity.type}</Text>
                      </View>
                      <View style={styles.timeContainer}>
                        <Clock size={14} color="#6B7280" style={styles.timeIcon} />
                        <Text style={styles.timeText}>{activity.timeSlot}</Text>
                      </View>
                    </View>
                    
                    <Text style={styles.activityName}>{activity.name}</Text>
                    <Text style={styles.activityDescription}>{activity.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          )
        ))}
      </View>
      
      <View style={styles.videosSection}>
        <Text style={styles.videosTitle}>Recommended Videos</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.videosContainer}>
          {trip.videos.map((video, index) => (
            <TouchableOpacity key={index} style={styles.videoCard}>
              <Image source={{ uri: video.thumbnail }} style={styles.videoThumbnail} />
              <View style={styles.videoPlayIcon}>
                <Video size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.videoTitle} numberOfLines={2}>{video.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <TouchableOpacity style={styles.viewMapButton}>
        <MapPin size={18} color="#FFFFFF" style={styles.viewMapIcon} />
        <Text style={styles.viewMapText}>View on Map</Text>
      </TouchableOpacity>
    </View>
  );
}

import { useState } from 'react';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  destination: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#1F2937',
    marginBottom: 4,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
  },
  duration: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  summary: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 20,
  },
  daysContainer: {
    marginBottom: 20,
  },
  daysTabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  dayTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F3F4F6',
  },
  activeDayTab: {
    backgroundColor: '#1A73E8',
  },
  dayTabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B5563',
  },
  activeDayTabText: {
    color: '#FFFFFF',
  },
  dayContentContainer: {
    marginBottom: 8,
  },
  activityItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineLeft: {
    width: 24,
    alignItems: 'center',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#1A73E8',
    marginTop: 4,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginTop: 4,
    marginBottom: -12,
  },
  activityContent: {
    flex: 1,
    marginLeft: 12,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityTypeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  foodTag: {
    backgroundColor: '#FEF3C7',
  },
  attractionTag: {
    backgroundColor: '#DBEAFE',
  },
  entertainmentTag: {
    backgroundColor: '#F3E8FF',
  },
  activityTypeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4B5563',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIcon: {
    marginRight: 4,
  },
  timeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  activityName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  activityDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  videosSection: {
    marginBottom: 20,
  },
  videosTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 12,
  },
  videosContainer: {
    flexDirection: 'row',
  },
  videoCard: {
    width: 200,
    marginRight: 12,
  },
  videoThumbnail: {
    width: 200,
    height: 112,
    borderRadius: 8,
    marginBottom: 8,
  },
  videoPlayIcon: {
    position: 'absolute',
    top: 44,
    left: 88,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
  },
  viewMapButton: {
    backgroundColor: '#1A73E8',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
  },
  viewMapIcon: {
    marginRight: 8,
  },
  viewMapText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});