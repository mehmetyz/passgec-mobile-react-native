import React, {useContext, useLayoutEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  useToast,
  Image,
} from 'native-base';

import {login} from '../../api/auth';
import {HTTP_STATUS} from '../../common/constants';
import {ApplicationContext} from '../../common/context';
import {showErrorToast, showSuccessToast} from '../../helpers/toast';

import logo from '../../../assets/logo.png';

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    color: '#fff',
  },
  primaryButton: {
    backgroundColor: '#464AA6',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
  logo: {
    width: '60%',
    height: '60%',
  },
});

export const LoginPage = ({navigation}) => {
  const [email, setEmail] = React.useState('abc1234@gmail.com');
  const [password, setPassword] = React.useState('pass2022');

  const {getData, saveToStorage} = useContext(ApplicationContext);

  const toast = useToast();

  useLayoutEffect(() => {
    getData('passenger_app').then(data => {
      data = JSON.parse(data);
      if (data && data.token) {
        navigation.navigate('home');
      }
    });
  }, [getData, navigation]);

  const handleLogin = async () => {
    const response = await login(email, password);
    if (response.status === HTTP_STATUS.OK) {
      showSuccessToast(toast, 'Successfully logged in');
      saveToStorage('passenger_app', {token: response.data.token});
      navigation.navigate('home');
    } else {
      showErrorToast(toast, response.data.message);
      setPassword('');
    }
  };
  return (
    <Center w="100%" style={loginStyles.container}>
      <Box safeArea p="2" py="8" w="100%" maxW="290">
        <VStack
          w="100%"
          spacing="2"
          justifyContent="center"
          alignItems="center"
          maxW="290"
          maxH="290">
          <Image source={logo} style={loginStyles.logo} alt="logo" />

          <Heading
            mt="1"
            _dark={{
              color: 'warmGray.200',
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
            style={{
              textAlign: 'center',
            }}>
            Sign in to continue!
          </Heading>
        </VStack>

        <VStack space={3} mt="5">
          <FormControl>
            <Input value={email} onChangeText={setEmail} placeholder="Email" />
          </FormControl>
          <FormControl>
            <Input
              type="password"
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
            />
            <Link
              _text={{
                fontSize: 'xs',
                fontWeight: '500',
                color: 'indigo.500',
              }}
              alignSelf="flex-end"
              mt="1">
              Forget Password?
            </Link>
          </FormControl>
          <Button
            mt="2"
            style={loginStyles.primaryButton}
            onPress={handleLogin}>
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}>
              I'm a new user.{' '}
            </Text>
            <Link
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              onPress={() => navigation.navigate('register')}>
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};
