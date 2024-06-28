<template>
  <DrawerWrapper
    v-bind="$props"
    @update:show="$emit('update:show', false)"
    @update:width="(width) => $emit('update:width', width)"
    @update:height="(height) => $emit('update:height', height)"
  >
    <div class="cl-drawer-content">
      <!-- header -->
      <div v-if="closable || title || $slots.title" class="cl-drawer-header" :style="headerStyle">
        <div class="cl-drawer-header__main">
          <!-- title标题区域，同时传入title和slots.header以slot优先 -->
          <slot name="header">{{ title }}</slot>
        </div>
        <!-- icon -->
        <div v-if="closable" class="cl-drawer-header__close" @click="onClickCloseIcon">
          <slot name="close-icon">
            <cl-icon iconName="cl-icon-close" class="icon-close"></cl-icon>
          </slot>
        </div>
      </div>
      <!-- body -->
      <div class="cl-drawer-body" :style="bodyStyle">
        <div class="cl-drawer-body-content-wrapper">
          <slot></slot>
        </div>
      </div>

      <!-- footer -->
      <div v-if="$slots.footer" class="cl-drawer-footer" :style="footerStyle">
        <slot name="footer"></slot>
      </div>
    </div>
  </DrawerWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { drawerProps } from './drawer'
import DrawerWrapper from './drawerWrapper.vue'

export default defineComponent({
  name: 'ClDrawer',
  props: drawerProps,
  components: {
    DrawerWrapper
  },
  setup(props, { emit }) {
    const onClickCloseIcon = () => {
      emit('update:show', false)
    }

    return {
      onClickCloseIcon
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/drawer.scss';
</style>
