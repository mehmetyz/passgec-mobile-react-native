import {
  Box,
  CheckIcon,
  CloseIcon,
  HStack,
  InfoIcon,
  Text,
  WarningIcon,
} from 'native-base';
import React from 'react';

const whiteTextStyle = {
  color: '#fff',
};
const typeToColor = type => {
  switch (type) {
    case 'success':
      return 'green.500';
    case 'warning':
      return 'yellow.500';
    case 'error':
      return 'red.500';
    default:
      return 'blue.500';
  }
};
const typeToIcon = type => {
  switch (type) {
    case 'success':
      return <CheckIcon style={whiteTextStyle} mr="1" />;
    case 'warning':
      return <WarningIcon style={whiteTextStyle} mr="1" />;
    case 'error':
      return <CloseIcon style={whiteTextStyle} mr="1" />;
    default:
      return <InfoIcon style={whiteTextStyle} mr="1" />;
  }
};

const showToast = (toast, message, type = 'danger') => {
  toast.show({
    text: message,
    type: type,
    placement: 'bottom',
    duration: 3000,
    render: () => {
      return (
        <React.Fragment>
          <Box bg={typeToColor(type)} px="2" py="1" rounded="sm" mb={5}>
            <HStack style={{alignItems: 'center'}}>
              {typeToIcon(type)}
              <Text style={{color: '#fff'}} mr="2">
                {message}
              </Text>
            </HStack>
          </Box>
        </React.Fragment>
      );
    },
  });
};

const showSuccessToast = (toast, message) => {
  showToast(toast, message, 'success');
};

const showWarningToast = (toast, message) => {
  showToast(toast, message, 'warning');
};

const showErrorToast = (toast, message) => {
  showToast(toast, message, 'error');
};

const showInfoToast = (toast, message) => {
  showToast(toast, message, 'info');
};

export {showSuccessToast, showWarningToast, showErrorToast, showInfoToast};
