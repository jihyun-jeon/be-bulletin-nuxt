<template>
  <div class="mainWrapper">
    <button type="button" class="backBtn" @click="gotoBack">←</button>
    <div>
      <h1>title : <input v-model="titleData" /></h1>
      <p>nickname : {{ itemData.nickname }}</p>
      <p>create_at : {{ itemData.create_at }}</p>
      <p>hit : {{ itemData.hit }}</p>
      <p>content : {{ itemData.content }}</p>
      <!-- [TODO] 권한 있는 사람일 경우만 수정버튼 보이게끔 -->
      <button class="modifyBtn" @click="onModify">수정하기</button>
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
      storedTitle: '',
    }
  },

  async created() {
    const id = this.$route.params.id
    const [res] = await this.$axios.$get(`/api/get/${id}`)
    this.itemData = res
    this.titleData = res.title
    this.storedTitle = res.title
  },
  methods: {
    async onModify() {
      // 1. patch
      const id = this.$route.params.id

      try {
        await this.$axios.$patch(`/api/patch/${id}`, {
          id,
          title: this.titleData,
        })

        const [res] = await this.$axios.$get(`/api/get/${id}`)
        this.itemData = res
        this.titleData = res.title
        this.storedTitle = res.title
        alert('수정 완료되었습니다')
      } catch (err) {
        // [TODO] nuxt에서 isAxiosError는 왜 undefined로 나오는 것인지!!?
        // if (this.$axios.isAxiosError(err)) {
        //   console.log('ERR', err)
        // }
        if (err.status === 500) {
          alert('서버 오류')
          return
        }
        if (err.status === 403) {
          alert('수정권한 없습니다')
          this.titleData = this.storedTitle
          return
        }
        // <try에서 스트립트 오류일 때>
        throw err
      }
    },
    gotoBack() {
      history.go(-1)
    },
  },
}
</script>
<style scoped>
input {
  border: 1px solid black;
  border-radius: 8px;
}
.modifyBtn {
  background-color: thistle;
  padding: 5px;
  margin-top: 20px;
}
.mainWrapper {
  width: 100vw;
  margin-top: 30px;
  padding: 0 10rem;
}

.backBtn {
  padding: 5px 20px;
  margin-bottom: 20px;
  background-color: steelblue;
  border-radius: 20px;
  font-size: 30px;
}
</style>
