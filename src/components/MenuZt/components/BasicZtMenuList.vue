<template>
  <div class="listmenu">
    <ScrollContainer>
      <ul :class="[`${prefixCls}-module`]">
        <li
          class="listmenu-li"
          v-bind="getItemEvents(item)"
          v-for="item in menuModules"
          :key="item.path"
          :class="isChecked == item.path ? 'listmenu-li-check' : 'listmenu-li'"
        >
          <div class="listmenu-li-div">
            <Icon
              class="listmenu-li-div-icon"
              :size="16"
              :icon="item.icon || (item.meta && item.meta.icon)"
            />
            <p class="listmenu-li-div-p">
              {{ t(item.name) }}
            </p>
          </div>
        </li>
      </ul>
    </ScrollContainer>
  </div>
</template>

<script lang="ts" setup>
  import { ScrollContainer } from '/@/components/Container';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { Icon } from '/@/components/Icon';
  import type { Menu } from '/@/router/types';
  import { onMounted, ref, watch } from 'vue';
  import { usePermissionStore } from '/@/store/modules/permission';
  import { useMenuChildStore } from '/@/store/modules/menu/menuChild';
  import { usemenuCheckedStore } from '/@/store/modules/menu/menuChecked';
  import { getChildrenMenus, getShallowMenus } from '/@/router/menus';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useGo } from '/@/hooks/web/usePage';
  const isChecked = ref('');
  const { t } = useI18n();
  const { prefixCls } = useDesign('layout-mix-sider');
  let menuModules = ref<Menu[]>([]);

  const permissionStore = usePermissionStore();
  const menuChildStore = useMenuChildStore();
  const menuCheckedStore = usemenuCheckedStore();

  const go = useGo();
  const emits = defineEmits<{ (e: 'drawerClose0'): void }>();
  function drawerClose0() {
    emits('drawerClose0');
  }
  onMounted(async () => {
    menuModules.value = await getShallowMenus();
  });

  // Menu changes
  watch(
    [
      () => permissionStore.getLastBuildMenuTime,
      () => permissionStore.getBackMenuList,
      () => menuCheckedStore.getmenuChecked,
    ],
    async () => {
      menuModules.value = await getShallowMenus();
      isChecked.value = menuCheckedStore.getmenuChecked.menuLeft;
    },
    {
      immediate: true,
    },
  );

  function getItemEvents(item: Menu) {
    return {
      onClick: async () => {
        isChecked.value = item.path;
        const menuChecked = menuCheckedStore.getmenuChecked;
        menuChecked.menuLeft = item.path;
        menuCheckedStore.setmenuChecked(menuChecked);
        const children = await getChildrenMenus(item.path);
        if (item.path && (!children || children.length === 0)) {
          go(item.path);
          drawerClose0();
        } else {
          menuChildStore.setMenuChild(children);
        }
      },
    };
  }
</script>

<style scoped lang="less">
  .listmenu {
    width: 12rem;
    height: 40rem;
    position: relative;
    color: #333;
    font-size: 14px;
    text-align: left;
    cursor: pointer;
    margin: 0 10px;
    overflow-y: scroll;
    &-li {
      &-check {
        background-color: rgb(246, 246, 246);
        // color: #f33c2f;
        color: #0960bd;
      }
      &-div {
        &:hover {
          background-color: rgb(246, 246, 246);
          color: #0960bd;
        }
        margin: 5px 5px;
        padding: 14px, 14px;

        &-icon {
          margin: 5px 0px;
          display: inline-block;
        }
        &-p {
          display: inline-block;
        }
        &-p:valid {
          color: #0960bd;
        }
      }
    }
  }
</style>
