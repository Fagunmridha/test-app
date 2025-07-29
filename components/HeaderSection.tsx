import { TouchableOpacity, ViewStyle } from "react-native";
import { Box } from "./ui/Box";
import { Text } from "./ui/Text";

interface Props {
  title: string;
  onPress?: () => void;
  containerStyle?: ViewStyle;
}

export const HeaderSection = ({ title, onPress, containerStyle }: Props) => {
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      style={containerStyle}
      mb="s"
    >
      <Text variant="subheader" color="text">
        {title}
      </Text>
      {onPress && (
        <TouchableOpacity onPress={onPress}>
          <Text color="primary" fontWeight="600">View All</Text>
        </TouchableOpacity>
      )}
    </Box>
  );
};
