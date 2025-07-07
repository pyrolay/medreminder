import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function AddMedicationScreen() {
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
            <View>
                <Text>How often?</Text>
                 {/* Render frequency options */}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
