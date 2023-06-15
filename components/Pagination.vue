<template>
  <div>
    <ul>
      <li>
        <button :disabled="currentGroup === 1" @click="previousGroup">
          &laquo;
        </button>
      </li>
      <li>
        <button :disabled="pageNum === 1" @click="previousPage">&lt;</button>
      </li>
      <li
        v-for="num in list"
        :key="num"
        :class="{ page: true, active: pageNum === num }"
      >
        <button type="button" @click="goto(num)">
          {{ num }}
        </button>
      </li>
      <li>
        <button :disabled="pageNum === totalPages" @click="nextPage">
          &gt;
        </button>
      </li>
      <li>
        <button :disabled="currentGroup === totalGroups" @click="nextGroup">
          &raquo;
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    page: { type: Number, defult: 1 },
    totalCount: { type: Number, required: true },
    itemsPerPage: { type: Number, default: 3 },
    pagesPerGroup: { type: Number, default: 5 },
  },
  emits: {
    changePage: null,
  },
  data() {
    return {
      pageNum: 1,
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalCount / this.itemsPerPage)
    },
    totalGroups() {
      return Math.ceil(this.totalPages / this.pagesPerGroup)
    },
    currentGroup() {
      return Math.ceil(this.pageNum / this.pagesPerGroup)
    },
    list() {
      const pages = this.totalPages

      if (pages < 1) {
        return [1]
      }

      const start = (this.currentGroup - 1) * this.pagesPerGroup
      const end = Math.min(start + this.pagesPerGroup, this.totalPages)
      const itemCount = end - start

      return new Array(itemCount).fill(null).map((_, idx) => start + idx + 1)
    },
  },
  watch: {
    page() {
      this.pageNum = this.page ?? 1
    },
  },
  mounted() {
    this.pageNum = this.page ?? 1
  },
  methods: {
    previousPage() {
      if (this.pageNum > 1) {
        this.$emit('changePage', --this.pageNum)
      }
    },
    nextPage() {
      if (this.pageNum < this.totalPages) {
        this.$emit('changePage', ++this.pageNum)
      }
    },
    previousGroup() {
      if (this.currentGroup > 1) {
        // currentGroup = 5 : 16 // 4 : 11 // 3: 6 // 2:1
        const newPageNum = (this.currentGroup - 2) * this.pagesPerGroup + 1
        this.$emit('changePage', newPageNum)
      }
    },
    nextGroup() {
      if (this.currentGroup < this.totalGroups) {
        // currentGroup = 1 : 1 // 2: 6 // 3 : 11 // 4: 16 // 5: 21
        const newPageNum = this.currentGroup * this.pagesPerGroup + 1
        this.$emit('changePage', newPageNum)
      }
    },
    goto(num) {
      this.$emit('changePage', num) // 페이지네이션 컴포넌트는 페이지 바꾸는 역활막 딱!, 따라서 router를 바꾸는건 emti으로보내 상위컴포넌트에서 처리
      this.pageNum = num
    },
  },
}
</script>

<style scoped>
ul {
  list-style: none;
  display: flex;
}

.active button {
  font-weight: bold;
}
</style>
