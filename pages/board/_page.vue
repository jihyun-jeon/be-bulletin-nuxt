<template>
  <div>
    <h5>bulletin board</h5>
    <button @click="onClickCreat">글쓰기</button>
    <ul class="pagenation">
      <li>페이지네이션</li>
      <li><nuxt-link :to="`/board/1`">1</nuxt-link></li>
      <li><nuxt-link :to="`/board/2`">2</nuxt-link></li>
      <li><nuxt-link :to="`/board/3`">3</nuxt-link></li>
    </ul>
    <ul v-for="item in bulletinList" :key="item.id">
      <li>
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
    const id = this.$route.params.page
    const result = await this.$axios.$get('/api/get', {
      params: {
        page: id,
        size: 10,
      },
    })
    this.bulletinList = result

    // const totalLength = await this.$axios.$get('/api/all-length')
    // console.log('totalLength', totalLength)
  },

  methods: {
    async onDelete(itemID) {
      await this.$axios.$delete(`/api/delete/${itemID}`)
      const result = await this.$axios.$get('/api/get')
      this.bulletinList = result
    },
    // post요청시 바디에 담은 객체는 브라우저에서 "문자로" 변환해서 보내짐.
    // 때문에 body-parser을 통해 문자열을 다시 객체로 바꿔주는 것임.
    async onClickCreat() {
      await this.$axios.$post('/api/post', {
        user_id: 'ddebiasio2m',
        title: "Gideon's Army",
        content:
          'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by the...',
        create_at: '2023-02-17',
        hit: 74,
      })
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
