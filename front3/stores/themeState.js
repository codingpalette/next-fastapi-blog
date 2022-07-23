import { atom } from 'recoil';

const themeState = atom({
  key: 'themeState',
  default: 'light',
});

export { themeState };