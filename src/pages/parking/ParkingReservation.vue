<template>
    <layout page-title="Parking Reservation">
        <ion-img src="" alt="" />
        <h2>{{ parking.name }}</h2>
        <span>Places disponibles : {{ parking.capacity }}</span>
        <ion-button expand="block">Connectez-vous pour réserver</ion-button>
    </layout>
</template>

<script>
import { IonImg, IonButton } from "@ionic/vue"

export default {
    components: {
        IonImg,
        IonButton
    },
    data() {
        return {
            parkingId: this.$route.params.parkingId,
            cityId: this.$route.params.cityId,
        }
    },
    computed: {
        parking() {
            return this.$store.getters.parking(this.cityId, this.parkingId); 
        }
    }
}
</script>

<style scoped>

</style>