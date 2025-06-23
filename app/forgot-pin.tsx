import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");
const VERIFICATION_CODE = "123456"; // MOCKED CODE FOR DEMO PURPOSES

export default function ForgotPin() {
  const [email, setEmail] = useState<string | null>(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    SecureStore.getItemAsync("userEmail").then(setEmail);
  }, []);

  const handleVerify = async () => {
    if (code === VERIFICATION_CODE) {
      await SecureStore.deleteItemAsync("userPin");
      await SecureStore.deleteItemAsync("userEmail");
      Alert.alert("PIN reset", "Your PIN has been deleted.");
      router.replace("/");
    } else {
      Alert.alert("Invalid Code", "Please try again.");
    }
  };

  return (
    <LinearGradient colors={["#4CAF50", "#81C784"]} style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={60}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.iconContainer}>
            <Ionicons name="mail-unread-outline" size={80} color="white" />
          </View>

          <Text style={styles.title}>MedRemind</Text>
          <Text style={styles.subtitle}>
            Verify your email to reset your PIN
          </Text>

          <View style={styles.card}>
            <Text style={styles.info}>
              A code has been sent to your email {email ? `(${email})` : "..."}
            </Text>

            <TextInput
              style={[styles.input, styles.pinInput]}
              placeholder="1 2 3 4 5 6"
              value={code}
              onChangeText={setCode}
              keyboardType="numeric"
              maxLength={6}
              placeholderTextColor="#aaa"
            />

            <TouchableOpacity style={styles.button} onPress={handleVerify}>
              <Text style={styles.buttonText}>Verify & Reset</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  iconContainer: {
    width: 120,
    height: 120,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 30,
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    width: width - 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  info: {
    fontSize: 16,
    color: "#444",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "100%",
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  pinInput: {
    fontSize: 28,
    letterSpacing: 8,
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
