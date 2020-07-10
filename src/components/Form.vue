<template>
  <v-col cols="12">
    <v-btn @click.stop="dialog = true">Добавить вопрос</v-btn>
    <v-dialog
      v-model="dialog"
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card>
        <v-toolbar flat dark color="primary" dense>
          <v-toolbar-title>Добавление нового вопроса</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="form.name"
                  label="Заголовок"
                  required
                  outlined
                  clearable
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
                ></v-select>
                <v-text-field
                  v-model="answer"
                  clearable
                  label="Добавить ответ"
                  outlined
                  dense
                ></v-text-field>
                <v-btn color="primary" @click="addAnswer">
                  Добавить ответ
                </v-btn>
              </v-col>
              <v-col cols="6">
                <h2>Варианты ответов:</h2>
                <ol>
                  <li v-for="(item, i) in form.answers" :key="i">
                    {{ item.text }}
                    <v-btn
                      @click="removeAnswer(i)"
                      class="ml-4"
                      color="red"
                      icon
                      x-small
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </li>
                </ol>
                <v-select
                  class="mt-2"
                  v-model="correct"
                  :items="form.answers"
                  label="Правильный ответ"
                  outlined
                  dense
                  auto-select-first
                  item-disabled=""
                  :disabled="form.answers.length === 0"
                ></v-select>
              </v-col>
              <v-col cols="12" class="d-flex justify-center">
                <v-btn :disabled="!validate" @click="sendForm" color="success"
                  >Отправить</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-col>
</template>
<script>
import firebase from 'firebase/app';

export default {
  name: 'Game',
  data: () => ({
    dialog: true,
    form: {
      name: null,
      body: null,
      answers: [],
    },
    langs_select: null,
    langs: [
      {
        text: 'JavaScript',
        value: 'js',
      },
      {
        text: 'TypeScript',
        value: 'ts',
      },
      {
        text: 'CSS',
        value: 'css',
      },
      {
        text: 'HTML',
        value: 'html',
      },
      {
        text: 'Vue',
        value: 'vue',
      },
      {
        text: 'React',
        value: 'react',
      },
      {
        text: 'Angular',
        value: 'angular',
      },
    ],
    answer: '',
    correct: null,
  }),
  computed: {
    validate() {
      return (
        this.form.name &&
        this.form.answers.length > 1 &&
        this.correct &&
        this.langs_select
      );
    },
  },
  methods: {
    sendForm() {
      const questionList = firebase.database().ref(`/questions`);
      const newPostRef = questionList.push();
      newPostRef.set(
        {
          name: this.form.name,
          body: this.form.body,
          langs_preffix: this.langs_select,
          answers: this.form.answers,
        },
        (e) => {
          e
            ? console.warn('Ошибка загрузки данных', e)
            : console.log('Данные успешно загружены');
        },
      );
      const uid = newPostRef.key;
      const correctAnswer = firebase.database().ref('/correct_list');
      const newAnswer = correctAnswer.push();
      newAnswer.set(
        {
          value: this.correct,
          question_id: uid,
        },
        (e) => {
          e
            ? console.warn('Ошибка загрузки данных', e)
            : console.log('Данные успешно загружены', uid);
        },
      );
    },
    addAnswer() {
      const ans = this.answer.trim();
      if (ans) {
        this.form.answers.push({
          text: ans,
          value: this.form.answers.length + 1,
        });
      }
      this.answer = '';
    },
    removeAnswer(index) {
      this.form.answers.splice(index, 1);
    },
  },
};
</script>
<style></style>
