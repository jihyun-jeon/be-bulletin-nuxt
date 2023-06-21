<template>
  <div class="container">
    <form class="formWrapper">
      <label>
        E-mail
        <input v-model="signupData.email" type="email" class="inputEl" />
      </label>
      <label>
        Nickname
        <input v-model="signupData.nickname" type="text" class="inputEl" />
      </label>
      <label>
        Password
        <input v-model="signupData.password" type="password" class="inputEl" />
      </label>
      <button type="submit" class="signupBtn" @click.prevent="onSignup">
        signup
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      signupData: {
        id: null,
        email: '',
        nickname: '',
        password: '',
      },
    }
  },
  methods: {
    async onSignup() {
      const { message } = await this.$axios.$post(
        '/api/signup',
        this.signupData
      )
      if (message.includes('success')) {
        alert('회원가입 성공')
        this.$router.push('/')
      }
    },
  },
}
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
}
.formWrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 300px;
  height: 180px;
  margin-top: 100px;
  border: 1px solid black;
  border-radius: 5%;
}

.inputEl {
  border: 1px solid black;
}

.signupBtn {
  background-color: teal;
  padding: 5px 10px;
}
</style>
