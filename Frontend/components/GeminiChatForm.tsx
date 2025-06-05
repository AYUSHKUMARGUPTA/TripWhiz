import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

interface Props {
  onComplete: (userData: any) => void;
}

const GeminiChatForm = ({ onComplete }: Props) => {
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [preferences, setPreferences] = useState("");
  const [googleCalendarSync, setGoogleCalendarSync] = useState(false);

  const handleSubmit = () => {
    const userData = {
      name,
      destination,
      startDate,
      endDate,
      preferences: preferences.split(",").map((pref) => pref.trim()),
      googleCalendarSync: googleCalendarSync ? "Yes" : "No",
    };
    onComplete(userData);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.wrapper}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Trip Planner Form</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Destination</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter destination"
          value={destination}
          onChangeText={setDestination}
        />

        <Text style={styles.label}>Start Date (MM/DD/YYYY)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 06/10/2025"
          value={startDate}
          onChangeText={setStartDate}
        />

        <Text style={styles.label}>End Date (MM/DD/YYYY)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 06/20/2025"
          value={endDate}
          onChangeText={setEndDate}
        />

        <Text style={styles.label}>Preferences (comma separated)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Food, Adventure"
          value={preferences}
          onChangeText={setPreferences}
        />

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Sync to Google Calendar</Text>
          <Switch
            value={googleCalendarSync}
            onValueChange={setGoogleCalendarSync}
          />
        </View>

        <Button title="Submit Trip Data" onPress={handleSubmit} color="#007AFF" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
});

export default GeminiChatForm;
