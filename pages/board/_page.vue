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
    <PaginationVue
      :page="1"
      :totalCount="69"
      :itemsPerPage="5"
      :pagesPerGroup="5"
      @goto="goPage"
    />
    <!-- <ul class="pagenation">
      <li>
        <button>&lt;&lt;</button>
        <button @click="goPrev">&lt;</button>
      </li>
      <li v-for="page in pageNumList" :key="page" @click="onNumClick(page)">
        <nuxt-link
          :to="`/board/${page}`"
          :class="nowClicked === page ? 'clicked' : 'pageNum'"
          >{{ page }}</nuxt-link
        >
      </li>
      <li>
        <button @click="goNext">&gt;</button>
        <button>&gt;&gt;</button>
      </li>
    </ul> -->
  </v-app>
</template>

<script>
import isToday from 'date-fns/isToday'
import { format } from 'date-fns'
import WriteForm from '../../components/WriteForm.vue'
import { COUNTITEM } from '../../constant'
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
      pageNumList: [],
      pageChunkNum: 0,
      nowClicked: 1,
    }
  },
  computed: {
    parmaId() {
      return this.$route.params.page
    },
  },
  watch: {
    pageChunkNum() {
      this.getData()
    },
    parmaId() {
      this.getData()
    },
  },
  created() {
    this.getData()
  },
  mounted() {
    //
  },

  methods: {
    goPage(page) {
      this.$router.push(`/board/${page}`)
    },
    async getData() {
      const id = this.$route.params.page
      const { data, total } = await this.$axios.$get('/api/get', {
        params: {
          page: id,
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
      this.bulletinList = data

      const AllNumList = new Array(Math.round(total / COUNTITEM))
        .fill(null)
        .map((_, idx) => idx + 1) //  59/3 =  20

      // 5단위로 페이지네이션
      const cal = this.pageChunkNum * 5
      this.pageNumList = AllNumList.slice(cal, cal + 5)
    },

    async onDelete(itemID) {
      await this.$axios.$delete(`/api/delete/${itemID}`)
      await this.getData()
    },

    goPrev() {
      if (!this.pageChunkNum) {
        return 0
      }
      this.pageChunkNum -= 1
    },
    goNext() {
      // 마지막 페이지면
      // if (!this.pageChunkNum) {
      //   return 0
      // }
      this.pageChunkNum += 1
    },
    onNumClick(page) {
      console.log('page', page)
      this.nowClicked = page
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
