<template>
  <v-container class="fill-height" >
    <v-row class="text-center" justify="center" >
      <v-col cols="8">
        <div v-if="question === null">
          <v-row>
            <v-col cols="4">
              <v-btn block outlined class="" color="primary"  @click="startTest()">
                1
              </v-btn>
            </v-col>
          </v-row>
          <h1>Выберите вариант теста:</h1>

        </div>
        <v-card v-else>
          <v-card-title>
            JavaScript. Уровень 1
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
              <h2>{{ question.id }}.
                <span>{{ question.header }}</span>
              </h2>
              <v-card
                      v-if="question.body"
                      class="mb-4 mt-4 pa-2 body-desc"
                      color="grey lighten-2"
              >
                {{ question.body }}
              </v-card>
              <v-radio-group v-model="selected">
                <div v-for="(n, i) in question.answers" :key="`${i}-radio`">
                  <v-radio  class="radio mt-0 success--text" color="primary"  :disabled="disabled" :value="n.id" >
                    <template v-slot:label>
                      <span :class="{ 'success--text' : n.tips && showResult }">{{n.text}}</span>
                    </template>
                  </v-radio>
                  <span class="tip success lighten-1 white--text" v-if="n.tips && showResult">
                      {{ n.tips }}
                  </span>
                </div>


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
  // const db = require('../static/db.json')
  import { db } from '../main'
  // const answers = require('../static/db_ans.json')


  class Test {
    // constructor(props) {
    //   this.id = props.id
    //   this.name = props.name
    // }

    getLangAll(){

      return db.collection('tests')
              .get()
              .then(querySnapshot => {
                const document = querySnapshot.docs.map(doc => doc.data())
                console.log(document)
              })

    }
    getLang(id){

        db.collection('tests')
              .doc(id)
              .get()
              .then(snapshot => {
                return  snapshot.data()
              })

    }

  }

  const test = new Test()
  export default {
    name: 'Game',
    components: {
      Timer: () => import('../components/Timer')
    },

    data: () => ({
      lang: [],
      test: null,
      el: 0,
      selected: null,
      value: 100,
      disabled: false,
      showResult: false,
      question: null,
      answers: []
    }),

    mounted() {
      test.getLangAll()
      console.log('mounted', test.getLangAll())
      test.getLang('wSquTpcqZkTbdQKryKYR' )
    },
    watch: {

    },
    computed: {

    },

    methods: {
      startTest(value){
        console.log(this.test)
        this.test = db[value]
      },
      timerOff(){
        this.disabled = true
        this.showResult = true
      },
      answer(item){
        if(this.selected){
          const arr = item
          this.$refs.timer[0].stopTimer()
          this.disabled = true
          console.log('таймер стоп')
          this.checkAnswer(this.selected, arr)
        }
      },
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





