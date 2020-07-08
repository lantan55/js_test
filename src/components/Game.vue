<template>
  <v-container class="fill-height" >
    <v-row class="text-center" justify="center" >
      <v-col cols="8">
        <div v-if="questionsList.length === 0">
          <h1>Выберите вариант теста:</h1>
          <v-row>
            <v-col cols="4" v-for="(item, index) in langs" :key="index">
              <v-btn block outlined class="" color="primary"  @click="startTest(item.name, item.id)">
                {{item.name}}
              </v-btn>
            </v-col>
          </v-row>
        </div>

        <v-card v-else>
          <div class="d-flex flex-row-reverse">
            <v-btn class="mt-2 mr-2" color="red" small @click="clearTest" outlined>Выйти</v-btn>
          </div>
          <v-card-title>
            {{header}}

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
            <div >
              <Timer ref="timer" @time-out="checkAnswer(selected, question)"/>
              <h2>тест.
                <span>тест</span>
              </h2>
              <v-card

                      class="mb-4 mt-4 pa-2 body-desc"
                      color="grey lighten-2"
              >
                тест
              </v-card>
              <v-radio-group v-model="selected">
<!--                <div v-for="(n, i) in question.answers" :key="`${i}-radio`">-->
<!--                  <v-radio  class="radio mt-0 success&#45;&#45;text" color="primary"  :disabled="disabled" :value="n.id" >-->
<!--                    <template v-slot:label>-->
<!--                      <span :class="{ 'success&#45;&#45;text' : n.tips && showResult }">{{n.text}}</span>-->
<!--                    </template>-->
<!--                  </v-radio>-->
<!--                  <span class="tip success lighten-1 white&#45;&#45;text" v-if="n.tips && showResult">-->
<!--                      {{ n.tips }}-->
<!--                  </span>-->
<!--                </div>-->
              </v-radio-group>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
                    class=" ma-2"
                    color="primary"
                    @click="answer(question)"
                    :disabled="disabled"
            >
              Ответить
            </v-btn>
            <v-btn color="primary ma-2" :disabled="!disabled">
              Далее
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { db } from '../static/db'

  export default {
    name: 'Game',
    components: {
      Timer: () => import('../components/Timer')
    },

    data: () => ({
      header:'',
      langs: null,
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
    firestore: {
      langs: db.collection('langs')
    },

    mounted() {
    },
    watch: {
    },
    computed: {
    },

    methods: {
      startTest(name, id){
        this.header = name
        this.questionsList = this.getQuestionsList(id)
        this.questionsList.forEach( item => item.header)
        console.log('questionList', this.questionsList)
        console.log('forEach', this.questionsList.forEach( item => item.header))
        this.getQuestion()
      },
      getQuestionsList(id){
        let res = []
        db
                .collection("tests")
                .where("lang_id", "==", id)
                .get()
                .then(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {
                      const data = {
                          header: doc.data().header
                      }
                    res.push(data)
                  });
                })
                .catch(function(error) {
                  console.log("Error getting documents: ", error);
                });
        return res
      },
      getQuestion(){
          // console.log(this.questionsList)
      },
      timerOff(){
        this.disabled = true
        this.showResult = true
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
      checkAnswer(id, item){
        console.log(id, item)
        if(id){
          if(item.answers[id - 1].correct){
            console.log('Вы правильно ответили')
          }else{
            console.log('Ответ не верный')
          }
        }else{
          console.log('Нет ответа')
        }
        this.showResult = true
      },
      clearTest(){
          let q = confirm('Вы действительно хотите завершить тест?')
          if(q){
              this.answersList = null
          }

      }
    }
  }
</script>
<style lang="scss" scoped>
  h2{
    margin-top:10px;
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
  span.tip{
    display: block;
    padding: 5px;
    margin-bottom: 15px;
    width: 100%;
    border: 1px solid #000;
    font-size: 12px;
  }




</style>





