// import React from 'react';

// import {Dimensions, RefreshControl} from 'react-native';

// import {
//   Box,
//   Text,
//   Pressable,
//   HStack,
//   VStack,
//   Heading,
//   Avatar,
//   Badge,
//   FlatList,
//   IconButton,
// } from 'native-base';
// import {SwipeListView} from 'react-native-swipe-list-view';
// import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import {
//   faBell,
//   faClose,
//   faAngleRight,
//   faPlaneDeparture,
//   faRefresh,
//   faSadTear,
//   faSuitcase,
//   faQrcode,
// } from '@fortawesome/free-solid-svg-icons';
// import {remove} from '../api/flight';
// import {ANADOLUJET_LOGO, THY_LOGO} from '../common/constants';

// export const BaggageSwipeList = ({list, setList, refreshing, onRefresh}) => {
//   const closeRow = (rowMap, rowKey) => {
//     if (rowMap[rowKey]) {
//       rowMap[rowKey].closeRow();
//     }
//   };

//   const deleteRow = (rowMap, rowKey, id) => {
//     closeRow(rowMap, rowKey);
//     const newData = [...list];
//     const prevIndex = list.findIndex(item => item.key === rowKey);
//     newData.splice(prevIndex, 1);

//     remove(id)
//       .then(() => {
//         setList(newData);
//       })
//       .catch(() => {});
//   };

//   const renderItem = ({item, index}) => {
//     return (
//       <Box marginLeft={2} mr={2} mb={3}>
//         <Pressable
//           alignItems="center"
//           bg="#fff"
//           justifyContent="center"
//           borderRadius="8"
//           height="auto"
//           minH="60">
//           <HStack width="100%" px={2} py={2}>
//             <HStack space={6} alignItems="center" ml={1}>
//               <FontAwesomeIcon icon={faSuitcase} size={50} color="#000" />
//               <VStack space={2} h="auto">
//                 <HStack
//                   space={2}
//                   mt={2}
//                   justifyContent="center"
//                   alignItems="center"
//                   flexDirection="row"
//                   width="100%"
//                   flex="1">
//                   <VStack h="auto" justifyContent="center" flex={1}>
//                     <Heading color="#000" fontSize={14} fontWeight="semibold">
//                       {'Baggage '} <Text color="#000">#{index + 1}</Text>
//                     </Heading>
//                   </VStack>
//                   <IconButton bg="whitesmoke" borderRadius="50">
//                     <FontAwesomeIcon icon={faQrcode} size={20} color="#000" />
//                   </IconButton>
//                 </HStack>
//                 <HStack space={2} width={Dimensions.get('window').width - 130}>
//                   <Badge colorScheme="success">{`${item.baggages.length}  ${
//                     item.baggages.length > 1 ? 'bags' : 'bag'
//                   }`}</Badge>
//                   <Badge colorScheme="success">{item.PNR}</Badge>
//                   <Badge colorScheme="warning">
//                     {item.baggages.reduce((acc, cur) => acc + cur.weight, 0) +
//                       ' kg'}
//                   </Badge>
//                   <Badge colorScheme={item.isChecked ? 'info' : 'danger'}>
//                     {item.status}
//                   </Badge>
//                 </HStack>
//               </VStack>
//             </HStack>
//           </HStack>
//         </Pressable>
//       </Box>
//     );
//   };

//   const renderHiddenItem = (data, rowMap) => (
//     <HStack
//       w="100%"
//       justifyContent="center"
//       flexDirection="row"
//       alignItems="center"
//       h="100%"
//       minH="60">
//       <Pressable
//         px={4}
//         ml="auto"
//         mb={3}
//         cursor="pointer"
//         borderRadius="8"
//         bg="#3B3F8C"
//         justifyContent="center"
//         onPress={() => closeRow(rowMap, data.item.key)}
//         _pressed={{
//           opacity: 0.5,
//         }}
//         h="60">
//         <FontAwesomeIcon icon={faAngleRight} size={20} color="white" />
//       </Pressable>
//       <Pressable
//         px={4}
//         ml="2"
//         mr={2}
//         mb={3}
//         cursor="pointer"
//         borderRadius="8"
//         bg="#A80F0F"
//         justifyContent="center"
//         onPress={() => deleteRow(rowMap, data.item.key, data.item.id)}
//         _pressed={{
//           opacity: 0.5,
//         }}
//         h="60">
//         <FontAwesomeIcon icon={faClose} size={20} color="white" />
//       </Pressable>
//     </HStack>
//   );

//   return (
//     <Box bg="#1F2440" safeArea flex={1} width="100%">
//       {list && list.length > 0 ? (
//         <FlatList
//           data={list}
//           renderItem={renderItem}
//           rightOpenValue={-130}
//           previewRowKey={'0'}
//           previewOpenValue={-40}
//           previewOpenDelay={3000}
//           onRowDidOpen={() => {}}
//           flex={1}
//           height={Dimensions.get('window').height}
//           ml={1}
//           mr={1}
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//           }
//         />
//       ) : (
//         <Box
//           bg="#1F2440"
//           alignItems="center"
//           justifyContent="center"
//           height="100%"
//           width="100%">
//           <FontAwesomeIcon icon={faSuitcase} size={100} color="#fff" />

//           <Heading
//             color="white"
//             fontSize="20"
//             fontWeight="bold"
//             px="1"
//             py="3"
//             textAlign="center">
//             No Baggage Found
//           </Heading>
//         </Box>
//       )}
//     </Box>
//   );
// };
