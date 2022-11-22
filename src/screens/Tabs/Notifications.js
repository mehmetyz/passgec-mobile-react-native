import {Box, Heading} from 'native-base';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {getAll} from '../../api/notifications';
import {HTTP_STATUS} from '../../common/constants';
import {
  createDate,
  createNotificationIcon,
} from '../../helpers/notification-tool';
import {NotificationSwipeList} from '../../components/NotificationSwipeList';
import {showErrorToast} from '../../helpers/toast';

export const Notifications = ({user, toast}) => {
  const [notifications, setNotifications] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = async () => {
    setIsRefreshing(true);
    const response = await getAll(user.id);

    if (response.status === HTTP_STATUS.OK) {
      let notificationData = response.data.notifications;

      notificationData = notificationData
        .sort((a, b) => {
          return b.time - a.time;
        })
        .map(notification => {
          notification.key = notificationData.indexOf(notification);
          notification.icon = createNotificationIcon(notification);
          notification.time = createDate(notification.time);
          return notification;
        });

      setNotifications(notificationData);
    } else {
      showErrorToast(toast, response.data.message);
    }
    setIsRefreshing(false);
  };

  useLayoutEffect(() => {
    if (user != null) {
      onRefresh();
    }
  }, [user]);

  return (
    <Box
      bg="white"
      safeAreaBottom
      width="100%"
      alignSelf="center"
      height="100%"
      safeAreaTop>
      <Heading
        bg="#1F2440"
        color="white"
        fontSize="20"
        fontWeight="bold"
        px="1"
        py="3"
        textAlign="center">
        Notifications
      </Heading>
      <NotificationSwipeList
        list={notifications}
        setList={setNotifications}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
      />
    </Box>
  );
};
