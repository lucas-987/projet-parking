<template>
    <layout page-title="Parking Choice">
        <template v-if="user != null && user.userType == 'admin'" v-slot:actions-right>
            <ion-button router-link="/admin/parking/add">
                <h2>+</h2>
                <!--<ion-icon slot="icon-only" :icon="add"></ion-icon>-->
            </ion-button>
        </template>
        <parking-list :parkings="city.parkings" />
    </layout>
</template>

<script>
import { IonButton } from '@ionic/vue'
import ParkingList from '../../components/parking/ParkingList'

export default {
    components: {
        ParkingList,
        IonButton,
    },
    data() {
        return {
            cityId: this.$route.params.id,
        }
    },
    computed: {
        city() {
            return this.$store.getters.city(this.cityId);
        },
        user() {
            return this.$store.getters.user;
        }
    },
    created() {
        //TODO do this only the first time => check if there is already
        //parkings in the city (will probably do that in the store)
        //check if it's a good practice
        this.$store.dispatch("getCityParkings", this.cityId);
    }    
}
</script>