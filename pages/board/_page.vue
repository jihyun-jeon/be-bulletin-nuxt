<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <v-app id="app">
    <h1>bulletin board</h1>

    <WriteForm :getData="getData" />

    <ul>
      <li class="rows">
        <p>번호</p>
        <p>제목</p>
        <p>작성자</p>
        <p>작성일</p>
        <p>조회수</p>
      </li>
      <li v-for="item in bulletinList" :key="item.id">
        <button @click="onDelete(item.id)">x</button>

        <nuxt-link :to="`/detail/${item.id}`" class="rows">
          <p>{{ item.id }}</p>
          <p>{{ item.title }}</p>
          <p>{{ item.user_id }}</p>
          <p>{{ item.create_at }}</p>
          <p>{{ item.hit }}</p>
        </nuxt-link>
      </li>
    </ul>
    <ul class="pagenation">
      <li>페이지네이션</li>
      <li v-for="page in pageNum" :key="page">
        <nuxt-link :to="`/board/${page}`">{{ page }}</nuxt-link>
      </li>
    </ul>
  </v-app>
</template>

<script>
import WriteForm from '../../components/WriteForm.vue'
export default {
  name: 'IndexPage',
  components: {
    WriteForm,
  },
  data() {
    return {
      bulletinList: [],
      pageNum: 1,
    }
  },
  watch: {
    bulletinList() {
      console.log('bulletinList', this.bulletinList)
    },
  },
  created() {
    this.getData()
  },

  methods: {
    async getData() {
      const id = this.$route.params.page
      const { data, total } = await this.$axios.$get('/api/get', {
        params: {
          page: id,
          size: 10,
        },
      })

      this.bulletinList = data
      this.pageNum = Math.round(total / 10)
    },

    async onDelete(itemID) {
      await this.$axios.$delete(`/api/delete/${itemID}`)
      await this.getData()
    },
  },
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
