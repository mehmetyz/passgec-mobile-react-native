import {
  faPlane,
  faSuitcase,
  faIdCardClip,
  faBell,
  faClose,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

export const createNotificationIcon = notification => {
  switch (notification.type) {
    case 'flight':
      return faPlane;
    case 'baggage':
      return faSuitcase;
    case 'document':
      return faIdCardClip;
    default:
      return faBell;
  }
};

export const createDate = time => {
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
