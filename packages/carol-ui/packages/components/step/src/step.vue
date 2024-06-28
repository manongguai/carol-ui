<template>
  <div class="cl-step" :class="['cl-step-' + currentStatus]" :style="(cssVars as CSSProperties)">
    <!-- 'min-width': isLast ? width - 66 + 'px' || '134px' : width || '200px', -->
    <span v-if="$slots.icon" class="cl-step-icon">
      <slot name="icon"></slot>
    </span>
    <template v-else>
      <cl-icon
        class="cl-step-icon"
        v-if="currentStatus === 'process'"
        iconName="cl-icon-jinxingzhong"
      ></cl-icon>
      <cl-icon
        class="cl-step-icon"
        iconName="cl-icon-wancheng"
        v-if="currentStatus === 'finish'"
      ></cl-icon>
      <span
        v-else
        class="cl-step-icon"
        :style="{ '--index': currentStatus === 'wait' ? index + 1 : '' }"
      ></span>
    </template>

    <div
      class="is-content"
      :style="{
        'min-width': width
      }"
      :class="isCenter ? 'is-center' : ''"
    >
      <span class="is-title">
        <slot name="title" v-if="$slots.title"></slot>
        <template v-else>{{ title }}</template>
      </span>
      <span class="is-description">
        <slot name="description" v-if="$slots.description"></slot>
        <template v-else>{{ description }}</template>
      </span>
    </div>
    <div class="is-arrow" v-if="!isLast">
      <span>
        <slot name="arrow">
          <cl-icon class="cl-icon-arrow-right" iconName="cl-icon-arrow-right"></cl-icon>
        </slot>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  type CSSProperties,
  computed,
  defineComponent,
  ref,
  type Ref,
  onBeforeUnmount,
  watch,
  getCurrentInstance,
  inject,
  reactive,
  onMounted
} from 'vue'
import { stepEmits, stepProps } from './step'
import useTheme from '@/hooks/use-theme'
import { stepLight } from '../styles/light'
import ClIcon from '@/components/icon'

export default defineComponent({
  name: 'ClStep',
  props: stepProps,
  emits: stepEmits,
  components: {
    ClIcon
  },
  setup(props) {
    const stepRef: Ref<HTMLElement | undefined> = ref<HTMLElement | undefined>()

    const themeRef = useTheme('step', stepLight)

    const cssVarsRef = computed<CSSProperties>(() => {
      const theme = themeRef.value
      const { self } = theme
      const {
        titleColor,
        infoColor,
        textColor4,
        titleSize,
        descriptionFontSize,
        iconSize,
        iconIndexSize,
        iconIndexWidth,
        iconIndexHight,
        iconIndexRaduis,
        fontWeight
      } = self
      const fontStyle = {
        '--cl-step-color': titleColor,
        '--cl-step-description-color': infoColor,
        '--cl-step-icon-color': textColor4,
        '--cl-step-font-weight': fontWeight
      }

      const titleStyle = {
        '--cl-step-title-size': titleSize
      }
      const descriptionStyle = {
        '--cl-step-description-size': descriptionFontSize
      }
      const iconStyle = {
        '--cl-step-icon-size': iconSize,
        '--cl-step-icon-index-size': iconIndexSize,
        '--cl-step-icon-index-width': iconIndexWidth,
        '--cl-step-icon-index-hight': iconIndexHight,
        '--cl-step-icon-index-raduis': iconIndexRaduis
      }

      return { ...fontStyle, ...titleStyle, ...descriptionStyle, ...iconStyle }
    })
    interface IStepsProps {
      space: number | string
      active: number
      direction: string
      alignCenter: boolean
      simple: boolean
      finishStatus: string
      processStatus: string
    }
    interface StepItemState {
      uid: number
      currentStatus: string
      setIndex: (val: number) => void
      // calcProgress: (status: string) => void
    }
    interface IStepsInject {
      props: IStepsProps
      steps: Ref<StepItemState[]>
    }
    // 获取父级的实例
    const $parent = inject('clSteps') as IStepsInject
    let index = ref(-1)
    let initStatus = ref('')
    const setIndex = (val: number) => {
      index.value = val
    }
    const currentInstance = getCurrentInstance()

    // 当前step状态值
    const currentStatus = computed(() => {
      // 优先取组件props的值，如果没有则再取外部组件设置的值
      return props.status || initStatus.value
    })

    // 上一个step的状态
    // const prevStatus = computed(() => {
    //   const prevStep = $parent.steps[props.index - 1]
    //   return prevStep ? prevStep.currentStatus : 'wait'
    // })

    const isCenter = computed(() => {
      return $parent.props.alignCenter
    })

    // 判断是否是最后一个step
    const isLast = computed(() => {
      const steps = $parent.steps.value
      return steps[steps.length - 1]?.uid === currentInstance?.uid
      // return parent.steps[parent.steps.length - 1] === this
    })

    // 计算step的宽度
    const width = computed(() => {
      const parent = $parent.props
      return parent.space || props.space
    })

    // 初始/状态改变时获取steps状态
    function updateStatus(val: number) {
      let parent = $parent.props
      if (val > index.value) {
        initStatus.value = parent.finishStatus
      } else if (val === index.value) {
        initStatus.value = parent.processStatus
      } else {
        initStatus.value = 'wait'
      }
      // const prevChild = $parent.steps.value[index.value - 1]
    }

    // 在onBeforeUnmount函数中从'steps'数组中移除组件
    onBeforeUnmount(() => {
      let steps = $parent.steps.value
      $parent.steps.value = steps.filter((item) => item.uid !== stepItemState.uid)
    })

    const stepItemState = reactive({
      uid: currentInstance!.uid,
      currentStatus,
      setIndex,
      index: index.value
      // calcProgress
    })
    $parent.steps.value.push(stepItemState)
    onMounted(() => {
      watch(
        [
          () => $parent.props.active,
          () => $parent.props.processStatus,
          () => $parent.props.finishStatus
        ],
        ([active]) => {
          updateStatus(active)
        },
        { immediate: true }
      )
    })
    return {
      cssVars: cssVarsRef,
      stepRef,
      currentStatus,
      index,
      isCenter,
      isLast,
      width,
      initStatus
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/step.scss';
</style>
