<template>
<v-col cols="12" >
      <v-btn @click.stop="dialog = true">Добавить вопрос</v-btn>
      <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
          scrollable
      >
        <v-card >
          <v-toolbar
              flat
              dark
              color="primary"

              dense
          >
            <v-toolbar-title>Добавление нового вопроса</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                icon
                dark
                @click="dialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-form >
              <v-row >
                <v-col
                    cols="6"
                >
                  <v-text-field
                      v-model="form.name"
                      label="Заголовок"
                      required
                      outlined
                      dense
                  ></v-text-field>
                  <v-textarea
                      v-model="form.body"
                      name="input-7-1"
                      label="Описание"
                      auto-grow
                      outlined
                  ></v-textarea>
                  <v-select
                      v-model="langs_select"
                      :items="langs"
                      label="Язык"
                      outlined
                      dense
                      auto-select-first
                      item-disabled
                  ></v-select>
                  <v-btn @click="sendForm" color="success">Отправить</v-btn>
                </v-col>
                <v-col
                    cols="6"
                >
                  <v-textarea
                      v-model="answer"
                      clearable
                      rows="2"
                      no-resize
                      label="Добавить ответ"
                      outlined
                  ></v-textarea>
                  <v-btn color="primary" @click="addAnswer">
                    Добавить ответ
                  </v-btn>
                  <ol сlass="ma-2">
                    <li v-for="(item, i) in form.answers" :key="i">
                      {{item.text}}
                    </li>
                  </ol>
                  <v-select
                      v-model="correct"
                      :items="form.answers"
                      label="Правильный ответ"
                      outlined
                      dense
                      auto-select-first
                      item-disabled=""
                  ></v-select>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
</v-col>
</template>
<script>
    import firebase from 'firebase/app'

    export default {
        name: 'Game',
        data: () => ({
            dialog: false,
            form: {
                name: null,
                body: null,
                answers:[],
            },
            langs_select: [],
            langs: [
                {
                    text: 'JavaScript', value: 'js'
                },
                {
                    text: 'TypeScript', value: 'ts'
                },
                {
                    text: 'CSS', value: 'css'
                },
                {
                    text: 'HTML', value: 'html'
                },
                {
                    text: 'Vue', value: 'vue'
                },
                {
                    text: 'React', value: 'react'
                },
                {
                    text: 'Angular', value: 'angular'
                },
            ],
            answer: '',
            correct: []
        }),
        methods: {
            sendForm(){
                const questionList = firebase.database().ref(`/questions`)
                const newPostRef = questionList.push();
                newPostRef.set({
                    name: this.form.name,
                    body: this.form.body,
                    langs_preffix: this.langs_select,
                    answers: this.form.answers
                }, e => {
                    e ? console.warn('Ошибка загрузки данных', e) : console.log('Данные успешно загружены')

                })
                const uid = newPostRef.key
                const correctAnswer = firebase.database().ref('/correct_list')
                const newAnswer = correctAnswer.push();
                newAnswer.set({
                    value: this.correct,
                    question_id: uid
                }, e => {
                    e ? console.warn('Ошибка загрузки данных', e) : console.log('Данные успешно загружены', uid)
                })
            },
            addAnswer(){
                if(this.answer)
                  this.form.answers.push({text: this.answer, value: this.form.answers.length + 1})
                this.answer = ''
            },
        }
    }
</script>
<style>

</style>