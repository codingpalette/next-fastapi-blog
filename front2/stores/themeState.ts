import { atom } from 'recoil'

export const themeState = atom<'light' | 'dark'>({
  key: 'theme-State',
  default: 'light', // default value (aka initial value)
});