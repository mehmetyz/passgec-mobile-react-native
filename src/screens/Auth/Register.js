import React from 'react';
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
import {register} from '../../api/auth';
import {HTTP_STATUS} from '../../common/constants';
import {showErrorToast, showSuccessToast} from '../../helpers/toast';

import logo from '../../../assets/logo.png';

const registerStyles = StyleSheet.create({
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

export const RegisterPage = ({navigation}) => {
  const [fullname, setFullname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const toast = useToast();
  const handleSignup = async () => {
    const result = await register(fullname, email, password);
    if (result.status === HTTP_STATUS.OK) {
      showSuccessToast(toast, 'Successfully registered');
      navigation.navigate('login');
    } else {
      showErrorToast(toast, result.data.message);
      setPassword('');
    }
  };

  return (
    <Center w="100%" style={registerStyles.container}>
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <VStack
          w="100%"
          spacing="2"
          justifyContent="center"
          alignItems="center"
          maxW="290"
          maxH="290">
          <Image source={logo} style={registerStyles.logo} alt="logo" />

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
            Sign up to continue!
          </Heading>
        </VStack>

        <VStack space={3} mt="5">
          <FormControl>
            <Input
              value={fullname}
              onChangeText={setFullname}
              placeholder="Full Name"
            />
          </FormControl>
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
          </FormControl>
          <Button
            mt="2"
            style={registerStyles.primaryButton}
            onPress={handleSignup}>
            Sign Up
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}>
              You have an account?{' '}
            </Text>
            <Link
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              onPress={() => navigation.navigate('login')}>
              Sign In
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};
