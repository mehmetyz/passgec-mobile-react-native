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
} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBell,
  faClose,
  faAngleRight,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import {remove} from '../api/notifications';
import {showErrorToast} from '../helpers/toast';

export const NotificationSwipeList = ({
  list,
  setList,
  refreshing,
  onRefresh,
}) => {
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
              <FontAwesomeIcon
                icon={item ? item.icon : faBell}
                size={20}
                color="#000"
              />
              <VStack h="auto" justifyContent="center" flex={1}>
                <Heading color="#000" fontSize={14} fontWeight="semibold">
                  {item.title}
                </Heading>
                <Text color="#000" opacity={0.6}>
                  {item.text}
                </Text>
              </VStack>
              <Text mr={3}>{item.time}</Text>
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
    <Box bg="#1F2440" safeArea flex={1}>
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
          <FontAwesomeIcon icon={faBell} size={100} color="#fff" />

          <Heading
            color="white"
            fontSize="20"
            fontWeight="bold"
            px="1"
            py="3"
            textAlign="center">
            No Notifications
          </Heading>
          <Button
            bg="#3B3F8C"
            onPress={() => onRefresh()}
            _pressed={{
              bg: 'primary.800',
            }}>
            <HStack space={2}>
              <FontAwesomeIcon icon={faRefresh} size={20} color="white" />
              <Text color="white">Refresh</Text>
            </HStack>
          </Button>
        </Box>
      )}
    </Box>
  );
};
