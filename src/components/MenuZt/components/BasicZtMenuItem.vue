<template>
  <div class="childlistmenu">
    <ScrollContainer>
      <div class="childlistmenu-item" v-for="(item, index) in menuModule" :key="item.path">
        <div class="childlistmenu-item-first" :class="{ acitve: index === 0 }">
          <ZtMenuButton :item="item" @drawerClose2="closeMenu" :level="'a'" />
        </div>
        <div v-for="child in item.children" :key="child.path" class="childlistmenu-item-second">
          <ZtMenuButton :item="child" @drawerClose2="closeMenu" :level="'b'" />
          <div
            v-for="childChild in child.children"
            :key="childChild.path"
            class="childlistmenu-item-third"
          >
            <ZtMenuButton :item="childChild" @drawerClose2="closeMenu" :level="'c'" />
          </div>
        </div>
      </div>
    </ScrollContainer>
  </div>
</template>

<script lang="ts" setup>
  import { ScrollContainer } from '/@/components/Container';
  import type { Menu } from '/@/router/types';
  import ZtMenuButton from './ZtMenuButton.vue';
  import { onMounted, ref, watch } from 'vue';
  import { useMenuChildStore } from '/@/store/modules/menu/menuChild';

  import { getChildrenMenus } from '/@/router/menus';
  let menuModule = ref<Menu[]>([]);
  const menuChildStore = useMenuChildStore();

  const initPath = ref('/dashboard');
  const emits = defineEmits<{ (e: 'drawerClose1'): void }>();

  function closeMenu() {
    emits('drawerClose1');
  }
  onMounted(async () => {
    menuModule.value = menuChildStore.getMenuChild || (await getChildrenMenus(initPath.value));
  });

  // Menu changes
  watch(
    [() => menuChildStore.getMenuChild],
    async () => {
      menuModule.value = menuChildStore.getMenuChild;
    },
    {
      immediate: true,
    },
  );
</script>

<style scoped lang="less">
  .childlistmenu {
    height: 40rem;
    overflow-y: scroll;
    &-item {
      &-second {
        float: left;
      }
      &-third {
        text-align: center;
      }
    }
    &-item::after {
      display: block;
      content: '';
      height: 0;
      clear: both;
    }
  }
  .acitve {
    color: #0960bd;
  }
</style>
