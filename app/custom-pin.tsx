import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import {
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
const PIN_KEY = "userPin";
const EMAIL_KEY = "userEmail";

export default function CustomPinScreen() {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [storedPin, setStoredPin] = useState<string>();
  const [error, setError] = useState<string | null>(null);

  const isCreating = !storedPin;

  useEffect(() => {
    (async () => {
      const savedPin = await SecureStore.getItemAsync(PIN_KEY);
      setStoredPin(savedPin ?? undefined);
    })();
  }, []);

  const handleSave = async () => {
    if (!email || pin.length !== 4)
      return setError("Enter valid email and 4-digit PIN");
    await SecureStore.setItemAsync(PIN_KEY, pin);
    await SecureStore.setItemAsync(EMAIL_KEY, email);
    router.replace("/custom-pin");
  };

  const handleUnlock = () => {
    if (pin === storedPin) return router.replace("/home");
    setError("Incorrect PIN");
    setPin("");
  };

  const handleSubmit = () => {
    setError(null);
    if (isCreating) {
      handleSave();
    } else {
      handleUnlock();
    }
  };

  return (
    <LinearGradient colors={["#4CAF50", "#81C784"]} style={styles.container}>
      <ScrollView
        contentContainerStyle={[{flexGrow: 1}]}
        keyboardShouldPersistTaps="handled"
      >
        <KeyboardAvoidingView
          style={[styles.content, { flex: 1 }]}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="lock-closed-outline" size={80} color="white" />
          </View>

          <Text style={styles.title}>MedRemind</Text>
          <Text style={styles.subtitle}>
            {isCreating ? "Set up your access" : "Enter your PIN"}
          </Text>
          <View style={styles.card}>
            {isCreating && (
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#aaa"
              />
            )}

            <TextInput
              style={[styles.input, styles.pinInput]}
              placeholder="- - - -"
              value={pin}
              onChangeText={setPin}
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry
              placeholderTextColor="#aaa"
            />

            {error && <Text style={styles.errorText}>{error}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>
                {isCreating ? "Save PIN" : "Unlock"}
              </Text>
            </TouchableOpacity>

            {!isCreating && (
              <TouchableOpacity onPress={() => router.push("/forgot-pin")}>
                <Text style={styles.link}>Forgot my PIN</Text>
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
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
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "#F44336",
    fontSize: 14,
    marginBottom: 10,
  },
  link: {
    color: "#1976D2",
    marginTop: 20,
    fontWeight: "600",
  },
});
