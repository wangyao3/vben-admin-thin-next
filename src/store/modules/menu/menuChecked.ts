import { defineStore } from 'pinia';
import { store } from '/@/store';

interface menuChecked {
  menuLeft: string;
  menuFirst: string;
  menuSecond: string;
  menuThird: string;
}
export interface Checked {
  checked: menuChecked;
}
export const usemenuCheckedStore = defineStore({
  id: 'menuchecked',
  state: (): Checked => ({
    checked: {
      menuLeft: '',
      menuFirst: '',
      menuSecond: '',
      menuThird: '',
    },
  }),
  getters: {
    getmenuChecked(): menuChecked {
      return this.checked;
    },
  },
  actions: {
    setmenuChecked(menuChecked: menuChecked) {
      this.checked = menuChecked;
    },
  },
});
// Need to be used outside the setup
export function usemenuCheckedStoreWithOut() {
  return usemenuCheckedStore(store);
}
