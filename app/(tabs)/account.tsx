import { Box } from "@/components/ui/Box";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import React, { useState } from "react";
import { ScrollView, TextInput } from "react-native";

export default function AccountScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuthSubmit = () => {
    if (isSignup) {
      console.log("Signing up with", email, password);
      // TODO: Signup logic
    } else {
      console.log("Logging in with", email, password);
      // TODO: Login logic
    }
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <Box flex={1} backgroundColor="background" p="m" justifyContent="center">
        <Text variant="header" mb="l">
          {isSignup ? "🔐 Sign Up" : "🔑 Login"}
        </Text>

        <Box mb="m">
          <Text mb="s">Email</Text>
          <TextInput
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={{
              backgroundColor: "#f0f0f0",
              padding: 12,
              borderRadius: 8,
              fontSize: 16,
              color: "#111",
            }}
          />
        </Box>

        <Box mb="m">
          <Text mb="s">Password</Text>
          <TextInput
            placeholder="********"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{
              backgroundColor: "#f0f0f0",
              padding: 12,
              borderRadius: 8,
              fontSize: 16,
              color: "#111",
            }}
          />
        </Box>

        <Button
          label={isSignup ? "Create Account" : "Login"}
          onPress={handleAuthSubmit}
          mb="m"
        />

        <Text
          mt="m"
          textAlign="center"
          color="primary"
          onPress={() => setIsSignup(!isSignup)}
          style={{ textDecorationLine: "underline" }}
        >
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign up"}
        </Text>
      </Box>
    );
  }

  return (
    <Box flex={1} backgroundColor="background" p="m">
      <Text variant="header" mb="m">
        👤 Account
      </Text>

      <ScrollView>
        <Box backgroundColor="cardBackground" p="m" borderRadius="m" mb="s">
          <Text>
            Account settings and profile information will be displayed here.
          </Text>
        </Box>
        <Box backgroundColor="cardBackground" p="m" borderRadius="m" mb="s">
          <Text>
            Users can manage their preferences, sync data, and view reading
            statistics.
          </Text>
        </Box>

        <Button
          label="Log Out"
          onPress={() => {
            setIsLoggedIn(false);
            setEmail("");
            setPassword("");
          }}
          mt="l"
        />
      </ScrollView>
    </Box>
  );
}
