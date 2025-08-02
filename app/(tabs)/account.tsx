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
      <Box flex={1} backgroundColor="background" justifyContent="center">
        <Box mx="xl" my="l">
          <Box alignItems="center" mb="xl">
            <Box
              width={80}
              height={80}
              backgroundColor="primary"
              justifyContent="center"
              alignItems="center"
              mb="l"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <Text style={{ fontSize: 32 }}>{isSignup ? "🔐" : "🔑"}</Text>
            </Box>
            <Text
              variant="header"
              textAlign="center"
              mb="s"
              style={{ fontSize: 28, fontWeight: "bold" }}
            >
              {isSignup ? "Create Account" : "Welcome Back"}
            </Text>
            <Text textAlign="center" style={{ fontSize: 16 }}>
              {isSignup ? "Join us to get started" : "Sign in to continue"}
            </Text>
          </Box>

          <Box
            backgroundColor="cardBackground"
            borderRadius="xl"
            p="xl"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 4,
            }}
          >
            <Box mb="l">
              <Text mb="s" style={{ fontSize: 14, fontWeight: "600" }}>
                Email Address
              </Text>
              <TextInput
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={{
                  backgroundColor: "#f8f9fa",
                  padding: 16,
                  borderRadius: 12,
                  fontSize: 16,
                  color: "#111",
                  borderWidth: 1,
                  borderColor: "#e9ecef",
                }}
              />
            </Box>

            <Box mb="xl">
              <Text mb="s" style={{ fontSize: 14, fontWeight: "600" }}>
                Password
              </Text>
              <TextInput
                placeholder="Enter your password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={{
                  backgroundColor: "#f8f9fa",
                  padding: 16,
                  borderRadius: 12,
                  fontSize: 16,
                  color: "#111",
                  borderWidth: 1,
                  borderColor: "#e9ecef",
                }}
              />
            </Box>

            <Button
              label={isSignup ? "Create Account" : "Sign In"}
              onPress={handleAuthSubmit}
              style={{
                borderRadius: 12,
                paddingVertical: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            />
          </Box>

          <Box alignItems="center" mt="xl">
            <Text
              textAlign="center"
              color="primary"
              onPress={() => setIsSignup(!isSignup)}
              style={{
                textDecorationLine: "underline",
                fontSize: 16,
                fontWeight: "500",
                paddingVertical: 8,
              }}
            >
              {isSignup
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </Text>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box flex={1} backgroundColor="background">
      <Box
        backgroundColor="cardBackground"
        pt="xl"
        pb="l"
        px="xl"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2,
        }}
      >
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          mb="s"
        >
          <Box
            width={40}
            height={40}
            backgroundColor="primary"
            justifyContent="center"
            alignItems="center"
            mr="m"
          >
            <Text style={{ fontSize: 18 }}>👤</Text>
          </Box>
          <Text variant="header" style={{ fontSize: 24, fontWeight: "bold" }}>
            My Account
          </Text>
        </Box>
      </Box>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
        <Box
          backgroundColor="cardBackground"
          borderRadius="xl"
          p="xl"
          mb="l"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Box flexDirection="row" alignItems="center" mb="l">
            <Box
              width={60}
              height={60}
              backgroundColor="primary"
              justifyContent="center"
              alignItems="center"
              mr="l"
            >
              <Text style={{ fontSize: 24 }}>👤</Text>
            </Box>
            <Box flex={1}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }} mb="xs">
                Profile Settings
              </Text>
              <Text color="text" style={{ fontSize: 14 }}>
                Manage your personal information
              </Text>
            </Box>
          </Box>
          <Text color="text" style={{ fontSize: 15, lineHeight: 22 }}>
            Update your profile information, change your display name, and
            manage your account preferences.
          </Text>
        </Box>

        <Box
          backgroundColor="cardBackground"
          borderRadius="xl"
          p="xl"
          mb="l"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Box flexDirection="row" alignItems="center" mb="l">
            <Box
              width={60}
              height={60}
              backgroundColor="secondary"
              justifyContent="center"
              alignItems="center"
              mr="l"
            >
              <Text style={{ fontSize: 24 }}>⚙️</Text>
            </Box>
            <Box flex={1}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }} mb="xs">
                Preferences & Data
              </Text>
              <Text color="text" style={{ fontSize: 14 }}>
                Customize your reading experience
              </Text>
            </Box>
          </Box>
          <Text color="text" style={{ fontSize: 15, lineHeight: 22 }}>
            Manage your reading preferences, sync your data across devices, and
            view detailed reading statistics and progress.
          </Text>
        </Box>

        <Box
          backgroundColor="cardBackground"
          borderRadius="xl"
          p="xl"
          mb="xl"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Box flexDirection="row" alignItems="center" mb="l">
            <Box
              width={60}
              height={60}
              backgroundColor="background"
              justifyContent="center"
              alignItems="center"
              mr="l"
            >
              <Text style={{ fontSize: 24 }}>📊</Text>
            </Box>
            <Box flex={1}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }} mb="xs">
                Reading Statistics
              </Text>
              <Text color="text" style={{ fontSize: 14 }}>
                Track your reading progress
              </Text>
            </Box>
          </Box>
          <Text color="text" style={{ fontSize: 15, lineHeight: 22 }}>
            View your reading streaks, completed books, time spent reading, and
            other insights about your reading habits.
          </Text>
        </Box>

        <Button
          label="Sign Out"
          onPress={() => {
            setIsLoggedIn(false);
            setEmail("");
            setPassword("");
          }}
          style={{
            borderRadius: 12,
            paddingVertical: 16,
            backgroundColor: "#dc3545",
            shadowColor: "#dc3545",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3,
          }}
        />
      </ScrollView>
    </Box>
  );
}
