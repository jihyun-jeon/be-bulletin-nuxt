<template>
  <div>
    <h5>bulletin board</h5>
    <ul v-for="item in bulletinList" :key="item.id">
      <li class="item" @click="itemClick">
        <p>{{ item.title }}</p>
        <p>{{ item.writer }}</p>
        <p>{{ item.create_at }}</p>
        <p>{{ item.hit }}</p>
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
  methods: {
    itemClick() {
      alert('ddd')
      this.$axios.$delete('/bulletin/delete/1')
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
