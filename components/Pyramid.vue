<!-- https://dev.to/dailydevtips1/creating-a-3d-pyramid-shape-in-css-3m6 -->
<template>
  <div class="pyramid" :style="{transform: pyramidTransform}">
    <div class="base"></div>
    <div class="side one"></div>
    <div class="side two"></div>
    <div class="side three"></div>
    <div class="side four"></div>
  </div>
</template>

<script lang="ts" setup>
const x = ref(0)
const y = ref(0)
const yRotate = ref(45)
const pyramidTransform = computed(() => {
  return `translate3d(${x.value}px, ${y.value}px, 0) rotateY(45deg) rotateZ(-45deg) rotateY(${yRotate.value}deg)`
})

const rotate = (() => {
  yRotate.value = (yRotate.value + 3) % 360
  requestAnimationFrame(rotate)
})

onMounted(() => {
  window.addEventListener('mousemove', (e)=> {
    x.value = e.clientX
    y.value = e.clientY
  })

  requestAnimationFrame(rotate)
})
</script>

<style lang="sass" scoped>
.pyramid
  pointer-events: none
  position: absolute
  left: -50px
  top: -30px
  z-index: 10
  width: 200px
  height: 200px
  transform-style: preserve-3d
  transform: rotateY(326deg) rotateX(2deg) rotateZ(359deg)

.side
  width: 0
  height: 0
  position: absolute
  opacity: 0.7
  border: 100px solid transparent
  border-bottom: 200px solid red
  border-top: 0px

.one
  transform: rotateX(30deg)
  transform-origin: 0 0

.two
  transform-origin: 100px 0
  transform: rotateY(90deg) rotateX(-30deg)
  border-bottom-color: purple

.three
  transform-origin: 100px 0
  transform: rotateY(270deg) rotateX(-30deg)
  border-bottom-color: hotpink

.four
  transform-origin: 100px 0
  transform: rotateY(0) rotateX(-30deg)
  border-bottom-color: yellow

.base
  position: absolute
  width: 100%
  height: 100%
  transform: translateY(73px) rotateX(90deg)
  border: 0
  background: blue

</style>
