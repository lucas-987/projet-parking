<template>
    <layout page-title="Création parking">
        <form>
            <ion-input @ionChange="nameChanged" placeholder="Nom"/>
            <ion-text color="danger" v-if="displayNameError">{{ nameError }}</ion-text>

            <ion-input @ionChange="typeChanged" placeholder="Type"/>
            <ion-text color="danger" v-if="displayTypeError">{{ typeError }}</ion-text>

            <ion-input @ionChange="capacityChanged" placeholder="Capacité" type="number"/>
            <ion-text color="danger" v-if="displayCapacityError">{{ capacityError }}</ion-text>

            <ion-select placeholder="Ville" @ionChange="cityChanged">
                <ion-select-option v-for="city in cities" :key="city.id"
                    :value="city">
                    {{ city.name }}
                </ion-select-option>
            </ion-select>
            <ion-text color="danger" v-if="displayCityError">{{ cityError }}</ion-text>

            <ion-button @click="createParking">Ajouter</ion-button>
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
            name: "",
            type: "",
            city: null,
            capacity: null,

            nameError: "",
            typeError: "",
            cityError: "",
            capacityError: "",

            displayNameError: false,
            displayTypeError: false,
            displayCityError: false,
            displayCapacityError: false,
        };
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
        createParking() {
            if(!this.checkFields()) {
                return;
            }

            axios.post('http://raxk1131.odns.fr/parkings', {
                name: this.name,
                user_id: this.user.id,
                city: this.city.name,
                capacite: this.capacity,
                type: this.type,
                cityId: this.city.id
            })
            .then(response => {
                if(response.status == 200) {
                    for(let parkingResponse of response.data) {
                        if(parkingResponse.name == this.name && parkingResponse.cityId == this.city.id) {
                            this.$store.commit('addParking', {
                                parking: Parking.fromObject(parkingResponse),
                                cityId: this.city.id
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
        cityChanged(event) {
            this.city = event.detail.value;
        }
    },
    created() {
        if(!Array.isArray(this.$store.getters.cities) || this.$store.getters.cities.length == 0) {
            this.$store.dispatch("getCities");
        }
    }
}
</script>