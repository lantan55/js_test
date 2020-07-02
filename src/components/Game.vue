<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <v-col cols="8">
        <h1>Тест по JavaScript</h1>
        <v-card>
          <v-stepper v-model="e1" >
            <v-stepper-header>
              <v-stepper-step v-for="(item, i) in qnty"
                              class="step-custom"
                :key="i"
                :step="i+1"
                color="purple"
                :complete="questions[i].correctAnswer"
              >
              </v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content
                v-for="(item, i) in questions"
                :key="i"
                :step="i+1"
              >
                {{item.correctAnswer}}
                <h2>{{ i + 1 }}.
                  <span>{{ item.header }}</span>
                </h2>
                <v-card
                        v-if="item.body"
                        class="mb-4 mt-4 pa-2 body-desc"
                        color="grey lighten-2"
                >
                  {{ item.body }}
                </v-card>
                  <v-radio-group v-model="selected">
                    <v-radio class="radio mt-0" v-for="(n, i) in item.answers" :key="`${i}-radio`" :value="n.id" :label="n.text" ></v-radio>
                  </v-radio-group>
                <v-btn
                  class="white--text"
                  :color="btn ? 'green' : 'primary'"
                  @click="nextStep(i + 1, item)"
                  :disabled="!selected"
                >
                  {{ btn ? 'Завершить' : 'Ответить' }}
                </v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Game',

    data: () => ({
      e1: 1,
      selected: null,
      questions: [
        {
          correctAnswer: false,
          header: 'Чему равно это выражение?',
          body: '[].push(1,2).unshift(3).join()',
          answers: [
            {
              id: 1,
              text: '3,1'
            },
            {
              id: 2,
              text: '1,2,3'
            },
            {
              id: 3,
              text: '3,1,2'
            },
            {
              id: 4,
              text: 'В коде ошибка.'
            },
          ],
          correct: 1
        },
        {
          correctAnswer: false,
          header: 'Вопрос 2',
          body: 'body',
          answers: [
            {
              id: 1,
              text: '3,1'
            },
            {
              id: 2,
              text: '1,2,3'
            },
            {
              id: 3,
              text: '3,1,2'
            },
            {
              id: 4,
              text: 'В коде ошибка.'
            },
          ],
          correct: 2
        },
        {
          correctAnswer: false,
          header: 'Вопрос 3',
          body: 'body',
          answers: [
            {
              id: 1,
              text: '3,1'
            },
            {
              id: 2,
              text: '1,2,3'
            },
            {
              id: 3,
              text: '3,1,2'
            },
            {
              id: 4,
              text: 'В коде ошибка.'
            },
          ],
          correct: 1
        }
      ]
    }),
    computed: {
      qnty() {
        return this.questions.length
      },
      btn(){
        return this.questions.length == this.e1
      },

    },
    methods: {
      nextStep(n, item){
        if(item.correct === this.selected){
          this.questions[n - 1].correctAnswer = true
        }
        if(this.e1 === this.questions.length)
          console.log('Тест завершен')
        else
          this.e1 = n + 1
        this.selected = null
      }
    }
  }
</script>
<style lang="scss" scoped>
  h2{
    font-size: 20px;
    text-align: left;
    span{
      font-size: 18px;
      font-weight: normal;
    }
  }
  .body-desc{
    text-align: left;
  }
  .v-stepper__header {
    justify-content: flex-start;
    .v-stepper__step {
      padding: 10px 0 10px 10px;
    }
  }


</style>
