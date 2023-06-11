<template>
  <v-app id="app">
    <h1>home</h1>
  </v-app>
</template>

<script>
// [질문] 처음 경로 진입시 이 파일로 오는데, 경로가 /board/1부터 시작되서 이 파일은 의미가 없어짐. 여기서 어떤 로직을 담고있어야 하는지?
export default {
  name: 'IndexPage',
  // data() {
  //   return {
  //     bulletinList: [],
  //   }
  // },
  // async created() {
  //   const result = await this.$axios.$get('/api/get', {
  //     params: {
  //       page: 1,
  //       size: 10,
  //     },
  //   })
  //   this.bulletinList = result

  //   // const totalLength = await this.$axios.$get('/api/all-length')
  //   // console.log('totalLength', totalLength)
  // },

  // methods: {
  //   async onDelete(itemID) {
  //     await this.$axios.$delete(`/api/delete/${itemID}`)
  //     const result = await this.$axios.$get('/api/get')
  //     this.bulletinList = result
  //   },
  //   // post요청시 바디에 담은 객체는 브라우저에서 "문자로" 변환해서 보내짐.
  //   // 때문에 body-parser을 통해 문자열을 다시 객체로 바꿔주는 것임.
  //   async onClickCreat() {
  //     await this.$axios.$post('/api/post', {
  //       user_id: 'ddebiasio2m',
  //       title: "Gideon's Army",
  //       content:
  //         'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by the...',
  //       create_at: '2023-02-17',
  //       hit: 74,
  //     })
  //   },
  // },
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
