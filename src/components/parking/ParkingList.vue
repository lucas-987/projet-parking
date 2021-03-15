<template>
    <ion-list>
        <parking-list-item :key="parking.id" v-for="parking in parkings"
            :parking="parking" />
    </ion-list>
</template>

<script>
import { IonList } from '@ionic/vue'
import ParkingListItem from './ParkingListItem'

export default {
    props: ["parkings"],
    components: {
        IonList,
        ParkingListItem
    }    
}
</script>