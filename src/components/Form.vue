<template>
    <v-row >
        <v-form >
            <v-container>
                <v-row>
                    <v-col
                            cols="12"
                            md="4"
                    >
                        <v-text-field
                                v-model="form.name"
                                label="First name"
                                required
                        ></v-text-field>
                    </v-col>

                    <v-col
                            cols="12"
                            md="4"
                    >
                        <v-text-field
                                v-model="form.lastname"
                                label="Last name"
                                required
                        ></v-text-field>
                    </v-col>

                    <v-col
                            cols="12"
                            md="4"
                    >
                        <v-text-field
                                v-model="form.email"
                                label="E-mail"
                                required
                        ></v-text-field>
                    </v-col>
                    <v-btn @click="sendForm">Отправить</v-btn>
                </v-row>
            </v-container>
        </v-form>
    </v-row>
</template>
<script>
import firebase from 'firebase/app'

export default {
    name: 'Game',
    components: {

    },

    data: () => ({
        form: {
            name: null,
            lastname: null,
            email: null,
        }

    }),
    methods: {

        sendForm(){
            const query = {
                name: this.form.name,
                lastname: this.form.lastname,
                email: this.form.email
            }
            const questionList = firebase.database().ref(`/questions`)
            const newPostRef = questionList.push();
            newPostRef.set(query, function(error) {
                if (error) {
                    console.warn('Ошибка загрузки данных', error)
                } else {
                    console.log('Вопрос успешно добавлен в базу')
                }
            })

        },
    }
}
</script>
<style>

</style>