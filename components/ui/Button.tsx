import { Theme } from "@/theme/theme";
import { createBox, createText, useTheme } from "@shopify/restyle";
import React from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";

const Box = createBox<Theme>();
const Text = createText<Theme>();

type ButtonProps = {
  label?: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  mt?: number | string;
  mb?: number | string;
  style?: object;
};

export const Button = ({
  label,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  children,
  mt,
  mb,
  style,
}: ButtonProps) => {
  const theme = useTheme<Theme>();

  const backgroundColor =
    variant === "primary"
      ? theme.colors.primary
      : variant === "secondary"
      ? theme.colors.cardBackground
      : "transparent";

  const textColor =
    variant === "primary"
      ? theme.colors.textLight
      : variant === "secondary"
      ? theme.colors.text
      : theme.colors.primary;

  const borderColor =
    variant === "ghost" ? theme.colors.primary : "transparent";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[{ marginTop: mt, marginBottom: mb }, style]}
      activeOpacity={0.7}
    >
      <Box
        backgroundColor="background"
        borderRadius="m"
        paddingVertical="m"
        paddingHorizontal="l"
        alignItems="center"
        justifyContent="center"
        borderWidth={variant === "ghost" ? 1 : 0}
        borderColor="border"
        opacity={disabled ? 0.5 : 1}
      >
        {loading ? (
          <ActivityIndicator color={textColor} />
        ) : children ? (
          children
        ) : (
          <Text variant="button" color="text">
            {label}
          </Text>
        )}
      </Box>
    </TouchableOpacity>
  );
};
