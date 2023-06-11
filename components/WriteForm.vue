<template>
  <v-app id="app">
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <template #activator="{ on, attrs }">
          <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
            글쓰기
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            새 글 쓰기
          </v-card-title>

          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="title"
                    :counter="20"
                    label="제목"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="userName"
                    :counter="12"
                    label="작성자"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-textarea
                    v-model="content"
                    solo
                    name="내용"
                    label="Solo textarea"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-form>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="onClickCreat"> 등록 </v-btn>
            <v-btn text @click="dialog = false"> 취소 </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>
<script>
export default {
  // eslint-disable-next-line no-undef
  props: ['getData'],
  data() {
    return {
      dialog: false,
      valid: false,
      title: '',
      userName: '',
      content: '',
    }
  },
  watch: {
    dialog() {
      if (this.dialog) {
        // eslint-disable-next-line no-useless-return
        return
      } else {
        // eslint-disable-next-line no-sequences
        ;(this.title = ''), (this.userName = ''), (this.content = '')
      }
    },
  },
  methods: {
    // post요청시 바디에 담은 객체는 브라우저에서 "문자로" 변환해서 보내짐.
    // 때문에 body-parser을 통해 문자열을 다시 객체로 바꿔주는 것임.
    async onClickCreat() {
      this.dialog = false
      // post 요청
      await this.$axios.$post('/api/post', {
        user_id: this.userName,
        title: this.title,
        content: this.content,
        create_at: '2023-02-17',
        hit: 74,
      })
      // 새로 get요청
      this.getData()
      // this.$emit('updated-get', true)
    },
  },
}
</script>
<style>
.v-application--wrap {
  min-height: 5vh !important;
  /* max-width: 10% !important; */
}
</style>
