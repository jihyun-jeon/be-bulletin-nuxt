<template>
  <div class="formContainer">
    <form class="formWrapper" @submit.prevent="onSignup">
      <label>
        E-mail
        <input
          v-model="signupData.email"
          type="email"
          class="formInputEl"
          required
        />
      </label>
      <label>
        Nickname
        <input
          v-model="signupData.nickname"
          type="text"
          class="formInputEl"
          required
        />
      </label>
      <label>
        Password
        <input
          v-model="signupData.password"
          type="password"
          class="formInputEl"
          required
        />
      </label>
      <button type="submit" class="formSubmitBtn">signup</button>
    </form>
    <div>
      <nuxt-link to="/">
        <button type="button" class="goto">로그인</button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
const signupData = {
  id: null,
  email: '',
  nickname: '',
  password: '',
}

export default {
  layout: 'LoginLayout',
  data() {
    return {
      signupData: { ...signupData },
    }
  },
  methods: {
    async onSignup() {
      try {
        const { message } = await this.$axios.$post('/signup', this.signupData)

        if (message.includes('success')) {
          alert('회원가입 성공')
          this.$router.push('/')
        }
      } catch (err) {
        // <api오류일 때>
        // if (this.$axios.isAxiosError(err)) { // [질문] isAxiosError가 false만 나오는 이유?
        if (typeof err.status === 'number') {
          // 500, 409 //
          if (err.status === 500) {
            alert('서버 오류')
            return
          }

          if (err.status === 409) {
            this.signupData = signupData
            alert('이미 존재하는 이메일 입니다.')
            return
          }
        }
        // <try에서 스트립트 오류일 때>
        throw err
      }
    },
  },
}
</script>
