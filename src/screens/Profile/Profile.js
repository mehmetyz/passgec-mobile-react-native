import {
  faArrowRightToBracket,
  faFloppyDisk,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  Button,
  HStack,
  IconButton,
  Image,
  Text,
  View,
  VStack,
} from 'native-base';
import React, {useContext} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {ApplicationContext} from '../../common/context';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#464AA6',
    height: 100,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 30,
    backgroundColor: '#464AA6',
  },
  name: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 60,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#3B3F8C',
  },
  container: {
    flex: 1,
    // alignItems: 'center',
    width: '100%',
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export const Profile = ({user, navigator}) => {
  const [avatarPress, setAvatarPress] = React.useState(false);

  const {clearStorage} = useContext(ApplicationContext);

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      {user && (
        <Pressable
          alignItems="center"
          justifyContent="center"
          onPress={() => setAvatarPress(true)}
          onPressOut={() => setAvatarPress(false)}>
          <Image
            style={styles.avatar}
            source={{uri: user.image}}
            alt="avatar"
            opacity={avatarPress ? 0.5 : 1}
          />
          {avatarPress && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}>
              <FontAwesomeIcon
                icon={faPenToSquare}
                size={20}
                color="white"
                style={{
                  position: 'absolute',
                  top: '47%',
                  left: '49%',
                }}
              />
            </View>
          )}
        </Pressable>
      )}
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name} mb={5}>
            {user.fullname}
          </Text>

          <HStack
            style={styles.buttonContainer}
            justifyContent="center"
            alignItems="center">
            <Text color="#fff" flex="0.8" ml={2}>
              {user.fullname}
            </Text>
            <IconButton borderRadius={30}>
              <FontAwesomeIcon
                icon={faPenToSquare}
                size={20}
                color="white"
                mr={10}
              />
            </IconButton>
          </HStack>

          <HStack
            style={styles.buttonContainer}
            justifyContent="center"
            alignItems="center">
            <Text color="#fff" flex="0.8" ml={2}>
              {user.email}
            </Text>
            <IconButton borderRadius={30}>
              <FontAwesomeIcon
                icon={faPenToSquare}
                size={20}
                color="white"
                mr={10}
              />
            </IconButton>
          </HStack>

          <HStack
            style={styles.buttonContainer}
            justifyContent="center"
            alignItems="center">
            <Text color="#fff" flex="0.8" ml={2}>
              *********
            </Text>
            <IconButton borderRadius={30}>
              <FontAwesomeIcon
                icon={faPenToSquare}
                size={20}
                color="white"
                mr={10}
              />
            </IconButton>
          </HStack>

          <VStack
            style={{
              ...styles.buttonContainer,
              backgroundColor: 'transparent',
              justifyContent: 'space-between',
            }}>
            <Button
              borderRadius={30}
              style={{
                ...styles.buttonContainer,
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: '#464AA6',
              }}>
              <HStack justifyContent="space-around" w="90%">
                <FontAwesomeIcon icon={faFloppyDisk} size={20} color="white" />
                <Text color="white">Save</Text>
              </HStack>
            </Button>
            <Button
              borderRadius={30}
              style={{
                ...styles.buttonContainer,
                width: '45%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: '#C72511',
              }}
              onPress={() => {
                clearStorage();
                navigator.navigate('login');
              }}>
              <HStack justifyContent="space-between" w="90%">
                <FontAwesomeIcon
                  icon={faArrowRightToBracket}
                  size={20}
                  color="white"
                />
                <Text color="white">Logout</Text>
              </HStack>
            </Button>
          </VStack>
        </View>
      </View>
    </View>
  );
};
