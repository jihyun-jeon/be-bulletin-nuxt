<!-- Please remove this file from your project -->
<template>
  <div class="mainWrapper">
    <div>
      <h1>title : {{ itemData.title }}</h1>
      <p>user_id : {{ itemData.user_id }}</p>
      <p>create_at : {{ itemData.create_at }}</p>
      <p>hit : {{ itemData.hit }}</p>
      <p>content : {{ itemData.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      itemData: {},
    }
  },
  async mounted() {
    const id = this.$route.params.id
    const [res] = await this.$axios.$get(`/bulletin/${id}`)
    this.itemData = res
  },
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
</style>
