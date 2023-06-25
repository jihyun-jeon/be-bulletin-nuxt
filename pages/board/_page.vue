<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <v-app id="app">
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
          <p>{{ item.nickname }}</p>
          <p>{{ item.create_at }}</p>
          <p>{{ item.hit }}</p>
        </nuxt-link>
      </li>
    </ul>
    <PaginationVue
      :page="parmaId"
      :totalCount="totalCount"
      :itemsPerPage="COUNTITEM"
      :pagesPerGroup="5"
      @changePage="onPageChange"
    />
    <!-- [TODO] slot으로 페이지네이션 버튼 하위 컴포넌트로 넘겨주기 -->
  </v-app>
</template>

<script>
import isToday from 'date-fns/isToday'
import { format } from 'date-fns'
import { COUNTITEM } from '../../constant'
import WriteForm from '../../components/WriteForm.vue'
import PaginationVue from '../../components/Pagination.vue'

export default {
  name: 'IndexPage',
  components: {
    WriteForm,
    PaginationVue,
  },

  data() {
    return {
      bulletinList: [],
      totalCount: 0,
      COUNTITEM, // this는 이 컴포넌트의 인스턴스 객체이기 때문에 import로 가져온 상수를 data에 등록하여, 인스턴스 객체의 프로퍼티로 등록하여 사용해야 함
    }
  },
  computed: {
    parmaId() {
      return +this.$route.params.page
    },
  },
  watch: {
    parmaId() {
      this.getData()
    },
  },
  mounted() {
    this.getData()
  },

  methods: {
    onPageChange(page) {
      this.$router.push(`/board/${page}`)
    },
    async getData() {
      try {
        const { data, total } = await this.$axios.$get('/api/get', {
          params: {
            page: this.parmaId,
            size: COUNTITEM,
          },
        })

        // 특정 날짜가 오늘인지 확인 human readable format
        data.forEach(
          (item) =>
            (item.create_at = isToday(new Date(item.create_at))
              ? '오늘'
              : format(new Date(item.create_at), 'yyyy-MM-dd')) // 날짜를 원하는 형식으로 포맷팅
        )
        console.log('data', data)
        this.bulletinList = data
        this.totalCount = total
      } catch {
        this.$router.push('/')
      }
    },

    async onDelete(itemID) {
      const { message } = await this.$axios.$delete(`/api/delete/${itemID}`)
      if (message.includes('success')) {
        await this.getData()
      } else {
        alert('삭제권한 없습니다')
      }
    },
  },
}
</script>

<style scoped>
#app {
  margin-top: 30px;
}
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

.pageNum {
  width: 30px;
  height: 30px;
  background-color: lightcyan;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

a {
  text-decoration: none;
  color: black;
}

.clicked {
  width: 30px;
  height: 30px;
  background-color: orange;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
