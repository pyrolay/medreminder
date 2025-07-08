import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const FREQUENCIES = [
  {
    id: "1",
    label: "Once daily",
    icon: "sunny-outline" as const,
    times: ["09:00"],
  },
  {
    id: "2",
    label: "Twice daily",
    icon: "sync-outline" as const,
    times: ["09:00", "21:00"],
  },
  {
    id: "3",
    label: "Three times daily",
    icon: "time-outline" as const,
    times: ["09:00", "15:00", "21:00"],
  },
  {
    id: "4",
    label: "Four times daily",
    icon: "repeat-outline" as const,
    times: ["09:00", "13:00", "17:00", "21:00"],
  },
  { id: "5", label: "As needed", icon: "calendar-outline" as const, times: [] },
];

const DURATIONS = [
  { id: "1", label: "7 days", value: 7 },
  { id: "2", label: "14 days", value: 14 },
  { id: "3", label: "30 days", value: 30 },
  { id: "4", label: "90 days", value: 90 },
  { id: "5", label: "Ongoing", value: -1 },
];

export default function AddMedicationScreen() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [form, setForm] = useState({
    name: "",
    dosage: "",
    frequency: "",
    duration: "",
    startDate: new Date(),
    times: ["09:00"],
    notes: "",
    reminderEnabled: true,
    refillReminder: false,
    currentSupply: "",
    refillAt: "",
  });

  const renderFrequencyOptions = () => {
    return (
      <View>
        {FREQUENCIES.map((freq) => (
          <TouchableOpacity key={freq.id}>
            <View>
              <Ionicons name={freq.icon} size={24} />
              <Text>{freq.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderDurationOptions = () => {
    return (
      <View>
        {DURATIONS.map((dur) => (
          <TouchableOpacity key={dur.id}>
            <View>
              <Text>{dur.value > 0 ? dur.value : "∞"}</Text>
              <Text>{dur.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View>
      {/*  */}
      <LinearGradient
        colors={["#1A8E2D", "#146922"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View>
        <View>
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={28} color={"#1A8E2D"} />
          </TouchableOpacity>
          <Text>New Medication</Text>
        </View>

        <ScrollView showsHorizontalScrollIndicator={false}>
          <View>
            {/* Basic Information */}
            <View>
              <TextInput
                placeholder="Medication Name"
                placeholderTextColor={"#999"}
              />
            </View>
            <View>
              <TextInput
                placeholder="Dosage (e.g., 500mg)"
                placeholderTextColor={"#999"}
              />
            </View>
            {/* Schedule */}
            <View>
              {/* Render frequency options */}
              <Text>How often?</Text>
              {renderFrequencyOptions()}

              {/* Render duration options */}
              <Text>For how long?</Text>
              {renderDurationOptions()}

              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <View>
                  <Ionicons name="calendar" size={20} color={"#1A8E2D"} />
                </View>
                <Text>Starts: {form.startDate.toDateString()}</Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  mode="date"
                  value={form.startDate}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setForm({ ...form, startDate: selectedDate });
                    }
                  }}
                />
              )}

              <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                <Text>Time: {form.times[0]}</Text>
              </TouchableOpacity>

              {showTimePicker && (
                <DateTimePicker
                  mode="time"
                  value={(() => {
                    const [hours, minutes] = form.times[0]
                      .split(":")
                      .map(Number);
                    const date = new Date();
                    date.setHours(hours, minutes, 0, 0);
                    return date;
                  })()}
                  onChange={(event, selectedTime) => {
                    setShowTimePicker(false);
                    if (selectedTime) {
                      const formatted = selectedTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                      setForm({ ...form, times: [formatted] });
                    }
                  }}
                />
              )}
            </View>
          </View>

          {/* Reminders */}
          <View>
            <View>
              <View>
                <View>
                  <Ionicons name="notifications" color={"#1A8E2D"} />
                </View>
                <View>
                  <Text>Reminders</Text>
                  <Text>
                    Get notified when its time to take your medication
                  </Text>
                </View>
              </View>
              <Switch
                trackColor={{ false: "#ddd", true: "#1A8E2D" }}
                thumbColor={"white"}
              />
            </View>
          </View>

          {/* Refill Tracking */}

          {/* Notes */}
          <View>
            <View>
              <TextInput
                placeholder="Add notes or special intructions..."
                placeholderTextColor="#999"
              />
            </View>
          </View>
        </ScrollView>
        <View>
          <TouchableOpacity>
            <LinearGradient
              colors={["#1A8E2D", "#146922"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text>
                Add Medication
                {/* {isSubmitting ? "Adding..." : "Add Medication"} */}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
