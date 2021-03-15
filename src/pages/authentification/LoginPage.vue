<template>
    <layout page-title="Login">
        <form>
            <ion-input @ionChange="inputChanged" placeholder="Nom d'utilisateur"
                 type="text" id="login" />
            <ion-text color="danger" v-if="displayLoginError">{{ loginError }}</ion-text>

            <ion-input @ionChange="inputChanged" placeholder="Mot de passe" 
                type="password" id="password" />
            <ion-text color="danger" v-if="displayPasswordError">{{ passwordError }}</ion-text>

            <ion-button @click.prevent="buttonClicked" :disabled="showButton">
                Connexion
            </ion-button>
        </form>
    </layout>
</template>

<script>
import { IonInput, IonButton, IonText } from '@ionic/vue'
import axios from 'axios'
import User from '../../model/user'

export default {
    components: {
        IonInput,
        IonButton,
        IonText
    },
    data() {
        return {
            login: null,
            password: null,

            passwordError: "",
            loginError: "",
            displayLoginError: false,
            displayPasswordError: false,
        };
    },
    methods: {
        buttonClicked() {
            this.resetError();
            if(!this.checkFields()) {
                return;
            }

            axios.post('http://raxk1131.odns.fr/login', {
                username: this.login,
                password: this.password
            })
            .then(response => {
                if(response.data.connected) {
                    let user = User.fromObject(response.data);
                    this.$store.commit('setUser', user);
                    user.userType == 'admin' ? this.$router.replace('/admin') : this.$router.go(-1);
                }
                else {
                    //display error message
                }
            })
            .catch(error => {
                console.log(error);
                //display error message
            });
        },
        inputChanged(event) {
            let inputId = event.target.id;
            let value = event.detail.value;

            switch(inputId) {
                case "login":
                    this.login = value;
                    break;
                case "password":
                    this.password = value;
                    break;        
            }
        },

        checkFields() {
            let result = true;

            if(/\s/.test(this.login)) {
                this.loginError = "Les espaces ne sont pas autorisés";
                this.displayLoginError = true;
                result = false;
            }
            else if(!this.login || !this.login.trim() || this.login.length === 0) {
                this.loginError = "Champs requis";
                this.displayLoginError = true;
                result = false;
            }
            
            if(/\s/.test(this.password)) {
                this.passwordError = "Les espaces ne sont pas autorisés";
                this.displayPasswordError = true;
                result = false;
            }
            else if(!this.password || !this.password.trim() || this.password.length === 0) {
                this.passwordError = "Champs requis";
                this.displayPasswordError = true;
                result = false;
            }

            return result;
        },
        resetError() {
            this.displayLoginError = false;
            this.displayPasswordError = false;
            this.loginError = "";
            this.passwordError = "";
        }
    }
}
</script>