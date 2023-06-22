<template>
  <v-app id="app">
    <div class="container">
      <form class="formWrapper">
        <label>
          E-mail
          <input v-model="loginData.userEmail" type="email" class="inputEl" />
        </label>
        <label>
          Password
          <input
            v-model="loginData.userPassword"
            type="password"
            class="inputEl"
          />
        </label>
        <button type="submit" class="loginBtn" @click.prevent="onLogin">
          login
        </button>
      </form>
      <div>
        <nuxt-link to="/signup">
          <button type="button" class="signupBtn">회원가입</button>
        </nuxt-link>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'LoginLayout',
  data() {
    return {
      loginData: {
        userEmail: '',
        userPassword: '',
      },
    }
  },
  methods: {
    async onLogin() {
      // api에러시 message제대로 반환x, 이유: 스크립트 오류되서 그냥 중단되서 => 때문에 try catch로 로직 변경
      // const { message } = await this.$axios.$post('/api/login', this.loginData)
      // if(message){}else{}

      try {
        const { message, token } = await this.$axios.$post(
          '/api/login',
          this.loginData
        )

        if (message.includes('success')) {
          alert('로그인 성공')
          window.localStorage.setItem('ACCESS_TOKEN', token)
          this.$router.push('/board/1')
        }
      } catch {
        alert('로그인 실패')
      }
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
.container {
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

.loginBtn {
  background-color: teal;
  padding: 5px 10px;
}

.signupBtn {
  margin-top: 30px;
}
</style>
