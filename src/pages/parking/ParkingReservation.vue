<template>
    <layout page-title="Parking Reservation">
        <ion-img src="" alt="" />
        <h2>{{ parking.name }}</h2>
        <span>Places disponibles : {{ parking.availablePlaces }}</span>
        <div v-if="user != null && user.userType == 'admin'">
            <ion-button :router-link="`/admin/parking/update/${cityId}/${parkingId}`">modifier</ion-button>
            <ion-button @click="suppressParking">supprimer</ion-button>
        </div>
        <parking-reservation-form v-else @parkingReserved="parkingBooked" :buttonState="buttonState"
            :userId="userId" :parkingId="parkingId" />
    </layout>
</template>

<script>
import { IonButton, IonImg } from "@ionic/vue"
import ParkingReservationForm from '../../components/parking/ParkingReservationForm';

import axios from "axios"

export default {
    components: {
        ParkingReservationForm,
        IonButton,
        IonImg,
    },
    data() {
        return {
            parkingId: this.$route.params.parkingId,
            cityId: this.$route.params.cityId,
        }
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
        parking() {
            return this.$store.getters.parking(this.cityId, this.parkingId); 
        },
        buttonState() {
            if(this.user == null) {
                return {
                    disabled: false,
                    message: "Connectez-vous pour réserver",
                    color: "primary",
                    redirectToLogin: true,
                };
            }

            for(let reservation of this.parking.reservations) {
                if(reservation.userId == this.user.id) {
                    return {
                        disabled: true,
                        message: "Parking réservé",
                        color: "success",
                        redirectToLogin: false,
                    };
                }
            }

            //normally we should check the places at the given date
            if(this.parking.availablePlaces <= 0) {
                return {
                    disabled: true,
                    message: "Parking plein",
                    color: "danger",
                    redirectToLogin: false,
                };
            }

            return {
                disabled: false,
                message: "Réserver",
                color: "primary",
                redirectToLogin: false,
            };
        },
    },
    methods: {
        suppressParking() {
            axios.delete(`http://raxk1131.odns.fr/parkings/${this.parkingId}`)
                .then(response => {
                    if(response.status == 200) {
                        this.$store.commit("deleteParking", {
                            cityId: this.cityId,
                            parkingId: this.parkingId
                        });

                        this.$router.go(-1);
                    }
                    else {
                        //error message
                    }
                })
                /*.catch(error => {
                    //error message
                })*/;
        },
        parkingBooked(reservation) { 
            this.parking.reservations.push(reservation);
            this.parking.availablePlaces--; 
            this.$router.go(-1);
        },
    }
}
</script>

<style scoped>

</style>