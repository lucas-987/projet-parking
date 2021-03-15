<template>
    <form>
            <ion-input @ionChange="checkinDateChanged" placeholder="date début"/>
            <ion-text color="danger" v-if="displayCheckinDateError">{{ checkinDateError }}</ion-text>
            <ion-input @ionChange="checkinHourChanged" placeholder="heure début"/>
            <ion-text color="danger" v-if="displayCheckinHourError">{{ checkinHourError }}</ion-text>
            
            <ion-input @ionChange="checkoutDateChanged" placeholder="date fin"/>
            <ion-text color="danger" v-if="displayCheckoutDateError">{{ checkoutDateError }}</ion-text>
            <ion-input @ionChange="checkoutHourChanged" placeholder="heure fin"/>
            <ion-text color="danger" v-if="displayCheckoutHourError">{{ checkoutHourError }}</ion-text>
            
            <ion-input @ionChange="licensePlateChanged" placeholder="plaque d'immactriculation"/>
            <ion-text color="danger" v-if="displayLicensePlateError">{{ licensePlateError }}</ion-text>

            <ion-select @ionChange="vehicleTypeChanged" placeholder="Type véhicule">
                <ion-select-option value="VOITURE">Voiture</ion-select-option>
                <ion-select-option value="BUS">Bus</ion-select-option>
            </ion-select>
            <ion-text color="danger" v-if="displayVehicleTypeError">{{ vehicleTypeError }}</ion-text>

            <ion-button @click.prevent="buttonClicked" :disabled="buttonState.disabled"
                :color="buttonState.color" expand="block">
                {{ buttonState.message }}
            </ion-button>
        </form>
</template>

<script>
import { IonButton, IonInput, IonSelect, IonSelectOption } from "@ionic/vue"

import Reservation from '../../model/reservation'

import axios from 'axios'

export default {
    props: ['buttonState', 'userId', 'parkingId'],
    components: {
        IonButton,
        IonInput,
        IonSelect,
        IonSelectOption
    },
    data() {
        return {
            checkinDate: null,
            checkinHour: null,
            checkoutDate: null,
            checkoutHour: null,
            licensePlate: null,
            vehicleType: null,

            displayCheckinDateError: false,
            displayCheckinHourError: false,
            displayCheckoutDateError: false,
            displayCheckoutHourError: false,
            displayLicensePlateError: false,
            displayVehicleTypeError: false,

            checkinDateError: "",
            checkinHourError: "",
            checkoutDateError: "",
            checkoutHourError: "",
            licensePlateError: "",
            vehicleTypeError: "",
        };
    },
    computed: {
        checkinDateTime() {
            return this.checkinDate + "T" + this.checkinHour
        },
        checkoutDateTime() {
            return this.checkoutDate + "T" + this.checkoutHour;
        },
    },
    methods: {
        buttonClicked() {
            if(this.buttonState.redirectToLogin) {
                this.$router.push("/login");
                return;
            }

            if(!this.checkFields()) {
                return;
            }

            axios.post(`http://raxk1131.odns.fr/parkings/${this.parkingId}/reservations`, {
                user_id: this.userId,
                vehicle: this.vehicleType,
                licensePlate: this.licensePlate,
                checkin: this.checkinDateTime,
                checkout: this.checkoutDateTime
            })
            .then(response => {
                if(response.status == 200) {
                    let newReservation = new Reservation(
                        new Date().getMilliseconds(), //we should do like in the other forms and get the id from what is returned by the api
                        this.userId,
                        this.parkingId,
                        new Date(this.checkinDateTime),
                        new Date(this.checkoutDateTime),
                        this.vehicleType,
                        this.licensePlate
                    ) 

                    this.$emit('parkingReserved', newReservation);
                }
                else {
                    //error message
                }
            }) 
            /*.catch(error => {
                //error message
            });*/
        },

        checkFields() {
            this.displayCheckinDateError = false;
            this.displayCheckinHourError = false;
            this.displayCheckoutDateError = false;
            this.displayCheckoutHourError = false;
            this.displayLicensePlateError = false;
            this.displayVehicleTypeError = false;

            let result = true;

            if(!this.vehicleType || !this.vehicleType.trim() || this.vehicleType.length === 0) {
                this.vehicleTypeError = "Champs requis";
                this.displayVehicleTypeError = true;
                result = false;
            }

            if(!this.licensePlate || !this.licensePlate.trim() || this.licensePlate.length === 0) {
                this.licensePlateError = "Champs requis";
                this.displayLicensePlateError = true;
                result = false;
            }

            if(Number.isNaN(Date.parse(this.checkinDateTime))) {
                this.checkinDateError = "Date ou heure invalide, essayez avec ce format : yyyy-mm-dd";
                this.displayCheckinDateError = true;
                
                this.checkinHourError = "Date ou heure invalide, essayez avec ce format : hh:mm";
                this.displayCheckinHourError = true;
                
                result = false;
            }
            if(!this.checkinDate || !this.checkinDate.trim() || this.checkinDate.length === 0) {
                this.checkinDateError = "Champs requis";
                this.displayCheckinDateError = true;
                result = false;
            }
            if(!this.checkinHour || !this.checkinHour.trim() || this.checkinHour.length === 0) {
                this.checkinHourError = "Champs requis";
                this.displayCheckinHourError = true;
                result = false;
            }

            if(Number.isNaN(Date.parse(this.checkoutDateTime))) {
                this.checkoutDateError = "Date ou heure invalide, essayez avec ce format : yyyy-mm-dd";
                this.displayCheckoutDateError = true;
                
                this.checkoutHourError = "Date ou heure invalide, essayez avec ce format : hh:mm";
                this.displayCheckoutHourError = true;
                
                result = false;
            }
            if(!this.checkoutDate || !this.checkoutDate.trim() || this.checkoutDate.length === 0) {
                this.checkoutDateError = "Champs requis";
                this.displayCheckoutDateError = true;
                result = false;
            }
            if(!this.checkoutHour || !this.checkoutHour.trim() || this.checkoutHour.length === 0) {
                this.checkoutHourError = "Champs requis";
                this.displayCheckoutHourError = true;
                result = false;
            }

            return result;
        },

        //TODO do a single methods that handles every input change ?
        checkinDateChanged(event) {
            this.checkinDate = event.detail.value;
        },
        checkinHourChanged(event) {
            this.checkinHour = event.detail.value;
        },
        checkoutDateChanged(event) {
            this.checkoutDate = event.detail.value;
        },
        checkoutHourChanged(event) {
            this.checkoutHour = event.detail.value;
        },
        vehicleTypeChanged(event) {
            this.vehicleType = event.detail.value;
        },
        licensePlateChanged(event) {
            this.licensePlate = event.detail.value;
        }
    }
}
</script>