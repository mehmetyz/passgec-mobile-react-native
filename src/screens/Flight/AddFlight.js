import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Button,
  Input,
  FormControl,
  Box,
  VStack,
  Heading,
  Center,
  useToast,
} from 'native-base';
import {checkFlight} from '../../api/check-flights';
import {HTTP_STATUS} from '../../common/constants';
import {showErrorToast, showSuccessToast} from '../../helpers/toast';
import {convertFlightEntity} from '../../helpers/flight';
import {create} from '../../api/flight';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F2440',
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

export const AddFlight = ({user, setPage}) => {
  const [prefix, setPrefix] = React.useState('MR');
  const [pnr, setPnr] = React.useState('AHK34D');
  const [name, setName] = React.useState('AHMET');
  const [surname, setSurname] = React.useState('YILMAZ');

  const toast = useToast();

  const handleSubmit = async () => {
    const checkStatus = await checkFlight(prefix, pnr, name, surname);
    if (checkStatus.status === HTTP_STATUS.OK) {
      const flightDetails = convertFlightEntity(checkStatus.data);
      const response = await create(user.id, flightDetails);

      if (response.status === HTTP_STATUS.OK) {
        showSuccessToast(toast, 'Flight added successfully');
        setPage('flights');
      } else {
        showErrorToast(toast, response.data.message);
      }
    } else {
      showErrorToast(toast, "Couldn't check flight");
    }
  };
  return (
    <Center w="100%" style={styles.container}>
      <Box safeArea p="2" py="8" w="100%" maxW="290">
        <VStack
          w="100%"
          spacing="2"
          justifyContent="center"
          alignItems="center"
          maxW="290"
          maxH="290">
          <Heading
            mt="1"
            _dark={{
              color: 'warmGray.200',
            }}
            color="#fff"
            fontWeight="medium"
            size="xs"
            style={{
              textAlign: 'center',
            }}>
            Add Flight Details
          </Heading>
        </VStack>

        <VStack space={3} mt="5">
          <FormControl>
            <Input
              placeholder="Name Prefix (e.g. MR, MRS)"
              color="#fff"
              onChangeText={setPrefix}
              value={prefix}
            />
          </FormControl>
          <FormControl>
            <Input
              placeholder="PNR Code"
              color="#fff"
              onChangeText={setPnr}
              value={pnr}
            />
          </FormControl>
          <FormControl>
            <Input
              color="#fff"
              placeholder="Name"
              onChangeText={setName}
              value={name}
            />
          </FormControl>
          <FormControl>
            <Input
              color="#fff"
              placeholder="Surname"
              onChangeText={setSurname}
              value={surname}
            />
          </FormControl>
          <Button mt="2" style={styles.primaryButton} onPress={handleSubmit}>
            Add Flight
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};
