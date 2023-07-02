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
    }
  },

  async created() {
    const id = this.$route.params.id
    const [res] = await this.$axios.$get(`/api/get/${id}`)
    this.itemData = res
    this.titleData = res.title
  },
  methods: {
    async onModify() {
      // 1. patch
      const id = this.$route.params.id
      const { message } = await this.$axios.$patch(`/api/patch/${id}`, {
        id,
        title: this.titleData,
      })

      if (message.includes('success')) {
        // 2. get
        const [res] = await this.$axios.$get(`/api/get/${id}`)
        this.itemData = res
        this.titleData = res.title
        alert('수정 완료되었습니다')
      } else {
        // [TODO]input창 리셋해야함
        alert('수정권한 없습니다')
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
