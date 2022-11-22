import {Box, Button, Heading, HStack, Text} from 'native-base';
import React, {useLayoutEffect, useState} from 'react';
import {getAll} from '../../api/baggage';
import {HTTP_STATUS} from '../../common/constants';

import {showErrorToast} from '../../helpers/toast';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAdd} from '@fortawesome/free-solid-svg-icons';
import {BaggageSwipeList} from '../../components/BaggageList';

export const Baggage = ({user, toast, setPage}) => {
  const [baggages, setBaggages] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = async () => {
    setIsRefreshing(true);
    const response = await getAll(user.id);

    if (response.status === HTTP_STATUS.OK) {
      setBaggages(response.data.baggages);
    } else {
      showErrorToast(toast, response.data.message);
    }
    setIsRefreshing(false);
  };

  useLayoutEffect(() => {
    if (user != null) {
      // onRefresh();
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
        My Baggages
      </Heading>
      <BaggageSwipeList
        list={baggages}
        setList={setBaggages}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
      />
      {/* <Button
        bg="#3B3F8C"
        _pressed={{
          bg: 'primary.800',
        }}
        onPress={() => setPage('addBaggage')}
        bottom="5%"
        w="40%">
        <HStack space={2}>
          <FontAwesomeIcon icon={faAdd} size={20} color="white" />
          <Text color="white">Add Baggage</Text>
        </HStack>
      </Button> */}
    </Box>
  );
};
