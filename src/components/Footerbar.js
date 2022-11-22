import React, {useEffect, useState} from 'react';
import {Box, Center, HStack, Pressable, Text} from 'native-base';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faPlane,
  faBell,
  faSuitcase,
  faIdCardClip,
} from '@fortawesome/free-solid-svg-icons';

const routes = ['notifications', 'flights', 'baggage', 'documents'];

export const FooterBar = ({setPage, page}) => {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (selected > -1) {
      setPage(routes[selected]);
    }
  }, [selected, setPage]);

  useEffect(() => {
    if (page === 'profile' || page === 'addFlight') {
      setSelected(-1);
    } else {
      setSelected(routes.indexOf(page));
    }
  }, [page]);

  return (
    <Box bg="white" safeAreaBottom width="100%" alignSelf="center" flex={0.1}>
      <Center flex={1} />
      <HStack bg="#464AA6" alignItems="center" safeAreaBottom shadow={6}>
        <Pressable
          cursor="pointer"
          opacity={selected === 0 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => setSelected(0)}
          justifyContent="center"
          alignItems="center">
          <Center>
            <FontAwesomeIcon icon={faBell} size={20} color="white" />
            <Text color="white" fontSize="12">
              Notifications
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 1 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => setSelected(1)}
          justifyContent="center"
          alignItems="center">
          <FontAwesomeIcon icon={faPlane} size={20} color="white" />
          <Text color="white" fontSize="12">
            My Flights
          </Text>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 2 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => setSelected(2)}
          justifyContent="center"
          alignItems="center">
          <Center>
            <FontAwesomeIcon icon={faSuitcase} size={20} color="white" />
            <Text color="white" fontSize="12">
              My Baggages
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 3 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => setSelected(3)}
          justifyContent="center"
          alignItems="center">
          <Center>
            <FontAwesomeIcon icon={faIdCardClip} size={20} color="white" />
            <Text color="white" fontSize="12">
              My Documents
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  );
};
