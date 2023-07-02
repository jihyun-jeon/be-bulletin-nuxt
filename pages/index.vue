<template>
  <v-app id="app">
    <div class="formContainer">
      <form class="formWrapper" @submit.prevent="onLogin">
        <label>
          E-mail
          <input
            v-model="loginData.userEmail"
            type="email"
            required
            class="formInputEl"
          />
        </label>
        <label>
          Password
          <input
            v-model="loginData.userPassword"
            type="password"
            required
            class="formInputEl"
          />
        </label>
        <button type="submit" class="formSubmitBtn">login</button>
      </form>
      <div>
        <nuxt-link to="/signup">
          <button type="button" class="goto">회원가입</button>
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
      // const { message } = await this.$axios.$post('/user/login', this.loginData)
      // if(message){}else{}

      try {
        const { message, token, nickname } = await this.$axios.$post(
          '/login',
          this.loginData
        )

        if (message.includes('success')) {
          alert('로그인 성공')

          window.localStorage.setItem('USEREMAIL', nickname)
          window.localStorage.setItem('ACCESS_TOKEN', token)
          this.$router.push('/board/1')
        }
      } catch {
        alert('이메일 또는 비밀번호를 확인해주세요')
      }
    },
  },
}
</script>
<style>
.formContainer {
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
.formInputEl {
  border: 1px solid black;
}

.formSubmitBtn {
  background-color: teal;
  padding: 5px 10px;
}

.goto {
  margin-top: 30px;
}
</style>
