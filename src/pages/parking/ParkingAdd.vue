<template>
    <layout page-title="Création parking">
        <parking-create-form @parkingCreated="parkingCreated"
            :cities="cities" :userId="user.id" />
            <!-- user is not supposed to be null here since this page is only accessible 
            to an authenticated admin -->
    </layout>
</template>

<script>
import ParkingCreateForm from '../../components/parking/ParkingCreateForm'

export default {
    components: {
        ParkingCreateForm,
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
        cities() {
            return this.$store.getters.cities;
        }
    },
    methods: {
        parkingCreated(event) {
            this.$store.commit('addParking', {
                parking: event.parking,
                cityId: event.cityId
            });
            this.$router.go(-1);
            return;
                        
        },
    },
    created() {
        if(!Array.isArray(this.$store.getters.cities) || this.$store.getters.cities.length == 0) {
            this.$store.dispatch("getCities");
        }
    }
}
</script>