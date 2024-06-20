<template>
  <div class="cl-steps" :style="(cssVars as CSSProperties)">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import {
  type CSSProperties,
  computed,
  defineComponent,
  ref,
  type Ref,
  watch,
  provide,
  toRefs
} from 'vue'
import { stepsEmits, stepsProps } from './steps'
import useTheme from '@/hooks/use-theme'
import { stepsLight } from '../styles/index'

export default defineComponent({
  name: 'ClSteps',
  props: stepsProps,
  emits: stepsEmits,
  setup(props) {
    const stepsRef: Ref<HTMLElement | undefined> = ref<HTMLElement | undefined>()

    const themeRef = useTheme('steps', stepsLight)

    const cssVarsRef = computed<CSSProperties>(() => {
      const theme = themeRef.value
      const { self } = theme
      const stepsStyle = {
        '--cl-steps-padding': self.padding
      }
      return stepsStyle
    })

    const { active } = toRefs(props)

    interface StepItemState {
      uid: number
      currentStatus: string
      setIndex: (val: number) => void
      // calcProgress: (status: string) => void
    }
    let steps = ref([])
    // 给steps添加index
    watch(
      steps,
      () => {
        console.log(steps)
        steps.value.forEach((instance: StepItemState, index: number) => {
          console.log(index)
          instance.setIndex(index)
          // instance.index = index
        })
      },
      { deep: true, immediate: true }
    )
    // watch(active, (newValue, oldValue) => {
    //   emit('change', newVal, oldVal)
    // })

    provide('clSteps', { props, steps })

    return {
      cssVars: cssVarsRef,
      stepsRef,
      active
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/steps.scss';
</style>
