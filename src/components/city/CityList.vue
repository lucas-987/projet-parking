<template>
    <ion-list>
        <city-list-item :key="city.id" v-for="city in cities"
            :city="city" />
    </ion-list>
</template>

<script>
import { IonList } from '@ionic/vue'
import CityListItem from './CityListItem'

export default {
    props: ['cities'],
    components: {
        IonList,
        CityListItem
    }
}
</script>