// import React from 'react';
// import {StyleSheet, TextInput} from 'react-native';
// import {
//   Button,
//   Input,
//   FormControl,
//   Box,
//   VStack,
//   Heading,
//   Center,
//   useToast,
// } from 'native-base';
// import {getAll} from '../../api/flight';
// import {HTTP_STATUS} from '../../common/constants';
// import {showErrorToast, showSuccessToast} from '../../helpers/toast';
// import {convertFlightEntity} from '../../helpers/flight';
// import {create} from '../../api/flight';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#1F2440',
//   },
//   primaryButton: {
//     backgroundColor: '#464AA6',
//     borderRadius: 5,
//     marginTop: 10,
//     marginBottom: 10,
//     padding: 10,
//   },
//   logo: {
//     width: '60%',
//     height: '60%',
//   },
// });

// export const AddBaggage = ({user, setPage}) => {
//   const [baggageCount, setBaggageCount] = React.useState(0);

//   const handleSubmit = async () => {
//     // const checkStatus = await checkFlight(prefix, pnr, name, surname);
//     // if (checkStatus.status === HTTP_STATUS.OK) {
//     //   const flightDetails = convertFlightEntity(checkStatus.data);
//     //   const response = await create(user.id, flightDetails);
//     //   if (response.status === HTTP_STATUS.OK) {
//     //     showSuccessToast(toast, 'Flight added successfully');
//     //     setPage('flights');
//     //   } else {
//     //     showErrorToast(toast, response.data.message);
//     //   }
//     // } else {
//     //   showErrorToast(toast, "Couldn't check flight");
//     // }
//   };
//   return (
//     <Center w="100%" style={styles.container}>
//       <Box safeArea p="2" py="8" w="100%" maxW="290">
//         <VStack
//           w="100%"
//           spacing="2"
//           justifyContent="center"
//           alignItems="center"
//           maxW="290"
//           maxH="290">
//           <Heading
//             mt="1"
//             _dark={{
//               color: 'warmGray.200',
//             }}
//             color="#fff"
//             fontWeight="medium"
//             size="xs"
//             style={{
//               textAlign: 'center',
//             }}>
//             Add Baggage Details
//           </Heading>
//         </VStack>

//         <VStack space={3} mt="5">
//           <FormControl>
//             <TextInput
//               placeholder={'Enter number here'}
//               keyboardType="numeric"
//               onChangeText={setBaggageCount}
//               value={baggageCount}
//               color="#fff"
//             />
//           </FormControl>
//           <Button mt="2" style={styles.primaryButton} onPress={handleSubmit}>
//             Add Baggage
//           </Button>
//         </VStack>
//       </Box>
//     </Center>
//   );
// };
