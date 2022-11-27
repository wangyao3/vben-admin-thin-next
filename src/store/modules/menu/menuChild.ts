import { defineStore } from 'pinia';
import { store } from '/@/store';
import type { Menu } from '/@/router/types';

interface menuChild {
  childrenList: Menu[];
}
export const useMenuChildStore = defineStore({
  id: 'menuchild',
  state: (): menuChild => ({
    childrenList: [],
  }),
  getters: {
    getMenuChild(): Menu[] {
      return this.childrenList;
    },
  },
  actions: {
    setMenuChild(menuChild: Menu[]) {
      this.childrenList = menuChild;
    },
  },
});
// Need to be used outside the setup
export function useMenuChildStoreWithOut() {
  return useMenuChildStore(store);
}
