<!-- Please remove this file from your project -->
<template>
  <div class="mainWrapper">
    <div>
      <h1>title : <input v-model="titleData" /></h1>
      <p>user_id : {{ itemData.user_id }}</p>
      <p>create_at : {{ itemData.create_at }}</p>
      <p>hit : {{ itemData.hit }}</p>
      <p>content : {{ itemData.content }}</p>

      <button @click="onModify">수정하기</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      itemData: {},
      titleData: '',
    }
  },

  async mounted() {
    const id = this.$route.params.id
    const [res] = await this.$axios.$get(`/api/get/${id}`)
    this.itemData = res
    this.titleData = res.title
  },
  methods: {
    async onModify() {
      // 1. patch
      const id = this.$route.params.id
      await this.$axios.$patch(`/api/patch/${id}`, {
        id,
        title: this.titleData,
      })

      // 2. get
      const [res] = await this.$axios.$get(`/api/get/${id}`)
      this.itemData = res
      this.titleData = res.title
    },
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
