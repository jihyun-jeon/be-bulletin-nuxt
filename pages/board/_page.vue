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
          <!-- <p>{{ item.create_at }}</p> -->
          <p>
            {{ item.create_at }}
          </p>
          <p>{{ item.hit }}</p>
        </nuxt-link>
      </li>
    </ul>
    <ul class="pagenation">
      <li>
        <button>&lt;&lt;</button>
        <button>&lt;</button>
      </li>
      <li v-for="page in pageNum" :key="page">
        <nuxt-link :to="`/board/${page}`">{{ page }}</nuxt-link>
      </li>
      <li>
        <button>&gt;</button>
        <button>&gt;&gt;</button>
      </li>
    </ul>
  </v-app>
</template>

<script>
import isToday from 'date-fns/isToday'
import { format } from 'date-fns'
import WriteForm from '../../components/WriteForm.vue'

const COUNTITEM = 3

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
  created() {
    this.getData()
  },
  mounted() {
    //
  },

  methods: {
    async getData() {
      const id = this.$route.params.page
      const { data, total } = await this.$axios.$get('/api/get', {
        params: {
          page: id,
          size: COUNTITEM,
        },
      })
      //  // 특정 날짜가 오늘인지 확인 human readable format
      data.forEach(
        (item) =>
          (item.create_at = isToday(new Date(item.create_at))
            ? '오늘'
            : format(new Date(item.create_at), 'yyyy-MM-dd')) // 날짜를 원하는 형식으로 포맷팅
      )
      this.bulletinList = data
      this.pageNum = Math.round(total / COUNTITEM)
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
  width: 800px;
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
