// import { Box } from "@/components/ui/Box";
// import { Text } from "@/components/ui/Text";
// import { Theme } from "@/theme/theme";
// import { useTheme } from "@shopify/restyle";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useLocalSearchParams } from "expo-router";
// import { ActivityIndicator, Image, ScrollView } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const fetchBookDetails = async (id: string) => {
//   const res = await axios.get(`https://gutendex.com/books/${id}`);
//   return res.data;
// };

// export default function BookDetails() {
//   const theme = useTheme<Theme>();
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["book", id],
//     queryFn: () => fetchBookDetails(id),
//     enabled: !!id,
//   });

//   if (isLoading)
//     return (
//       <SafeAreaView style={{ flex: 1 }}>
//         <Box
//           flex={1}
//           justifyContent="center"
//           alignItems="center"
//           backgroundColor="background"
//         >
//           <ActivityIndicator size="large" color={theme.colors.primary} />
//         </Box>
//       </SafeAreaView>
//     );

//   if (error || !data)
//     return (
//       <SafeAreaView style={{ flex: 1 }}>
//         <Box
//           flex={1}
//           justifyContent="center"
//           alignItems="center"
//           backgroundColor="background"
//           padding="m"
//         >
//           <Text variant="header" color="error">
//             Error loading book.
//           </Text>
//         </Box>
//       </SafeAreaView>
//     );

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <ScrollView
//         style={{ flex: 1 }}
//         contentContainerStyle={{ padding: 16 }}
//         backgroundColor="background"
//       >
//         <Box
//           backgroundColor="cardBackground"
//           borderRadius="m"
//           padding="m"
//           shadowColor="shadow"
//           shadowOffset={{ width: 0, height: 2 }}
//           shadowOpacity={0.1}
//           shadowRadius={8}
//           elevation={3}
//         >
//           <Text variant="header" marginBottom="m" textAlign="center">
//             {data.title}
//           </Text>

//           <Box alignItems="center" marginBottom="l">
//             <Image
//               source={{
//                 uri:
//                   data.formats?.["image/jpeg"] ||
//                   "https://via.placeholder.com/150",
//               }}
//               style={{
//                 width: 180,
//                 height: 240,
//                 borderRadius: 12,
//                 marginBottom: 16,
//                 borderWidth: 1,
//                 borderColor: theme.colors.border,
//               }}
//             />
//           </Box>

//           <Box
//             backgroundColor="background"
//             borderRadius="m"
//             padding="m"
//             marginBottom="m"
//           >
//             <Text variant="subheader" marginBottom="s" color="primary">
//               Author(s)
//             </Text>
//             <Text variant="body">
//               {data.authors && data.authors.length > 0
//                 ? data.authors.map((a: any) => a.name).join(", ")
//                 : "Unknown author"}
//             </Text>
//           </Box>

//           <Box
//             backgroundColor="background"
//             borderRadius="m"
//             padding="m"
//             marginBottom="m"
//           >
//             <Text variant="subheader" marginBottom="s" color="primary">
//               Subjects
//             </Text>
//             <Text variant="body">
//               {data.subjects && data.subjects.length > 0
//                 ? data.subjects.join(", ")
//                 : "No subjects available"}
//             </Text>
//           </Box>

//           <Box backgroundColor="background" borderRadius="m" padding="m">
//             <Text variant="subheader" marginBottom="s" color="primary">
//               Book ID
//             </Text>
//             <Text variant="body">{data.id}</Text>
//           </Box>
//         </Box>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }
