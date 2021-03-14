<template>
    <ion-item :router-link="`${linkRoot}reservation/${parking.cityId}/${parking.id}`">  
        <ion-thumbnail slot="start">  
            <ion-img :src="parking.img" :alt="parking.name" />
        </ion-thumbnail>
        {{ parking.name }}
    </ion-item>
</template>

<script>
import { IonItem, IonImg, IonThumbnail } from '@ionic/vue';

export default {
    props: ["parking"],
    components: {
        IonItem,
        IonImg,
        IonThumbnail
    },
    computed: {
        linkRoot() {
            let user = this.$store.getters.user;
            if(user != null && user.userType == 'admin') {
                return "/admin/parking/";
            }

            return "/parking/";
        }
    }
}
</script>