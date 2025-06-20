import { Ionicons } from "@expo/vector-icons";
import Ionicos from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function AuthScreen() {
  const [hasBiometrics, setHadBiometrics] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState(null);

  return (
    <LinearGradient colors={["#4CAF50", "#81C784"]} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="medical" size={80} color={"white"} />
        </View>

        <Text style={styles.title}>MedRemind</Text>
        <Text style={styles.subtitle}>Your Personal Medication Reminder</Text>

        <View style={styles.card}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.instructionText}>
            {hasBiometrics
              ? "Use face ID/TouchID or PIN to access your medications"
              : "Enter your PIN to access your medications"}
          </Text>

          <TouchableOpacity
            style={[styles.button, isAuthenticating && styles.buttonDisabled]}
            /* onPress={authenticate} */
            disabled={isAuthenticating}
            activeOpacity={0.6}
          >
            <Ionicos
              name={hasBiometrics ? "finger-print-outline" : "keypad-outline"}
              size={24}
              color="white"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>
              {isAuthenticating
                ? "Verifying..."
                : hasBiometrics
                ? "Authenticate"
                : "Enter PIN"}
            </Text>
          </TouchableOpacity>

          {error && (
            <View style={styles.errorContainer}>
              <Ionicos name="alert-circle" size={20} color={"#F44336"} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
        </View> 
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
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
    marginBottom: 40,
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    width: width - 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonIcon: {
    marginRight: 10,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FFEBEE",
    borderRadius: 8,
  },
  errorText: {
    color: "#F44336",
    fontSize: 14,
    marginLeft: 8,
  },
});
