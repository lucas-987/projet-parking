<template>
    <layout page-title="Création parking">
        <form>
            <ion-input @ionChange="nameChanged" :value="parking.name" placeholder="Nom"/>
            <ion-text color="danger" v-if="displayNameError">{{ nameError }}</ion-text>

            <ion-input @ionChange="typeChanged" :value="parking.type" placeholder="Type"/>
            <ion-text color="danger" v-if="displayTypeError">{{ typeError }}</ion-text>

            <ion-input @ionChange="capacityChanged" placeholder="Capacité" type="number" :value="parking.capacity"/>
            <ion-text color="danger" v-if="displayCapacityError">{{ capacityError }}</ion-text>

            <ion-select placeholder="Ville" @ionChange="cityChanged" :disabled="true"
                :value="city">
                <ion-select-option v-for="cityIterator in cities" :key="cityIterator.id"
                    :value="cityIterator">
                    {{ cityIterator.name }}
                </ion-select-option>
            </ion-select>

            <ion-button @click="updateParking">Modifier</ion-button>
        </form>
    </layout>
</template>

<script>
import { IonInput, IonButton, IonText, IonSelect, IonSelectOption } from '@ionic/vue'
import City from '../../model/city';
import Parking from '../../model/parking'

import axios from 'axios'

export default {
    components: {
        IonInput,
        IonButton,
        IonText,
        IonSelect,
        IonSelectOption,
    },
    data() {
        return {
            name: "", //normally initialized with value of the parking that is updated
            type: "", // it can probably be done with a component lifecycle function
            capacity: null, // but it will not be done for the moment
                            // it will have to be done latter
                            // it display of message error when you don't touch to an input

            nameError: "",
            typeError: "",
            capacityError: "",

            displayNameError: false,
            displayTypeError: false,
            displayCapacityError: false,
        };
    },
    computed: {
        parkingId() {
            return this.$route.params.parkingId;
        },
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
        updateParking() {
            if(!this.checkFields()) {
                return;
            }

            axios.put(`http://raxk1131.odns.fr/parkings/${this.parkingId}`, {
                name: this.name,
                user_id: this.user.id,
                capacite: this.capacity,
                type: this.type,
            })
            .then(response => {
                console.log(response);
                if(response.status == 200) {
                    for(let parkingResponse of response.data) {
                        if(parkingResponse.name == this.name && parkingResponse.cityId == this.city.id) {
                            this.$store.dispatch('updateParking', {
                                parking: Parking.fromObject(parkingResponse),
                                cityId: this.city.id,
                                parkingId: this.parkingId
                            });
                            this.$router.go(-1);
                            return;
                        }
                    }
                }
                else {
                    //error message
                }
            })
            /*.catch(error => {
                //error message
            })*/;
        },
        checkFields() {
            this.displayNameError = false;
            this.displayTypeError = false;
            this.displayCityError = false;
            this.displayCapacityError = false;

            this.nameError = "";
            this.cityError = "";
            this.typeError = "";
            this.capacityError = "";

            let result = true;

            if(!this.name || !this.name.trim() || this.name.length === 0) {
                this.nameError = "Champs requis";
                this.displayNameError = true;
                result = false;
            }

            if(!this.type || !this.type.trim() || this.type.length === 0) {
                this.typeError = "Champs requis";
                this.displayTypeError = true;
                result = false;
            }

            if(!(this.city instanceof City)) {
                this.cityError = "Valeur invalide";
                this.displayCityError = true;
                result = false;
            }
            if(this.city == null) {
                this.cityError = "Champs requis";
                this.displayCityError = true;
                result = false;
            }

            if(this.capacity <= 0) {
                this.capacityError = "La capacité doit être supérieure à 0.";
                this.displayCapacityError = true;
                result = false;
            }
            if(this.capacity == null) {
                this.capacityError = "Champs requis";
                this.displayCapacityError = true;
                result = false;
            }

            return result;
        },
        nameChanged(event) {
            this.name = event.detail.value;
        },
        typeChanged(event) {
            this.type = event.detail.value;
        },
        capacityChanged(event) {
            this.capacity = parseInt(event.detail.value);
        },
    },
    created() {
        if(!Array.isArray(this.$store.getters.cities) || this.$store.getters.cities.length == 0) {
            this.$store.dispatch("getCities");
        }
    }
}
</script>