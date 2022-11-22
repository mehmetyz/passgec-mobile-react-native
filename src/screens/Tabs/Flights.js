import {Box, Button, Heading, HStack, Text} from 'native-base';
import React, {useLayoutEffect, useState} from 'react';
import {getAll} from '../../api/flight';
import {HTTP_STATUS} from '../../common/constants';

import {showErrorToast} from '../../helpers/toast';
import {FlightSwipeList} from '../../components/FlightSwipeList';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAdd} from '@fortawesome/free-solid-svg-icons';

export const Flights = ({user, toast, setPage}) => {
  const [flights, setFlights] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = async () => {
    setIsRefreshing(true);
    const response = await getAll(user.id);

    if (response.status === HTTP_STATUS.OK) {
      setFlights(response.data.flights);
    }
    setIsRefreshing(false);
  };

  useLayoutEffect(() => {
    if (user != null) {
      onRefresh();
    }
  }, [user]);

  return (
    <Box
      bg="#1F2440"
      safeAreaBottom
      width="100%"
      alignSelf="center"
      height="100%"
      safeAreaTop
      justifyContent="center"
      alignItems="center">
      <Heading
        bg="#1F2440"
        color="white"
        fontSize="20"
        fontWeight="bold"
        px="1"
        py="3"
        textAlign="center"
        width="100%">
        My Flights
      </Heading>
      <FlightSwipeList
        list={flights}
        setList={setFlights}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
      />
      <Button
        bg="#3B3F8C"
        _pressed={{
          bg: 'primary.800',
        }}
        onPress={() => setPage('addFlight')}
        bottom="5%"
        w="40%">
        <HStack space={2}>
          <FontAwesomeIcon icon={faAdd} size={20} color="white" />
          <Text color="white">Add Flight</Text>
        </HStack>
      </Button>
    </Box>
  );
};
