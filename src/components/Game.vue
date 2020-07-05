<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <v-col cols="8">
        <h1>Тест по JavaScript</h1>
        <v-card>
          <v-card-title>
            test
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
            <div
                    v-for="(item, i) in 2"
                    :key="i"
                    :step="i+1"
            >
              <Timer ref="timer" @time-out="checkAnswer(selected, item)"/>
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
                <div v-for="(n, i) in item.answers" :key="`${i}-radio`">
                  <v-radio  class="radio mt-0 success--text" color="primary"  :disabled="disabled" :value="n.id" >
                    <template v-slot:label>
                      <span :class="{ 'success--text' : n.tips && showResult }">{{n.text}}</span>
                    </template>
                  </v-radio>
                  <span class="tip" v-if="n.tips && showResult">
                      {{ n.tips }}
                    </span>
                </div>


              </v-radio-group>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn
                    class="white--text  ma-2"
                    :color="btn ? 'green' : 'primary'"
                    @click="answer(item)"
                    :disabled="disabled"

            >
              {{ btn ? 'Завершить' : 'Ответить' }}
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
  import axios from 'axios'

  export default {
    name: 'Game',
    components: {
      Timer: () => import('../components/Timer')
    },
    data: () => ({
      e1: 1,
      selected: null,
      value: 100,
      disabled: false,
      showResult: false,
      questions: []
    }),
    mounted() {
      axios
        .get(`./src/static/db.json`)
        .then(response => (console.log(response.data)))
        .catch((e) => console.log(e))
    },
    watch: {

    },
    computed: {

      qnty() {
        return this.questions.length
      },
      btn(){
        return this.questions.length == this.e1
      },
    },

    methods: {


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





