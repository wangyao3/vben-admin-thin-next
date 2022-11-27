<template>
  <div v-if="props.visible" class="BaseZtMenu">
    <div class="panel-lauouts panel-list-layouts">
      <BasicZtMenuListVue @drawerClose0="drawerClose1" />
    </div>

    <div class="panel-lauouts panel-content-layouts">
      <BasicZtMenuItemVue :visible="props.visible" @drawerClose1="drawerClose1" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import BasicZtMenuListVue from './components/BasicZtMenuList.vue';
  import BasicZtMenuItemVue from './components/BasicZtMenuItem.vue';
  const props = defineProps({
    visible: Boolean,
  });
  const emits = defineEmits<{ (e: 'drawerClose'): void }>();
  function drawerClose1() {
    emits('drawerClose');
  }
</script>

<style scoped lang="less">
  .BaseZtMenu {
    margin: 0;
    padding: 0;
    background-color: #f6f6f6;
  }
  .panel-lauouts {
    float: left;
  }
  .panel-list-layouts {
    width: 16%;
    margin: 0;
    padding: 0;
    position: absolute;
    left: 0;
  }

  .panel-content-layouts {
    width: 80%;
    position: absolute;
    right: 0;
  }
</style>
