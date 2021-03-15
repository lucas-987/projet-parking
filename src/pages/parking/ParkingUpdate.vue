<template>
    <layout page-title="Modification parking">
        <parking-update-form @parkingUpdated="parkingUpdated" :city="city" :cities="cities"
            :parking="parking" :userId="user.id" />
        <!-- user is not supposed to be null here since this page is only accessible 
            to an authenticated admin -->
    </layout>
</template>

<script>
import ParkingUpdateForm from '../../components/parking/ParkingUpdateForm'

export default {
    components: {
        ParkingUpdateForm,
    },
    data() {
        return {
            parkingId: this.$route.params.parkingId
        };
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
        cities() {
            return this.$store.getters.cities;
        },
        city() {
            return this.$store.getters.city(this.$route.params.cityId);
        },
        parking() {
            return this.$store.getters.parking(this.$route.params.cityId, this.parkingId);
        }
    },
    methods: {
        parkingUpdated(parking) {
            this.$store.dispatch('updateParking', {
                parking: parking,
                cityId: this.city.id,
                parkingId: this.parkingId
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