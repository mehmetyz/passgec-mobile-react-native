import React from 'react';

import {Dimensions, RefreshControl} from 'react-native';

import {
  Box,
  Text,
  Pressable,
  HStack,
  VStack,
  Heading,
  Button,
  Image,
  Avatar,
  Badge,
} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBell,
  faClose,
  faAngleRight,
  faPlaneDeparture,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import {remove} from '../api/flight';
import {showErrorToast} from '../helpers/toast';
import {ANADOLUJET_LOGO, THY_LOGO} from '../common/constants';

export const FlightSwipeList = ({list, setList, refreshing, onRefresh}) => {
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey, id) => {
    closeRow(rowMap, rowKey);
    const newData = [...list];
    const prevIndex = list.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);

    remove(id)
      .then(() => {
        setList(newData);
      })
      .catch(() => {});
  };

  const renderItem = ({item, index}) => {
    return (
      <Box marginLeft={2} mr={2} mb={3}>
        <Pressable
          alignItems="center"
          bg="#fff"
          justifyContent="center"
          borderRadius="8"
          height="auto"
          minH="60"
          _pressed={{
            bg: 'trueGray.200',
          }}>
          <HStack width="100%" px={2} py={2}>
            <HStack space={5} alignItems="center" ml={1} w="100%">
              <Avatar
                source={{
                  uri: item.IsAnadoluJetFlight ? ANADOLUJET_LOGO : THY_LOGO,
                }}
                style={{
                  width: 50,
                  height: 50,
                }}
              />

              <VStack space={2} width="auto">
                <HStack
                  space={2}
                  mt={2}
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="row"
                  width="100%"
                  flex="1">
                  <VStack h="auto" justifyContent="center" flex={1}>
                    <Heading color="#000" fontSize={14} fontWeight="semibold">
                      {`${item.DepartureLocation} - ${item.ArrivalLocation}`}
                    </Heading>
                    <Text color="#000" opacity={0.6}>
                      {`${item.PasserNamePrefix} ${item.PassengerName} ${item.PassengerSurname}`}
                    </Text>
                  </VStack>
                  <VStack
                    alignItems="center"
                    justifyContent="center"
                    space={2}
                    // mr={2}
                    right={0}>
                    <Text color="#000" opacity={0.6} fontSize={11}>
                      <Badge colorScheme="info">{`D: ${item.DepartureDate} ${item.DepartureTime}`}</Badge>
                    </Text>
                    <Text color="#000" opacity={0.6} fontSize={11}>
                      <Badge colorScheme="info">{`A: ${item.ArrivalDate} ${item.ArrivalTime}`}</Badge>
                    </Text>
                  </VStack>
                </HStack>
                <HStack space={2}>
                  <Badge colorScheme="success">{item.PNR}</Badge>
                  <Badge colorScheme="success">
                    {item.IsReturningFlight ? 'Return' : 'One Way'}
                  </Badge>
                  <Badge colorScheme="warning">
                    {`${item.BaggageAllowance} kg`}
                  </Badge>
                  <Badge colorScheme={item.BoardingInfo ? 'success' : 'danger'}>
                    {item.BoardingInfo ? 'Boarding' : 'No Boarding'}
                  </Badge>
                </HStack>
              </VStack>
            </HStack>
          </HStack>
        </Pressable>
      </Box>
    );
  };

  const renderHiddenItem = (data, rowMap) => (
    <HStack
      w="100%"
      justifyContent="center"
      flexDirection="row"
      alignItems="center"
      h="100%"
      minH="60">
      <Pressable
        px={4}
        ml="auto"
        mb={3}
        cursor="pointer"
        borderRadius="8"
        bg="#3B3F8C"
        justifyContent="center"
        onPress={() => closeRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}
        h="60">
        <FontAwesomeIcon icon={faAngleRight} size={20} color="white" />
      </Pressable>
      <Pressable
        px={4}
        ml="2"
        mr={2}
        mb={3}
        cursor="pointer"
        borderRadius="8"
        bg="#A80F0F"
        justifyContent="center"
        onPress={() => deleteRow(rowMap, data.item.key, data.item.id)}
        _pressed={{
          opacity: 0.5,
        }}
        h="60">
        <FontAwesomeIcon icon={faClose} size={20} color="white" />
      </Pressable>
    </HStack>
  );

  return (
    <Box bg="#1F2440" safeArea flex={1} width="100%">
      {list && list.length > 0 ? (
        <SwipeListView
          data={list}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-130}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onRowDidOpen={() => {}}
          flex={1}
          height={Dimensions.get('window').height}
          marginTop={10}
          ml={2}
          mr={2}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <Box
          bg="#1F2440"
          alignItems="center"
          justifyContent="center"
          height="100%"
          width="100%">
          <FontAwesomeIcon icon={faPlaneDeparture} size={100} color="#fff" />

          <Heading
            color="white"
            fontSize="20"
            fontWeight="bold"
            px="1"
            py="3"
            textAlign="center">
            No Flights
          </Heading>
        </Box>
      )}
    </Box>
  );
};
