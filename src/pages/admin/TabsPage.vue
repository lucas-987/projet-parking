<template>
    <ion-page>
        <ion-tabs>
                <ion-tab-bar slot="bottom">
                    <ion-tab-button tab="Cities" href="/admin/city">
                    <ion-icon></ion-icon>
                    <ion-label>Villes</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="Parkings" href="/admin/parking">
                    <ion-icon></ion-icon>
                    <ion-label>Parkings</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="Logout" href="/admin/logout">
                    <ion-icon></ion-icon>
                    <ion-label>Compte</ion-label>
                </ion-tab-button>

            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>

<script>
import { IonPage, IonTabs, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue'

export default {
    components: {
        IonPage,
        IonTabs,
        IonTabBar,
        IonTabButton,
        IonLabel,
        IonIcon
    }
}
</script>