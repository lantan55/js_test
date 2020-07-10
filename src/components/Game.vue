<template>
  <v-container class="fill-height">
    <v-row class="text-center" justify="center">
      <Form />
      <v-col cols="8">
        <div v-if="questionsList && questionsList.length === 0">
          <h1>Выберите вариант теста:</h1>
          <v-row>
            <v-col cols="4" v-for="(item, index) in langs" :key="index">
              <v-btn
                block
                outlined
                class=""
                color="primary"
                @click="startTest(item.name, item.preffix)"
              >
                {{ item.name }}
              </v-btn>
            </v-col>
          </v-row>
        </div>

        <v-card v-else>
          <div class="d-flex flex-row-reverse">
            <v-btn
              class="mt-2 mr-2"
              color="red"
              small
              @click="clearTest"
              outlined
              >Выйти</v-btn
            >
          </div>
          <v-card-title>
            {{ header }}
          </v-card-title>
          <v-card-subtitle>
            <!--            <div-->
            <!--                    v-for="(item, i) in qnty"-->
            <!--                    :key="i"-->
            <!--                    :complete="questions[i].correctAnswer"-->
            <!--            >-->

            <!--            </div>-->
          </v-card-subtitle>
          <v-card-text>
            <div>
              <Timer ref="timer" @time-out="checkAnswer(selected, question)" />
              <h2>
                <span>{{ current + 1 }}.</span>
                {{ questionsList[current].name }}
              </h2>
              <v-card
                class="mb-4 mt-4 pa-2 body-desc"
                color="grey lighten-2"
                v-if="questionsList[current].body"
              >
                {{ questionsList[current].body }}
              </v-card>
              <v-radio-group v-model="selected">
                <div
                  v-for="(n, i) in questionsList[current].answers"
                  :key="`${i}-radio`"
                >
                  <v-radio
                    class="radio mt-0 success--text"
                    color="primary"
                    :disabled="disabled"
                    :value="n.id"
                  >
                    <template v-slot:label>
                      <span :class="{'success--text': n.tips && showResult}">{{
                        n.text
                      }}</span>
                    </template>
                  </v-radio>
                  <span
                    class="tip success lighten-1 white--text"
                    v-if="n.tips && showResult"
                  >
                    {{ n.tips }}
                  </span>
                </div>
              </v-radio-group>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn class="ma-2" color="primary" @click="answer(question)">
              Ответить
            </v-btn>
            <v-btn color="primary ma-2" @click="nextStep">
              Далее
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from 'firebase/app';
import Form from '../components/Form';

export default {
  name: 'Game',

  components: {
    Timer: () => import('../components/Timer'),
    Form,
    // Form: () => import('../components/Form')
  },

  data: () => ({
    langs: [],
    header: '',
    current: 0,
    currentQuestion: [],

    tests: null,
    questionsList: [],
    question: {},
    // answer: null,
    // el: 0,

    selected: null,
    value: 100,
    disabled: false,
    showResult: false,
  }),

  mounted() {
    firebase
      .database()
      .ref('/langs')
      .once('value')
      .then((snapshot) => {
        this.langs = snapshot.val();
      });
  },
  watch: {},
  computed: {},

  methods: {
    startTest(name, preffix) {
      this.header = name;
      this.getQuestionList(preffix);

      // this.currentQuestion = this.questionsList[this.current];
    },
    getQuestionList(preffix) {
      firebase
        .database()
        .ref('/questions')
        .once('value')
        .then((snapshot) => {
          const result = snapshot.val();
          const array = [];
          for (let item in result) {
            result[item].id = item;
            array.push(result[item]);
          }
          this.questionsList = array.filter(
            (item) => item.langs_preffix === preffix,
          );
        });
    },
    nextStep() {
      this.current === this.questionsList.length - 1
        ? console.log('тест закончен')
        : this.current++;
    },
    // getQuestionsList(id){
    //
    //    db
    //       .collection("tests")
    //       .where("lang_id", "==", id)
    //       .get()
    //       .then(function(querySnapshot) {
    //           const result = []
    //           querySnapshot.forEach(function(doc) {
    //               result.push(doc.data())
    //           });
    //           console.log(this.langs)
    //
    //       })
    //       .catch(function(error) {
    //           console.log("Error getting documents: ", error);
    //       })
    //       .finally(function () {
    //           console.log('данные загружены')
    //       })
    // },

    timerOff() {
      this.disabled = true;
      this.showResult = true;
    },
    // answer(item){
    //   if(this.selected){
    //     const arr = item
    //     this.$refs.timer[0].stopTimer()
    //     this.disabled = true
    //     console.log('таймер стоп')
    //     this.checkAnswer(this.selected, arr)
    //   }
    // },
    checkAnswer(id, item) {
      console.log(id, item);
      if (id) {
        if (item.answers[id - 1].correct) {
          console.log('Вы правильно ответили');
        } else {
          console.log('Ответ не верный');
        }
      } else {
        console.log('Нет ответа');
      }
      this.showResult = true;
    },
    clearTest() {
      let q = confirm('Вы действительно хотите завершить тест?');
      if (q) {
        this.questionsList = [];
      }
    },
  },
};
</script>
<style lang="scss" scoped>
h2 {
  margin-top: 10px;
  font-size: 20px;
  text-align: left;
  span {
    font-size: 18px;
    font-weight: normal;
  }
}
.body-desc {
  text-align: left;
}
.v-stepper__header {
  justify-content: flex-start;
  .v-stepper__step {
    padding: 10px 0 10px 10px;
  }
}
span.tip {
  display: block;
  padding: 5px;
  margin-bottom: 15px;
  width: 100%;
  border: 1px solid #000;
  font-size: 12px;
}
</style>
