<template>
  <div v-if="visible" class="pyramid" :style="{transform: pyramidTransform}">
    <div class="base"></div>
    <svg class="triangle one">
      <defs>
        <pattern id="pyramid_side_image" width="1" height="1">
          <!-- Note: The original image must have the same aspect ratio as the "triangle",
                     otherwise there will be transparent bars at the top and bottom. -->
          <image x="0" y="0" width="50" height="100"
            href="/pyramid/side.png"
          />
        </pattern>
        <g id="pyramid_side_pattern">
          <path d="M 0,100 L 25,0 L 50,100 z"
            fill="url(#pyramid_side_image)"
          />
        </g>
      </defs>
      <use href="#pyramid_side_pattern"/>
    </svg>
    <svg class="triangle two">
      <use href="#pyramid_side_pattern"/>
    </svg>
    <svg class="triangle three">
      <use href="#pyramid_side_pattern"/>
    </svg>
    <svg class="triangle four">
      <use href="#pyramid_side_pattern"/>
    </svg>
  </div>
</template>

<script lang="ts" setup>
const SCALE_STEP = 0.01
const SCALE_MAX = 1 - SCALE_STEP
const SCALE_MIN = 0.3 + SCALE_STEP

// Data
const x = ref(0)
const y = ref(0)
const lastXScroll = ref(0)
const lastYScroll = ref(0)

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

// Animation

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

  lastXScroll.value = window.scrollX
  lastYScroll.value = window.scrollY

  window.addEventListener('mousemove', (e)=> {
    x.value = e.pageX
    y.value = e.pageY
  })

  // Adjustment of cursor position because "mousemove" event does not trigger
  // when scrolling and cursor is detached from mouse.
  window.addEventListener('scroll', ()=> {
    x.value += window.scrollX - lastXScroll.value
    lastXScroll.value = window.scrollX
    y.value += window.scrollY - lastYScroll.value
    lastYScroll.value = window.scrollY
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

@media not screen and (hover: none) and (pointer: coarse)
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
    opacity: 0.7
    background: url('/pyramid/base.png')
    background-size: cover
</style>
