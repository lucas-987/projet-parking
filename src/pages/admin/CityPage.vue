<template>
    <layout page-title="Villes">
        <template v-slot:actions-right>
            <ion-button router-link="/admin/city/add">
                <h2>+</h2>
                <!--<ion-icon slot="icon-only" :icon="add"></ion-icon>-->
            </ion-button>
        </template>
        <city-list :cities="cities" />
    </layout>
</template>

<script>
import { IonButton } from '@ionic/vue'
import CityList from '../../components/city/CityList';

export default {
    components: {
        CityList,
        IonButton
    },
    computed: {
        cities() {
            return this.$store.getters.cities;
        },
    },
    created() {
        if(!Array.isArray(this.$store.getters.cities) || this.$store.getters.cities.length == 0) {
            this.$store.dispatch("getCities");
        }
    } 
}
</script>