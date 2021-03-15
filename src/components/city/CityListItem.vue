<template>
    <ion-item>
        {{ city.name }}
        <ion-button @click="deleteCity">delete</ion-button>
    </ion-item>
</template>

<script>
import { IonItem, IonButton, /*IonIcon*/ } from '@ionic/vue'
import axios from 'axios'

export default {
    props: ['city'],
    components: {
        IonItem,
        IonButton,
    },
    methods: {
        deleteCity() {
            axios.delete(`http://raxk1131.odns.fr/city/${this.city.id}`)
                .then(response => {
                    if(response.status == 200) {
                        this.$store.commit('deleteCity', this.city.id);
                    }
                    else {
                        //error message ?
                    }
                })
                /*.catch(error => {
                    //error message ?
                })*/;
        }
    }
}
</script>