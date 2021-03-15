<template>
    <layout page-title="Création ville">
        <form>
            <ion-input @ionChange="nameChanged" placeholder="Nom"/>
            <ion-text color="danger" v-if="displayNameError">{{ nameError }}</ion-text>
            <ion-button @click="createCity">Ajouter</ion-button>
        </form>
    </layout>
</template>

<script>
import { IonInput, IonButton, IonText } from '@ionic/vue'
import City from '../../model/city'

import axios from 'axios'

export default {
    components: {
        IonInput,
        IonButton,
        IonText,
    },
    data() {
        return {
            name: "",
            nameError: "",
            displayNameError: false,
        };
    },
    methods: {
        createCity() {
            if(!this.checkFields()) {
                return;
            }

            axios.post('http://raxk1131.odns.fr/city', {
                city: this.name
            })
            .then(response => {
                if(response.status == 200) {
                    for(let cityResponse of response.data) {
                        if(cityResponse.city == this.name) {
                            this.$store.commit('addCity', City.fromObject(cityResponse));
                            this.$router.go(-1);
                            return;
                        }
                    }
                }
                else {
                    //error message
                }
            })
            /*.catch(error => {
                //error message
            })*/;
        },
        checkFields() {
            this.displayNameError = false;
            this.nameError = "";

            let result = true;

            if(!this.name || !this.name.trim() || this.name.length === 0) {
                this.nameError = "Champs requis";
                this.displayNameError = true;
                result = false;
            }

            return result;
        },
        nameChanged(event) {
            this.name = event.detail.value;
        },
    }
}
</script>