<template>
  <div v-if="visible" class="pyramid" :style="{transform: pyramidTransform}">
    <div class="base"></div>
    <svg class="triangle one">
      <defs>
        <pattern id="img1" width="1" height="1">
          <image x="+5" y="0" width="50" height="100"
            href="123.png"
          />
        </pattern>
        <g id="triangle_pattern">
          <path d="M 0,100 L 25,0 L 50,100 z"
            fill="url(#img1)"
          />
        </g>
      </defs>
      <use href="#triangle_pattern"/>
    </svg>
    <svg class="triangle two">
      <use href="#triangle_pattern"/>
    </svg>
    <svg class="triangle three">
      <use href="#triangle_pattern"/>
    </svg>
    <svg class="triangle four">
      <use href="#triangle_pattern"/>
    </svg>
  </div>
</template>

<script lang="ts" setup>
const SCALE_STEP = 0.005
const SCALE_MAX = 0.7 - SCALE_STEP
const SCALE_MIN = 0.3 + SCALE_STEP

// Data
const x = ref(320)
const y = ref(560)
const yRotate = ref(45)

const cursor = useCursorState()
const scale = ref(1)
const scaleReversed = ref(false)

const visible = ref(true)

const pyramidTransform = computed(() => {
  // 1. Move to mouse position
  // 2. Scale pyramid
  // 3. Rotate pyramid
  return `
    translate3d(${x.value}px, ${y.value}px, 0)
    scale3d(${scale.value}, ${scale.value}, ${scale.value})
    rotateX(45deg) rotateZ(-45deg) rotateY(${yRotate.value}deg)
  `
})

const rotate = () => {
  yRotate.value = (yRotate.value + 2 / scale.value) % 360
  requestAnimationFrame(rotate)
}

const changeScale = () => {
  if (cursor.value != CursorState.active) {
    scale.value = SCALE_MAX
    scaleReversed.value = true
  } else if (scaleReversed.value) {
    scale.value += SCALE_STEP

    if (scale.value >= SCALE_MAX)
      scaleReversed.value = false
  } else {
    scale.value -= SCALE_STEP

    if (scale.value <= SCALE_MIN)
      scaleReversed.value = true
  }
  requestAnimationFrame(changeScale)
}

onMounted(() => {

  window.addEventListener('mousemove', (e)=> {
    x.value = e.pageX
    y.value = e.pageY
  })

  // Hiding pyramid when cursor is out of window
  window.addEventListener('mouseout', () => {
    visible.value = false
  })

  // Show pyramid when cursor is in window
  window.addEventListener('mouseover', () => {
    visible.value = true
  })

  requestAnimationFrame(rotate)
  requestAnimationFrame(changeScale)
})
</script>

<style lang="sass">
@use 'sass:math'

*
  cursor: none!important

$side_width: 50
$side_height: 100
$pyramid_height: math.sqrt(math.pow($side_height, 2) + math.pow(math.div($side_width * math.sqrt(2), 2), 2))
$alpha: math.asin(math.div($side_width, 2 * $side_height))

.pyramid
  position: absolute
  top: 0px
  left: #{math.div(-$side_width, 2)}px
  width: #{$side_width}px
  height: #{$pyramid_height}px
  z-index: 10
  pointer-events: none
  transform-style: preserve-3d
  transform-origin: top center
  transform: rotateY(45deg) rotateZ(-45deg)

  > .triangle
    width: #{$side_width}px
    height: #{$side_height}px
    left: 0px
    top: 0px
    opacity: 0.7
    position: absolute

    &.one
      transform-origin: center top
      transform: rotateX($alpha)

    &.two
      transform-origin: center top
      transform: rotateY(90deg) rotateX($alpha)

    &.three
      transform-origin: center top
      transform: rotateY(180deg) rotateX($alpha)

    &.four
      transform-origin: center top
      transform: rotateY(270deg) rotateX($alpha)

  > .base
    position: absolute
    width: #{$side_width}px
    height: #{$side_width}px
    transform: translateY(#{$pyramid_height - math.div($side_width, math.sqrt(2))}px) rotateX(90deg)
    background: url('123.png')
</style>
