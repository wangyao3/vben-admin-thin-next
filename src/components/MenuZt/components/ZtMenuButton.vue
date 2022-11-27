<template>
  <div
    class="menubutton-div"
    v-bind="getItemEvents(props.item, props.level)"
    :class="getMenuChecked(props.item.path, props.level)"
  >
    <Icon
      class="menubutton-div-icon"
      :size="16"
      :icon="props.item.icon || (props.item.meta && props.item.meta.icon)"
    />
    <p class="menubutton-div-p">{{ t(props.item.name) }}</p>
  </div>
</template>
<script lang="ts" setup>
  import { Icon } from '/@/components/Icon';
  import { useI18n } from '/@/hooks/web/useI18n';
  import type { Menu } from '/@/router/types';
  import { useGo } from '/@/hooks/web/usePage';
  import { watch, reactive } from 'vue';
  import { usemenuCheckedStore } from '/@/store/modules/menu/menuChecked';
  import type { Checked } from '/@/store/modules/menu/menuChecked';
  import { p } from '@antfu/utils';

  const menuCheckedStore = usemenuCheckedStore();
  const { t } = useI18n();
  const go = useGo();
  const props = defineProps<{ item: Menu; level: String }>();
  const emits = defineEmits<{ (e: 'drawerClose2'): void }>();
  const isChecked = reactive<Checked>({
    checked: {
      menuLeft: '',
      menuFirst: '',
      menuSecond: '',
      menuThird: '',
    },
  });

  watch(
    [() => menuCheckedStore.getmenuChecked],
    () => {
      isChecked.checked = menuCheckedStore.getmenuChecked;
    },
    {
      immediate: true,
    },
  );

  function getMenuChecked(path: String, level: String) {
    if (level == 'a') {
      return isChecked.checked.menuFirst == path ? 'menubutton-div-check' : '';
    } else if (level == 'b') {
      return isChecked.checked.menuSecond == path ? 'menubutton-div-check' : '';
    } else if (level == 'c') {
      return isChecked.checked.menuThird == path ? 'menubutton-div-check' : '';
    }
  }

  function getItemEvents(item: Menu, level: String) {
    return {
      onClick: async () => {
        if (item.path && level != 'a') {
          closeMenu();
          go(item.path);
        }
        if (level == 'a') {
          const menuChecked = menuCheckedStore.getmenuChecked;
          menuChecked.menuFirst = item.path;
          menuCheckedStore.setmenuChecked(menuChecked);
        } else if (level == 'b') {
          const menuChecked = menuCheckedStore.getmenuChecked;
          menuChecked.menuSecond = item.path;
          menuCheckedStore.setmenuChecked(menuChecked);
        } else if (level == 'c') {
          const menuChecked = menuCheckedStore.getmenuChecked;
          menuChecked.menuThird = item.path;
          menuCheckedStore.setmenuChecked(menuChecked);
        }
      },
    };
  }
  function closeMenu() {
    emits('drawerClose2');
  }
</script>
<style scoped lang="less">
  .menubutton-div {
    display: inline-block;
    text-align: center;
    padding: 5px 16px 5px 8px;
    font-size: 14px;
    margin: 10px 10px;

    &-icon {
      display: inline;
      font-size: 14px;
      line-height: 14px;
    }
    &-p {
      display: inline;
      font-size: 14px;
      line-height: 14px;
    }
    &:hover {
      color: #0960bd;
      font-weight: bold;
    }
    &-check {
      color: #0960bd;
      font-weight: bold;
      background-color: rgb(245, 245, 245);
      border-radius: 4px;
    }
  }
  .menubutton-div:hover {
    background-color: rgb(245, 245, 245);
    cursor: pointer;
    border-radius: 4px;
  }
</style>
