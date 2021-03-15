<template>
    <layout page-title="Logout">
        <ion-button @click="logout">Log out</ion-button>
    </layout>
</template>

<script>
import { IonButton } from '@ionic/vue'

export default {
    components: {
        IonButton,
    },
    methods: {
        logout() {
            this.$store.commit('setUser', null);
            this.$router.replace("/parking");
        }
    }
}
</script>