import { tokenBaseURL } from './constants';

export const getTokenIconURL = (symbol?: string) => {
  return `${tokenBaseURL}${symbol}.png`;
};
