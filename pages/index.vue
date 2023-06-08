<template>
  <div>
    <h5>bulletin board</h5>
    <ul v-for="item in bulletinList" :key="item.id">
      <li>
        <button @click="onDelete(item.id)">x</button>

        <nuxt-link :to="`/detail/${item.id}`">
          <p>{{ item.title }}</p>
          <p>{{ item.user_id }}</p>
          <p>{{ item.create_at }}</p>
          <p>{{ item.hit }}</p>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      bulletinList: [],
    }
  },
  async created() {
    const result = await this.$axios.$get('/bulletin')
    this.bulletinList = result
  },
  beforeDestroy() {
    this.$router.push(this.$route.path)
  },
  methods: {
    async onDelete(itemID) {
      await this.$axios.$delete(`/bulletin/delete/${itemID}`)
      const result = await this.$axios.$get('/bulletin')
      this.bulletinList = result
    },
  },
}
</script>

<style scoped>
.item {
  display: flex;
  justify-content: space-between;
  background-color: lightgray;
}
</style>
