<!--
 * @Author: Vben
 * @Description: logo component
-->
<template>
  <div class="anticon" :class="getAppLogoClass" @click="goHome">
    <img src="../../../assets/images/logo.png" />
    <div class="ml-2 truncate md:opacity-100" :class="getTitleClass" v-show="showTitle">
      <span class="titleSpan"> {{ title }}</span>
    </div>
    <Drawer
      :autofocus="false"
      :style="{ display: `flex`, top: `48px`, right: 0, left: 0 }"
      :drawerStyle="{ margin: 0, padding: 0, overflow: `hidden` }"
      :bodyStyle="{ margin: 0, padding: 0 }"
      :visible="visible"
      :closable="false"
      :keyboard="true"
      :placement="placement"
      :width="`70%`"
      @close="drawerClose"
    >
      <BasicZtMenu @drawerClose="drawerClose" :visible="visible" />
    </Drawer>
  </div>
</template>
<script lang="ts" setup>
  import { computed, unref, ref } from 'vue';
  import { useGlobSetting } from '/@/hooks/setting';
  // import { useGo } from '/@/hooks/web/usePage';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import { useDesign } from '/@/hooks/web/useDesign';
  // import { PageEnum } from '/@/enums/pageEnum';

  import { BasicZtMenu } from '/@/components/MenuZt';
  import { Drawer } from 'ant-design-vue';
  const props = defineProps({
    /**
     * The theme of the current parent component
     */
    theme: { type: String, validator: (v: string) => ['light', 'dark'].includes(v) },
    /**
     * Whether to show title
     */
    showTitle: { type: Boolean, default: true },
    /**
     * The title is also displayed when the menu is collapsed
     */
    alwaysShowTitle: { type: Boolean },
  });

  const { prefixCls } = useDesign('app-logo');
  const { getCollapsedShowTitle } = useMenuSetting();
  // const userStore = useUserStore();
  const { title } = useGlobSetting();
  // const go = useGo();

  const getAppLogoClass = computed(() => [
    prefixCls,
    props.theme,
    { 'collapsed-show-title': unref(getCollapsedShowTitle) },
  ]);

  const getTitleClass = computed(() => [
    `${prefixCls}__title`,
    {
      'xs:opacity-0': !props.alwaysShowTitle,
    },
  ]);

  const visible = ref(false);
  const placement = ref('left');
  function goHome() {
    // go(userStore.getUserInfo.homePath || PageEnum.BASE_HOME);
    visible.value = !visible.value;
  }
  function drawerClose() {
    visible.value = !visible.value;
  }
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-app-logo';

  .@{prefix-cls} {
    display: flex;
    align-items: center;
    padding-left: 7px;
    cursor: pointer;
    transition: all 0.2s ease;

    &.light {
      border-bottom: 1px solid @border-color-base;
    }

    &.collapsed-show-title {
      padding-left: 20px;
    }

    &.light &__title {
      color: @primary-color;
    }

    &.dark &__title {
      color: @white;
    }

    &__title {
      font-size: 16px;
      font-weight: 700;
      transition: all 0.5s;
      line-height: normal;
    }
  }
  .titleSpan {
    color: #0960bd;
  }
</style>
