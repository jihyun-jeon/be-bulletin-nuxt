<!-- Please remove this file from your project -->
<template>
  <div class="mainWrapper">
    <div class="circle">detail comp</div>
  </div>
</template>

<script>
export default {
  name: 'NuxtTutorial',
  layout: 'otherLayout',
}
</script>
<style scoped>
.mainWrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-content: center;
}
.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: teal;
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
