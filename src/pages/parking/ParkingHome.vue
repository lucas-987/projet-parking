<template>
    <layout page-title="Parking - Choose a city">
        <ion-select placeholder="Cities" @ionChange="changeSelectedCity">
            <ion-select-option v-for="city in cities" :key="city.id"
                :value="city.id">
                {{ city.name }}
            </ion-select-option>
        </ion-select>
        <ion-button :router-link="`/parking/${selectedCityId}`" :disabled="showButton">
            OK
        </ion-button>
    </layout>
</template>

<script>
import { IonSelect, IonSelectOption, IonButton } from '@ionic/vue'

export default {
    data() {
        return {
            selectedCityId: 'null',
        } 
    },
    computed: {
        cities() { 
            return this.$store.getters.cities;
        },
        showButton() {
            return this.selectedCityId == 'null' ? true : false;
        }
    },
    components: {
        IonSelect,
        IonSelectOption,
        IonButton
    },
    methods: {
        changeSelectedCity(event) {
            this.selectedCityId = event.detail.value;
        }
    },
    created() {
        this.$store.dispatch("getCities");
    }
}
</script>