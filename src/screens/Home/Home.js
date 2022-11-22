import React, {useEffect, useRef, useState} from 'react';

import {useNavigation, useRoute} from '@react-navigation/native';
import {Appbar} from '../../components/Appbar';
import {FooterBar} from '../../components/Footerbar';
import {details} from '../../api/account';
import {HTTP_STATUS} from '../../common/constants';
import {showErrorToast} from '../../helpers/toast';
import {Box, Center, Text, useToast, VStack} from 'native-base';
import {Notifications} from '../Tabs/Notifications';
import {Flights} from '../Tabs/Flights';
import {Baggage} from '../Tabs/Baggage';
import {Documents} from '../Tabs/Documents';
import {Profile} from '../Profile/Profile';
import {AddFlight} from '../Flight/AddFlight';
import {AddBaggage} from '../Baggage/AddBaggage';

const renderScreen = (screen, props = {}) => {
  switch (screen) {
    case 'notifications':
      return <Notifications {...props} />;
    case 'flights':
      return <Flights {...props} />;
    case 'addFlight':
      return <AddFlight {...props} />;
    // case 'addBaggage':
    //   return <AddBaggage {...props} />;
    case 'baggage':
      return <Baggage {...props} />;
    case 'documents':
      return <Documents {...props} />;
    case 'profile':
      return <Profile {...props} />;
    default:
      return <Notifications {...props} />;
  }
};

export const HomePage = () => {
  const [page, setPage] = useState('notifications');

  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const navigator = useNavigation();
  const toast = useToast();

  useEffect(() => {
    const getUser = async () => {
      const response = await details();
      if (response.status === HTTP_STATUS.OK) {
        const userData = response.data.user;
        setUser(userData);
      } else {
        showErrorToast(toast, response.data.message);
      }
    };
    getUser();
  }, []);

  return (
    <>
      <Appbar setPage={setPage} user={user} />

      <VStack flexDirection="column" style={{flex: 1}}>
        <Box
          w={'100%'}
          bg="#1F2440"
          justifyContent={'center'}
          alignItems={'center'}
          flex={1}>
          {renderScreen(page, {user, toast, page, setPage, navigator})}
        </Box>

        <FooterBar setPage={setPage} page={page} />
      </VStack>
    </>
  );
};
