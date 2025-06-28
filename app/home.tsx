import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle } from "react-native-svg";

const { width } = Dimensions.get("window");

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularProgressProps {
  progress: number;
  totalDoses: number;
  completedDoses: number;
}

const CircularProgress = ({
  progress,
  totalDoses,
  completedDoses,
}: CircularProgressProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const size = width * 0.55;
  const strokeWidth = 15;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }),
    [progress];

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressTextContainer}>
        <Text style={styles.progressPercentage}>{Math.round(progress)}%</Text>
        <Text style={styles.progressLabel}>
          {" "}
          {completedDoses} of {totalDoses} doses
        </Text>
      </View>
      <Svg width={size} height={size} style={styles.progressRing}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#fff"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
    </View>
  );
};

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient style={styles.header} colors={["#1A8E2D", "#146922"]}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.greetingText}>Daily Progress</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color="white" />
              {
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationCount}>1</Text>
                </View>
              }
            </TouchableOpacity>
          </View>
          {/* CIRCULAR PROGRESS */}
          <CircularProgress progress={50} totalDoses={10} completedDoses={5} />
        </View>
      </LinearGradient>
      <View style={styles.content}>
        <View>
          <Text>Quick Actions</Text>
          <View></View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 600,
    color: "#fff",
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  notificationButton: {
    position: "relative",
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 12,
    marginLeft: 8,
  },
  notificationBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 20,
    backgroundColor: "#FF5252",
    borderRadius: 10,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: "#146922",
  },
  notificationText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "white",
  },
  notificationCount: {
    fontSize: 11,
    fontWeight: "bold",
    color: "white",
  },
  progressContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  progressTextContainer: {
    position: "absolute",
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  progressDetails: {
    fontSize: 11,
    fontWeight: "bold",
    color: "white",
  },
  progressPercentage: {
    fontSize: 36,
    color: "white",
    fontWeight: "bold",
  },
  progressLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "bold",
  },
  progressRing: {
    transform: [{ rotate: "-90deg" }],
  },
});
