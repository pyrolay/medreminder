import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="custom-pin" />
        <Stack.Screen
          name="medication/add"
          options={{
            headerShown: false,
            headerBackTitle: "",
            title: "",
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
