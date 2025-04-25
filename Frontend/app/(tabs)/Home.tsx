import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Summary: { userData: { name: string; destination: string; startDate: string; endDate: string; preferences: string[]; googleCalendarSync: boolean } };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState<{
    name: string;
    destination: string;
    startDate: string;
    endDate: string;
    preferences: string[];
    googleCalendarSync: boolean;
  }>({
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
    preferences: [],
    googleCalendarSync: false,
  });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateField, setDateField] = useState<'startDate' | 'endDate' | null>(null);

  const navigation = useNavigation<HomeScreenNavigationProp>();

  React.useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Welcome! What is your name?',
        createdAt: new Date(),
        user: { _id: 2, name: 'TripWhiz' },
      },
    ]);
  }, []);

  const onSend = (newMessages: IMessage[] = []) => {
    const userMessage = newMessages[0].text;
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));

    if (step === 0) {
      setUserData({ ...userData, name: userMessage });
      setStep(1);
      addBotMessage('Great! Where are you planning to go?');
    } else if (step === 1) {
      setUserData({ ...userData, destination: userMessage });
      setStep(2);
      addBotMessage('When does your trip start?');
      setDateField('startDate');
      setDatePickerVisibility(true);
    } else if (step === 2) {
      setUserData({ ...userData, startDate: userMessage });
      setStep(3);
      addBotMessage('When does your trip end?');
      setDateField('endDate');
      setDatePickerVisibility(true);
    } else if (step === 3) {
      setUserData({ ...userData, endDate: userMessage });
      setStep(4);
      addBotMessage('What are your trip preferences? (e.g., food, adventure, historical, shopping)');
    } else if (step === 4) {
      setUserData({ ...userData, preferences: userMessage.split(', ') });
      setStep(5);
      addBotMessage('Would you like to sync this trip with Google Calendar? (yes/no)');
    } else if (step === 5) {
      setUserData({ ...userData, googleCalendarSync: userMessage.toLowerCase() === 'yes' });
      setStep(6);
      addBotMessage('Thank you! Your trip details have been saved. Tap "Submit" to proceed.');
    }
  };

  const addBotMessage = (text: string) => {
    const botMessage: IMessage = {
      _id: Math.random(),
      text,
      createdAt: new Date(),
      user: { _id: 2, name: 'TripWhiz' },
    };
    setMessages((previousMessages) => GiftedChat.append(previousMessages, [botMessage]));
  };

  const handleConfirm = (date: Date) => {
    if (dateField) {
      setUserData({ ...userData, [dateField]: date.toISOString().split('T')[0] });
      setDatePickerVisibility(false);
      setDateField(null);

      if (dateField === 'startDate') {
        addBotMessage('When does your trip end?');
        setDateField('endDate');
        setDatePickerVisibility(true);
      } else {
        addBotMessage('What are your trip preferences? (e.g., food, adventure, historical, shopping)');
        setStep(4);
      }
    }
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{ _id: 1 }}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
      {step === 6 && (
        <Button title="Submit" onPress={() => navigation.navigate('Summary', { userData })} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});