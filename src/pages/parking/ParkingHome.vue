<template>
    <layout page-title="Parking - Choose a city">
        <template v-if="user != null && user.userType == 'admin'" v-slot:actions-right>
            <ion-button router-link="/admin/parking/add">
                <h2>+</h2>
                <!--<ion-icon slot="icon-only" :icon="add"></ion-icon>-->
            </ion-button>
        </template>

        <ion-select placeholder="Cities" @ionChange="changeSelectedCity">
            <ion-select-option v-for="city in cities" :key="city.id"
                :value="city.id">
                {{ city.name }}
            </ion-select-option>
        </ion-select>
        <ion-button :router-link="`${linkRoot}${selectedCityId}`" :disabled="showButton">
            OK
        </ion-button>
    </layout>
</template>

<script>
import { IonSelect, IonSelectOption, IonButton } from '@ionic/vue'

export default {
    data() {
        return {
            selectedCityId: 'null',
        } 
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
        cities() { 
            return this.$store.getters.cities;
        },
        showButton() {
            return this.selectedCityId == 'null' ? true : false;
        },
        linkRoot() {
            let user = this.$store.getters.user;
            if(user != null && user.userType == 'admin') {
                return "/admin/parking/";
            }

            return "/parking/";
        }
    },
    components: {
        IonSelect,
        IonSelectOption,
        IonButton
    },
    methods: {
        changeSelectedCity(event) {
            this.selectedCityId = event.detail.value;
        }
    },
    created() {
        if(!Array.isArray(this.$store.getters.cities) || this.$store.getters.cities.length == 0) {
            this.$store.dispatch("getCities");
        }
    }
}
</script>