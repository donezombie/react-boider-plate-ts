import flatten from 'flat';
import message from './message.json';

const locale = {
  message: flatten(message, {
    delimiter: '_',
  }),
};
export default locale;
