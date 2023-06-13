<template>
  <v-app id="app">
    <h1>home</h1>
  </v-app>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>

<style scoped>
.rows {
  display: flex;
  justify-content: space-between;
  width: 800px;
  background-color: lightgray;
}
.pagenation {
  width: 30vw;
  display: flex;
  justify-content: space-around;
  list-style: none;
}
.item {
  display: flex;
  justify-content: space-between;
  background-color: lightgray;
}
</style>
