<template>
  <h5>bulletin board</h5>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      bulletinLIst: [],
    }
  },
  mounted() {
    fetch('/api')
      .then((res) => res.json())
      .then((res) => {
        console.log('res', res)
      })
  },
}
</script>
