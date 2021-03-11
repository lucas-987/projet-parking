<template>
    <layout page-title="Parking Choice">
        <parking-list :parkings="city.parkings" />
    </layout>
</template>

<script>
import ParkingList from '../../components/parking/ParkingList'

export default {
    components: {
        ParkingList,
    },
    data() {
        return {
            cityId: this.$route.params.id,
        }
    },
    computed: {
        city() {
            return this.$store.getters.city(this.cityId);
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