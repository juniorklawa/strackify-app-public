import moment from 'moment';
import { translate } from '../locales';

export const getGreeting = () => {
  const timeFormat = 'HH:mm:ss';
  const time = moment();

  if (
    time.isBetween(
      moment('00:00:00', timeFormat),
      moment('04:59:59', timeFormat),
    ) ||
    time.isSame(moment('00:00:00', timeFormat)) ||
    time.isSame(moment('04:59:59', timeFormat))
  ) {
    return translate('meeting.good_evening');
  } else if (
    time.isBetween(
      moment('05:00:00', timeFormat),
      moment('11:59:59', timeFormat),
    ) ||
    time.isSame(moment('05:00:00', timeFormat)) ||
    time.isSame(moment('11:59:59', timeFormat))
  ) {
    return translate('meeting.good_morning');
  } else if (
    time.isBetween(
      moment('12:00:00', timeFormat),
      moment('16:59:59', timeFormat),
    ) ||
    time.isSame(moment('12:00:00', timeFormat)) ||
    time.isSame(moment('16:59:59', timeFormat))
  ) {
    return translate('meeting.good_afternoon');
  } else if (
    time.isBetween(
      moment('17:00:00', timeFormat),
      moment('23:59:59', timeFormat),
    ) ||
    time.isSame(moment('17:00:00', timeFormat)) ||
    time.isSame(moment('23:59:59', timeFormat))
  ) {
    return translate('meeting.good_evening');
  }
};

export default getGreeting;
