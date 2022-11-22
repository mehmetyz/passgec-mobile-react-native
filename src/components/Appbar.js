import React from 'react';
import {Text, StatusBar, Box, HStack, Image, Avatar} from 'native-base';

import logo from '../../assets/header-logo.png';
import {Pressable} from 'react-native';

export const Appbar = ({user, setPage}) => {
  return (
    <>
      <StatusBar bg="#f00" barStyle="light-content" />
      <Box safeAreaTop bg="#6200ee" />
      <HStack
        bg="#464AA6"
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%">
        <HStack flexGrow="1" ml="2" h="100%" alignItems="center">
          <Image source={logo} style={{width: 40, height: 40}} alt="logo" />
          <Text
            ml="3"
            color="white"
            fontSize="18"
            fontWeight="bold"
            fontFamily="Mouse Memoirs">
            PassGeç
          </Text>
        </HStack>
        <HStack mr="1">
          {user && (
            <HStack justifyContent="center" space={2}>
              <Pressable
                onPress={() => {
                  setPage('profile');
                }}>
                <Avatar
                  bg="#3B3F8C"
                  source={{
                    uri: user.image,
                  }}
                  style={{
                    width: 40,
                    height: 40,
                  }}
                />
              </Pressable>
            </HStack>
          )}
        </HStack>
      </HStack>
    </>
  );
};
