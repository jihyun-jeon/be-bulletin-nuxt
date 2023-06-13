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
    itemsPerPage: { type: Number, default: 5 },
    pagesPerGroup: { type: Number, default: 5 },
  },
  emits: {
    prev: null,
    next: null,
    goto: null,
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
        return []
      }

      const start = (this.currentGroup - 1) * this.pagesPerGroup
      const end = Math.min(start + this.pagesPerGroup, this.totalPages)
      const itemCount = end - start

      return new Array(itemCount).fill(null).map((_, idx) => start + idx + 1)
    },
  },
  watch: {
    page() {
      console.log(this.page)
      this.pageNum = this.page ?? 1
    },
  },
  mounted() {
    console.log('this.page ', this.page)
    this.pageNum = this.page ?? 1
  },
  methods: {
    previousPage() {
      if (this.pageNum > 1) {
        this.$emit('prev', --this.pageNum)
      }
    },
    nextPage() {
      if (this.pageNum < this.totalPages) {
        this.$emit('next', ++this.pageNum)
      }
    },
    previousGroup() {
      if (this.currentGroup > 1) {
        this.pageNum -= this.pagesPerGroup
        this.$emit('prev', this.pageNum)
      }
    },
    nextGroup() {
      if (this.currentGroup < this.totalGroups) {
        this.pageNum += this.pagesPerGroup
        this.$emit('next', this.pageNum)
      }
    },
    goto(num) {
      this.$emit('goto', num)
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
